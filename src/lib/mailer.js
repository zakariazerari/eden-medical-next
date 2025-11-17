import nodemailer from "nodemailer";

const createTransporter = () => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Email credentials missing in .env");
      return null;
    }

    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  } catch (error) {
    console.error("❌ Error creating transporter:", error);
    return null;
  }
};

export const sendMail = async (bookingData) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      return { success: false, error: "Email not configured" };
    }

    const mailOptions = {
      from: `Eden Medical Transport <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: "🚑 New Booking Request - Eden Medical Transport",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-row { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #dc2626; }
            .time-section { background: #eff6ff; padding: 20px; margin: 20px 0; border-radius: 8px; border: 2px solid #3b82f6; }
            .time-row { display: flex; align-items: center; padding: 10px; margin: 5px 0; background: white; border-radius: 6px; }
            .time-icon { font-size: 20px; margin-right: 10px; }
            .label { font-weight: bold; color: #dc2626; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚑 New Booking Request</h1>
              <p>Eden Medical Transport</p>
            </div>
            <div class="content">
              <h2>Booking Details</h2>
              
              <div class="info-row">
                <span class="label">Patient Name:</span> ${bookingData.patientName}
              </div>
              
              <div class="info-row">
                <span class="label">Service Type:</span> ${bookingData.serviceType}
              </div>
              
              <div class="info-row">
                <span class="label">Mobility:</span> ${bookingData.mobility}
              </div>
              
              <div class="info-row">
                <span class="label">Date:</span> ${new Date(bookingData.date).toLocaleDateString()}
              </div>
              
              <div class="time-section">
                <h3 style="color: #3b82f6; margin-top: 0;">⏰ Schedule Times</h3>
                
                <div class="time-row">
                  <span class="time-icon">🕐</span>
                  <div>
                    <strong style="color: #2563eb;">Pick-Up Time:</strong> ${bookingData.time}
                    <br><small style="color: #6b7280;">When we pick up the patient</small>
                  </div>
                </div>
                
                <div class="time-row">
                  <span class="time-icon">🕑</span>
                  <div>
                    <strong style="color: #7c3aed;">Appointment Time:</strong> ${bookingData.appointmentTime}
                    <br><small style="color: #6b7280;">Patient's scheduled appointment</small>
                  </div>
                </div>
                
                ${bookingData.returnTime ? `
                <div class="time-row">
                  <span class="time-icon">🕒</span>
                  <div>
                    <strong style="color: #059669;">Return Time:</strong> ${bookingData.returnTime}
                    <br><small style="color: #6b7280;">Return trip scheduled</small>
                  </div>
                </div>
                ` : `
                <div class="time-row" style="background: #fef3c7;">
                  <span class="time-icon">ℹ️</span>
                  <div>
                    <strong>No return trip requested</strong>
                    <br><small style="color: #92400e;">One-way transport only</small>
                  </div>
                </div>
                `}
              </div>
              
              <div class="info-row">
                <span class="label">Pickup Location:</span> ${bookingData.pickup}
              </div>
              
              <div class="info-row">
                <span class="label">Destination:</span> ${bookingData.destination}
              </div>
              
              <div class="info-row">
                <span class="label">Phone:</span> ${bookingData.phone}
              </div>
              
              <div class="info-row">
                <span class="label">Email:</span> ${bookingData.email}
              </div>
              
              <div class="info-row">
                <span class="label">Payment Method:</span> ${bookingData.paymentMethod}
              </div>
              
              ${bookingData.specialNotes ? `
              <div class="info-row">
                <span class="label">Special Notes:</span> ${bookingData.specialNotes}
              </div>
              ` : ''}
              
              <div class="footer">
                <p>This email was sent from Eden Medical Transport booking system</p>
                <p>Please respond to this booking request as soon as possible</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Booking email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending booking email:", error);
    return { success: false, error: error.message };
  }
};

export const sendContactMail = async (contactData) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      return { success: false, error: "Email not configured" };
    }

    const mailOptions = {
      from: `Eden Medical Transport <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: contactData.email,
      subject: "📧 New Contact Message - Eden Medical Transport",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-row { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #2563eb; }
            .label { font-weight: bold; color: #2563eb; }
            .message-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 2px solid #e5e7eb; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Message</h1>
              <p>Eden Medical Transport</p>
            </div>
            <div class="content">
              <h2>Contact Information</h2>
              
              <div class="info-row">
                <span class="label">Full Name:</span> ${contactData.fullName}
              </div>
              
              <div class="info-row">
                <span class="label">Email:</span> ${contactData.email}
              </div>
              
              ${contactData.phone ? `
              <div class="info-row">
                <span class="label">Phone:</span> ${contactData.phone}
              </div>
              ` : ''}
              
              <div class="message-box">
                <h3 style="color: #2563eb; margin-top: 0;">Message:</h3>
                <p style="white-space: pre-wrap;">${contactData.message}</p>
              </div>
              
              <div class="footer">
                <p>This email was sent from Eden Medical Transport contact form</p>
                <p>Reply directly to this email to respond to ${contactData.fullName}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Contact email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending contact email:", error);
    return { success: false, error: error.message };
  }
};

export const testEmail = async () => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      return { success: false, error: "Email not configured" };
    }

    const mailOptions = {
      from: `Eden Medical Transport <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "✅ Test Email - Eden Medical Transport",
      html: `
        <h1>Email Configuration Test</h1>
        <p>If you're receiving this email, your email configuration is working correctly!</p>
        <p><strong>Email User:</strong> ${process.env.EMAIL_USER}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Test email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending test email:", error);
    return { success: false, error: error.message };
  }
};