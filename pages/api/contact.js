export default async function (req, res) {

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

  await new Promise((resolve, reject) => {
    // verify connection configuration
      transporter.verify(function (error, success) {
          if (error) {
              console.log(error);
              reject(error);
          } else {
              console.log("Server is ready to take our messages");
              resolve(success);
          }
      });
  });

  const mailData = {
    from: 'owjemail@gmail.com',
    to: 'theonewayjourneyblog92@gmail.com',
    subject: `Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`
  }
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, function (err, info) {
      if(err){
        console.log(err, 'error')
        reject(err)
      }else {
        console.log(info)
        resolve(info);
      }
    })
  });
  
  res.status(200)
  res.end()
}