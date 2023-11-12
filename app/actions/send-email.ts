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

  const mailData = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Message From ${name}`,
    text: message + ' | Sent from: ' + email,
    html: `<div>${message}</div><p>Sent from:
    ${email}</p>`,
  }

  try {
    await transporter.sendMail(mailData)

    return { success: true, message: 'Email sent' }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Email failed' }
  }
}
