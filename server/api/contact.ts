import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const method = event.method;
  const { apiSecret, myGmail } = useRuntimeConfig();

  console.log("body", body, method);
  if (method === "POST") {
    try {
      const { name, email, message } = body;
      // Configure nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: myGmail, // Your Gmail address
          pass: apiSecret, // Set your Gmail password as an environment variable
        },
      });
      // Define email options
      const mailOptions = {
        from: email,
        to: myGmail, // Your email address
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };
      // Send email
      await transporter.sendMail(mailOptions);
      //   res.status(200).json({ success: true });
      setResponseStatus(event, 200);
    } catch (error) {
      console.error("Error sending email:", error);
      //   res.status(500).json({ success: false, error: "Internal Server Error" });
      setResponseStatus(event, 500);
    }
  } else {
    // res.status(405).json({ error: "Method Not Allowed" });
    setResponseStatus(event, 405);
  }
});
