import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export async function sendEmail(email: string, url: string) {

  dotenv.config()
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER_MAIL, // generated ethereal user
      pass: process.env.USER_PASSWORD // generated ethereal password
    }
  });

  const mailOptions = {
    from: 'shobityadav23@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Confirm User', // Subject line
    text: 'Click Here To Confirm User', // plain text body
    html: `<a href="${url}">${url}</a>` // html body
  };

  await transporter.sendMail(mailOptions);

}
