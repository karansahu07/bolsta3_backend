const Queue = require("bull");
const mailQueue = new Queue("mailQueue", "redis://127.0.0.1:6379");
const nodemailer = require("nodemailer");

const sendMail = async (mail, subject, htmlTemplate) => {
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
      from: process.env.NODE_MAILER_MAIL,
      to: mail,
      subject: subject,
      text: "",
      html: htmlTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        if (error.code == "EENVELOPE") resolve("email not provided");
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};


const addEmailToQueue = (email, subject, htmlTemplate) => {
  mailQueue.add({
    to: email,
    subject: subject,
    html: htmlTemplate,
  });
};

mailQueue.process(async (job, done) => {
  const { to, subject, html } = job.data;
  if (to.length <= 0) return done();
  try {
    const info = await sendMail(to, subject, html);
    console.log(`Email sent: ${info.response}`);
    done();
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    done(error);
  }
});

module.exports = addEmailToQueue;
