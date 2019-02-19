const nodemailer = require("nodemailer");


let mailOptions = {
    from: 'BasketApp', // sender address
  };

  let transporter = nodemailer.createTransport({
    host: "hesmail.nazwa.pl",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:'sebastian@hes.pl', // generated ethereal user
      pass: 'Dupa1234' // generated ethereal password
    }
  });

  function sendMail(mailOptions){
      transporter.sendMail(mailOptions);
  }

  module.exports = { sendMail };