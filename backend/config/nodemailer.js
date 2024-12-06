import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS,
  },
});

// Function to send booking confirmation and admin notification emails
export const sendBookingEmail = async (booking) => {
  // Google Maps link using the location coordinates
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.location.address)}`;


const bookingDate = new Date(booking.date);

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Format the booking date
const formattedBookingDate = formatDate(bookingDate);

// Function to format time
function formatTime(time) {
  const hour = parseInt(time.hour);
  const minute = time.minute;
  const period = time.period.toUpperCase(); // AM or PM
  return `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${period}`;
}

// Format the time range
const timeFrom = formatTime(booking.timeRange.from);
const timeTo = formatTime(booking.timeRange.to);

// Mail options for user (booking confirmation)
const userMailOptions = {
  from: process.env.ADMIN_EMAIL,
  to: booking.email,
  subject: 'Booking notification',
  html: `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #FFA500; text-align: center;">Pending Booking Confirmation</h2>
    <!-- Company Logo at the top -->
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://your-company-logo-url.com/logo.png" alt="Company Logo" style="width: 150px; height: auto;" />
    </div>
    <p>Dear ${booking.name},</p>

    <p>We have received your booking request. Your booking is currently <strong>pending confirmation</strong>.</p>

    <p>
      Please review the details of your booking below:
    </p>

    <ul style="background-color: #f9f9f9; padding: 15px; border-left: 5px solid #FFA500; list-style-type: none;">
      ${booking.services.map(service => `<li style="padding: 5px 0;">- ${service}</li>`).join('')}
    </ul>

    <p>
      <strong>Date:</strong> ${formattedBookingDate}<br />
      <strong>Time:</strong> ${timeFrom} - ${timeTo}
    </p>

    <p>
      We will notify you once your booking is confirmed. If you have any questions in the meantime or need to make changes to your booking, feel free to reach out to us.
    </p>

    <p>Thank you for choosing our services. We look forward to providing you with an excellent experience!</p>

    <p style="margin-top: 30px;">Best regards,<br>The Booking Team</p>
  </div>
`,
};




// Function to format time (same as before)
function formatTime(time) {
  const hour = parseInt(time.hour);
  const minute = time.minute;
  const period = time.period.toUpperCase(); // AM or PM
  return `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${period}`;
}

// Format the time range for admin email
const adminTimeFrom = formatTime(booking.timeRange.from);
const adminTimeTo = formatTime(booking.timeRange.to);

// Mail options for admin (booking notification)
const adminMailOptions = {
  from: process.env.ADMIN_EMAIL,
  to: process.env.ADMIN_EMAIL,
  subject: 'New Booking Notification',
  html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #1E90FF;">New Booking Notification</h2>
      <!-- Company Logo at the top -->
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://your-company-logo-url.com/logo.png" alt="Company Logo" style="width: 150px; height: auto;" />
      </div>
      <p>Dear Admin,</p>
      <p>A new booking has been received:</p>

      <h3 style="color: #1E90FF;">Client Information</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 10px; background-color: #f0f0f0;"><strong>Name:</strong></td>
          <td style="padding: 10px; background-color: #f0f0f0;">${booking.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; background-color: #f0f0f0;"><strong>Phone Number:</strong></td>
          <td style="padding: 10px; background-color: #f0f0f0;">${booking.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; background-color: #f0f0f0;"><strong>Email:</strong></td>
          <td style="padding: 10px; background-color: #f0f0f0;">${booking.email}</td>
        </tr>
   
      </table>

      <h3 style="color: #1E90FF;">Booking Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; background-color: #f0f0f0;"><strong>Services:</strong></td>
          <td style="padding: 10px; background-color: #f0f0f0;">${booking.services.join(', ')}</td>
        </tr>
        <tr>
          <td style="padding: 10px; background-color: #f0f0f0;"><strong>Date:</strong></td>
          <td style="padding: 10px; background-color: #f0f0f0;">${bookingDate.toLocaleDateString()}</td>
        </tr>
        <tr>
          <td style="padding: 10px; background-color: #f0f0f0;"><strong>Time:</strong></td>
          <td style="padding: 10px; background-color: #f0f0f0;">${adminTimeFrom} - ${adminTimeTo}</td>
        </tr>
        <tr>
          <td style="padding: 10px; background-color: #f0f0f0;"><strong>Location:</strong></td>
          <td style="padding: 10px; background-color: #f0f0f0;">${booking.location.address}</td>
        </tr>
        <tr>
          <td style="padding: 10px; background-color: #f0f0f0;"><strong>View on Google Maps:</strong></td>
          <td style="padding: 10px; background-color: #f0f0f0;">
            <a href="${googleMapsLink}" style="color: #1E90FF;">View Location</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; background-color: #f0f0f0;"><strong>Description:</strong></td>
          <td style="padding: 10px; background-color: #f0f0f0;">${booking.description || 'No additional details provided.'}</td>
        </tr>

              <tr>
    <td style="padding: 10px; background-color: #f0f0f0;"><strong>Extra Service:</strong></td>
    <td style="padding: 10px; background-color: #f0f0f0;">${booking.extraServices || 'No additional details provided.'}</td>
  </tr>
      </table>

      <p style="margin-top: 30px;">Thank you,</p>
    </div>
  `,
};



  try {
    // Send the user email (booking confirmation)
    const userInfo = await transporter.sendMail(userMailOptions);
    console.log('User email sent: ' + userInfo.response);

    // Send the admin email (booking notification)
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent: ' + adminInfo.response);
  } catch (error) {
    console.error('Error sending emails: ', error);
    throw error; // Throw error to handle it at a higher level if needed
  }
};


