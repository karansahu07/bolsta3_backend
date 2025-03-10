const nodemailer = require('nodemailer')


/**
 * 
 * @param {array|string} mail 
 * @param {string} subject 
 * @param {html} htmlTemplate 
 * @returns {Promise<string>}
 */
const sendMail = async(mail,subject,htmlTemplate) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.NODE_MAILER_MAIL,
                pass: process.env.NODE_MAILER_PASSWORD,
            },
        });
        
        const mailOptions = {
            from: process.env.MAILER_MAIL,
            to: mail,
            subject:subject,
            text: "",
            html:htmlTemplate
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve(info)
            }
        });
    })
}

module.exports = sendMail