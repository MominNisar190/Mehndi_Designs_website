const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Email error: ${error.message}`);
    throw error;
  }
};

const sendBookingConfirmation = async (booking, user, design) => {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #d4af37; padding: 40px; border: 1px solid #d4af37;">
      <h1 style="text-align: center; color: #d4af37; font-size: 28px;">✨ Saniya Mehndi Designs</h1>
      <hr style="border-color: #d4af37; margin: 20px 0;" />
      <h2 style="color: #fff;">Booking Confirmed!</h2>
      <p style="color: #ccc;">Dear ${user.name},</p>
      <p style="color: #ccc;">Your booking has been received. Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; color: #d4af37; font-weight: bold;">Design:</td>
          <td style="padding: 8px; color: #fff;">${design.title}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #d4af37; font-weight: bold;">Date:</td>
          <td style="padding: 8px; color: #fff;">${new Date(booking.bookingDate).toLocaleDateString('en-IN')}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #d4af37; font-weight: bold;">Time:</td>
          <td style="padding: 8px; color: #fff;">${booking.timeSlot}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #d4af37; font-weight: bold;">Amount:</td>
          <td style="padding: 8px; color: #fff;">₹${booking.totalAmount}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #d4af37; font-weight: bold;">Status:</td>
          <td style="padding: 8px; color: #fff;">${booking.status.toUpperCase()}</td>
        </tr>
      </table>
      <p style="color: #ccc;">We will confirm your appointment shortly. For queries, reply to this email.</p>
      <p style="color: #d4af37; text-align: center; margin-top: 30px;">✨ Let your hands tell your beautiful story ✨</p>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: `Booking Confirmed - ${design.title} | Saniya Mehndi Designs`,
    html,
  });
};

const sendBookingStatusUpdate = async (booking, user, design) => {
  const statusMessages = {
    confirmed: 'Your booking has been confirmed by our artist!',
    completed: 'Your mehndi session is complete. We hope you loved it!',
    cancelled: `Your booking has been cancelled. Reason: ${booking.cancellationReason || 'N/A'}`,
  };

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #d4af37; padding: 40px; border: 1px solid #d4af37;">
      <h1 style="text-align: center; color: #d4af37;">✨ Saniya Mehndi Designs</h1>
      <hr style="border-color: #d4af37; margin: 20px 0;" />
      <h2 style="color: #fff;">Booking Update</h2>
      <p style="color: #ccc;">Dear ${user.name},</p>
      <p style="color: #ccc;">${statusMessages[booking.status] || 'Your booking status has been updated.'}</p>
      <p style="color: #d4af37;"><strong>Design:</strong> ${design.title}</p>
      <p style="color: #d4af37;"><strong>Status:</strong> ${booking.status.toUpperCase()}</p>
      <p style="color: #d4af37; text-align: center; margin-top: 30px;">✨ Let your hands tell your beautiful story ✨</p>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: `Booking ${booking.status.toUpperCase()} - Saniya Mehndi Designs`,
    html,
  });
};

module.exports = { sendEmail, sendBookingConfirmation, sendBookingStatusUpdate };
