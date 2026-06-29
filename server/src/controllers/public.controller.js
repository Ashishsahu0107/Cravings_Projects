import Contact from "../models/contact.model.js";

export const ContactUsForm  = async (req, res, next) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !phone || !subject || !message) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const NewContactMessage = await Contact.create({
      fullName,
      email,
      phone,
      subject,
      message,
    });

      res
          .status(201)
          .json({
              message: "Message sent successfully"
          });
  } catch (error) {
    console.error(error);
    next();
  }
};
