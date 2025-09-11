import nodemailer from "nodemailer";

export const sendMail = async (bookingData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Eden Transport" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // ترسل الإيميل لنفسك
    subject: "✅ New Booking Received",
    html: `
      <h2>New Booking Details</h2>
      <ul>
        <li><strong>Service Type:</strong> ${bookingData.serviceType}</li>
        <li><strong>Mobility:</strong> ${bookingData.mobility}</li>
        <li><strong>Date:</strong> ${bookingData.date}</li>
        <li><strong>Time:</strong> ${bookingData.time}</li>
        <li><strong>Pickup:</strong> ${bookingData.pickup}</li>
        <li><strong>Destination:</strong> ${bookingData.destination}</li>
        <li><strong>Patient Name:</strong> ${bookingData.patientName}</li>
        <li><strong>Phone:</strong> ${bookingData.phone}</li>
        <li><strong>Email:</strong> ${bookingData.email}</li>
        <li><strong>Payment Method:</strong> ${bookingData.paymentMethod}</li>
        <li><strong>Special Notes:</strong> ${bookingData.specialNotes || "None"}</li>
      </ul>
    `,
  };

  await transporter.sendMail(mailOptions);
};
