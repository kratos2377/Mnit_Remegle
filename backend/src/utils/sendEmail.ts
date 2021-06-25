import nodemailer from 'nodemailer';

export async function sendEmail(email: string, url: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'shobityadav23@gmail.com', // generated ethereal user
      pass: 'attackOnDemons23bond1@' // generated ethereal password
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
