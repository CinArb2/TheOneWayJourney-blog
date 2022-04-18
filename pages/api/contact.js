export default function (req, res) {

  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      type: "login",
      user: 'owjemail@gmail.com',
      pass: process.env.PASSWORD,
    },
    secure: true,
  });
  const mailData = {
    from: 'owjemail@gmail.com',
    to: 'theonewayjourneyblog92@gmail.com',
    subject: `Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`
  }
  transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log(err, 'error')
    else
      console.log(info)
  })
  res.status(200)
  res.end()
}