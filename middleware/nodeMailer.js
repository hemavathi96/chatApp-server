/************************************************************
 * Purpose      :   To send mail to specified email-id using node mailer.
 * @description
 * @file        :   nodemailer.js
 * @overview    :   To validate and control the functionality.
 * @author      :   hemavathi B.V <hemavathibv16@gmail.com>
 * @version     :   1.0
 * @since       :   05-03-2019
 * *********************************************************/
const nodemailer = require('nodemailer')

exports.sendEMailFunction = (url) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password
        },
    });
    const mailOptions = {
        from: process.env.email,
        to: process.env.email,
        subject: 'send mail node.js',
        text: 'verification link is\n\n' + url
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log("error in sent mail" + err);
        else
            console.log("mail sent successfully" + info);
    });
}