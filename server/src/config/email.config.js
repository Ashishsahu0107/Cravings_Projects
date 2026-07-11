import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (to, subject, message) => {
  try {
    console.log("Starting to send email");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME || "ashishsahu1232005@gmail.com",
        pass: process.env.GMAIL_PASSWORD || "hvhhsncbmrvpmvgo",
      },
    });

    console.log("3....2.....1.....");

    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to,
      subject,
      html: message,
    };

    console.log("Sending Mail....");

    const res = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully", res);

  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;

// sendEmail("ashishsahu01072005@gmail.com", "Ashish sahu", "<p>This is a test email.</p>");
