// async..await is not allowed in global scope, must use a wrapper
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'email',
    pass: 'password'
  }
});

const sendEmail = async (req, res) => {
  try {
      var mailOptions = {
  from: '',
  to: req.body.email,
  subject: 'Sending Email using Node.js',
  text: `You reset-password code is : ${req.body.code}` 
};
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
  return res.status(200).json({
      reserveCampMessage: "Hurry! You have successfully send the code to the receivers via email.",
      success: true,
    });
  } catch (error) {
     console.log(error) 
  }
}

module.exports = {
  sendEmail,
};