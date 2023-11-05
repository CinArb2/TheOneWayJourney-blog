/*eslint no-undef: "error"*/
/*eslint-env node*/
import nodemailer from 'nodemailer'

export default async function (req, res) {
  const { email, name, message } = await req.body

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
      } else {
        console.log('Server is ready to take our messages')
        resolve(success)
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
      } else {
        console.log(info)
        resolve(info)
      }
    })
  })

  res.status(200)
  res.end()
}
