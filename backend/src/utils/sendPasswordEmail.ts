import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export async function sendPasswordEmail(email: string, url: string) {
  dotenv.config();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.USER_PASSWORD
    }
  });

  const mailOptions = {
    from: 'shobityadav23@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Confirm User', // Subject line
    text: 'Click Here To Confirm User', // plain text body
    html: `<p>Click Here To Change Your Password <p><a href="${url}">${url}</a></p> </p>` // html body
  };

  await transporter.sendMail(mailOptions);
}
