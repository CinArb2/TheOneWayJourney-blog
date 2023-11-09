'use server'
import { revalidatePath } from 'next/cache'
// Everything in this file run securily on the server and
// doesn't get sent to the client
import nodemailer from 'nodemailer'

export async function sendEmail(prevState: any, formData: FormData) {
  const email = formData.get('email')
  const name = formData.get('name')
  const message = formData.get('message')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    /*
      setting service as 'gmail' is same as providing these setings:

      host: "smtp.gmail.com",
      port: 465,
      secure: true

      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: 'owjemail@gmail.com',
      pass: process.env.PASSWORD,
    },
    secure: false,
  })

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error)
        reject(error)
        return {
          name: '',
          email: '',
          message: '',
        }
      } else {
        console.log('Server is ready to take our messages')
        resolve(success)
        return {
          name: '',
          email: '',
          message: '',
        }
      }
    })
  })

  const mailData = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Message From ${name}`,
    text: message + ' | Sent from: ' + email,
    html: `<div>${message}</div><p>Sent from:
    ${email}</p>`,
  }

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err, 'error')
        reject(err)
        return { message: 'Failed to send email' }
      } else {
        resolve(info)
        // revalidatePath is going to go to the contact page
        // look for the data that has being cached
        // see if we did a data mutation
        // and it will revalidate all the data on that path
        revalidatePath('/contact')
        return { message: 'Email sent' }
      }
    })
  })
}
