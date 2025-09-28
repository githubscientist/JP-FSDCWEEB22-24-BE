const nodemailer = require('nodemailer');
const { GOOGLE_APP_PASSWORD, EMAIL_USER } = require('./config');

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: EMAIL_USER,
        pass: GOOGLE_APP_PASSWORD,
    },
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: EMAIL_USER,
        to,
        subject,
        text,
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
}

module.exports = sendEmail;