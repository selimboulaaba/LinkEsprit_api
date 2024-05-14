const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        // Handle error here
      } else {
        console.log("Email sent:", info.response);
        // Handle success here
      }
    });
  } catch (error) {
    console.error("Error in sendEmail function:", error);
    // Handle error here
  }
};


module.exports = sendEmail;