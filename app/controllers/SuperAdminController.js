const bcrypt = require("bcrypt");
const { addCompany } = require("../queries/SuperAdminQueries");
const utils = require("../../utils");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.createCompany = async (details) => {
  try {
    const { company_name, admin_name, admin_email, password, plan_type, subscribers, videos_per_subscriber } = details;

    // Generate a random password if not provided
    const generatedPassword = password || crypto.randomBytes(8).toString("hex"); // 16-character random password

    console.log("Generated Password:", generatedPassword); // Log for reference

    const companyData = [company_name, admin_name, admin_email, generatedPassword, plan_type, subscribers, videos_per_subscriber];

    // Insert into Database
    const result = await addCompany(companyData);
    console.log("In controller", result);

    await sendEmail(admin_email, generatedPassword);

    return { result, generatedPassword }; // Return password for further use

  } catch (error) {
    throw error;
  }
};

const sendEmail = async (email, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can change this to your email provider (e.g., Outlook, SMTP)
      auth: {
        user: "karan.ekarigar@gmail.com", // Replace with your email
        pass: "tehk kaft qpvi fbgy" // Replace with your email password or app password
      }
    });

    const mailOptions = {
      from: "karan.ekarigar@gmail.com",
      to: email,
      subject: "Your Admin Account Credentials",
      text: `Hello,\n\nYour admin account has been created successfully!\n\nEmail: ${email}\nPassword: ${password}\n\nPlease log in and change your password immediately.\n\nBest regards,\nYour Company`
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