/**
 * Sends a contact form submission email to the admin.
 * @param {Object} contact - Contact form data.
 * @param {String} contact.name - Name of the person submitting the form.
 * @param {String} contact.email - Email of the person submitting the form.
 * @param {String} [contact.phoneNumber] - (Optional) Phone number of the person.
 * @param {String} contact.message - Message from the contact form.
 */






export const sendContactEmail = async (contact) => {
  const contactMailOptions = {
    from: contact.email,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Request from ${contact.firstName} ${contact.lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #1E90FF;">New Contact Request</h2>
        <p>You have received a new contact request. Below are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; background-color: #f0f0f0;"><strong>First Name:</strong></td>
            <td style="padding: 10px; background-color: #f0f0f0;">${contact.firstName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #f0f0f0;"><strong>Last Name:</strong></td>
            <td style="padding: 10px; background-color: #f0f0f0;">${contact.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #f0f0f0;"><strong>Email:</strong></td>
            <td style="padding: 10px; background-color: #f0f0f0;">${contact.email}</td>
          </tr>
          ${contact.phoneNumber ? `
            <tr>
              <td style="padding: 10px; background-color: #f0f0f0;"><strong>Phone Number:</strong></td>
              <td style="padding: 10px; background-color: #f0f0f0;">${contact.phoneNumber}</td>
            </tr>
          ` : ''}
        </table>
        
        <h3 style="color: #1E90FF;">Message</h3>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 5px solid #1E90FF;">
          <p style="white-space: pre-line; color: #333;">${contact.message.split('\n').map(line => `- ${line}`).join('<br>')}</p>
        </div>
        
        <p style="margin-top: 30px;">Regards,<br>Your Company Team</p>
      </div>
    `
  };


  
  try {
    const contactInfo = await transporter.sendMail(contactMailOptions);
    console.log('Contact email sent: ' + contactInfo.response);
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw new Error('Failed to send contact email');
  }
};











//admin



// Function to send verification email
export const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL, // Sender address
    to: email, // Recipient address
    subject: 'Email Verification important', // Subject line
    text: `Your verification code is: ${verificationCode}`, // Plain text body
    html: `<b>Your verification code is: ${verificationCode}</b>`, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email.');
  }
};





// Function to send emails
export const sendEmail = async (to, subject, text, verificationCode = '') => {
  const mailOptions = {
      from: process.env.ADMIN_EMAIL, // Sender address
      to: to, // Recipient address (should be the email found in the database)
      subject: subject, // Subject line
      text: text, // Plain text body
      html: `<b>${text}</b>${verificationCode ? `<br><b>Your verification code is: ${verificationCode}</b>` : ''}`, // HTML body
  };

  try {
      // Log mail options for debugging
      console.log('Mail options:', mailOptions);

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`); // Log the successful email send
  } catch (error) {
      console.error('Error sending email:', error); // Log the error for debugging
      throw new Error('Failed to send email.'); // Throw an error for further handling
  }
};




// Function to send booking status email
export const sendBookingStatusEmail = async (email, bookingId, status) => {
  if (!email) {
    throw new Error('Recipient email is undefined');
  }

  const mailOptions = {
    from: process.env.ADMIN_EMAIL, // Sender address
    to: email, // Recipient address
    subject: `Booking ${status} - Important Notification`, // Subject line
    text: `Dear user, your booking with ID ${bookingId} has been ${status}.`, // Plain text body
    html: `<b>Dear user,</b><br><br>Your booking with ID <b>${bookingId}</b> has been <b>${status}</b>.<br><br>Thank you for choosing our service!`, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Booking status email sent to ${email}`);
  } catch (error) {
    console.error('Error sending booking status email:', error);
    throw new Error('Failed to send booking status email.');
  }
};



export const sendReplyEmail = async ({ to, subject, text }) => {
  try {
      // Email options
      const mailOptions = {
          from: process.env.ADMIN_EMAIL,
          to,
          subject,
          text,
      };

      // Send email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${to}`);
  } catch (error) {
      console.error('Error sending email:', error.message);
      throw new Error('Failed to send email');
  }
};



// export const sendResetPasswordEmail = async (email, token) => {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: { user: process.env.ADMIN_EMAIL, pass: process.env.ADMIN_PASS },
//   });

//   const mailOptions = {
//     from: process.env.ADMIN_EMAIL,
//     to: email,
//     subject: 'Reset Your Password',
//     text: `Click this link to reset your password: http://your-website.com/reset-password/${token}`,
//   };

//   return transporter.sendMail(mailOptions);
// };