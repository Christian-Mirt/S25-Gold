import "dotenv/config"
import { createTransport } from "nodemailer";

export function SendMail(email, emailSubject, emailBody) {
    const transport = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
            user: process.env.SMTP_EMAIl,
            pass: process.env.SMTP_PASSWORD,
        },
    })

    const mailOption = {
        from: process.env.SMTP_EMAIl,
        to: email,
        subject: emailSubject,
        html: emailBody,
    };


    console.log(mailOption);
    transport.sendMail(mailOption, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log("Email sent successfully!");
        }
    })

}