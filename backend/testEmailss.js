import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


// Load environment variables from .env file
dotenv.config();

// Create a transporter using your email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // email provider
  auth: {
    user: process.env.ADMIN_EMAIL, 
    pass: process.env.ADMIN_PASS,   
  },
});

// Function to send a test email
const sendTestEmail = async () => {
  const testBooking = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'abayomirobertonawole@gmail.com',
    phoneNumber: '123-456-7890',
    photoshootType: 'Lifestyle Video Shoot',
    date: new Date('2024-09-30'), // Use a valid date
    time: '10:00 AM',
    location: 'Central Park',
    description: 'Looking for a fun and creative photoshoot!',
  };

  const userMailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: testBooking.email, // Send email to the user
    subject: 'Booking Confirmation',
    text: `Hi ${testBooking.firstName} ${testBooking.lastName},\n\n` +
    `Your booking for a ${testBooking.photoshootType} on ${testBooking.date.toDateString()} at ${testBooking.time} has been confirmed!\n` +
    `Location: ${testBooking.location}\n` +
    `Description: ${testBooking.description}\n\n` +
    `Thank you for choosing us!\n`,
  };
  const adminMailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL, // Recipient: Admin's email
    subject: 'New Booking Notification',
    text: `A new booking has been received:\n\n` +
          `Client Information\n` +
          `- Name: ${testBooking.firstName} ${testBooking.lastName}\n` +
          `- Email: ${testBooking.email}\n` +
          `- Phone Number: ${testBooking.phoneNumber}\n\n` +
          `Booking Details\n` +
          `- Photoshoot Type: ${testBooking.photoshootType}\n` +
          `- Date: ${testBooking.date.toLocaleDateString()}\n` +
          `- Time: ${testBooking.time}\n` +
          `- Location: ${testBooking.location}\n` +
          `- Description: ${testBooking.description || 'No additional details provided.'}`,
  };
  


  try {
    // Send email to the user
    const userInfo = await transporter.sendMail(userMailOptions);
    console.log('User email sent: ' + userInfo.response);

    // Send email to the admin
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent: ' + adminInfo.response);
    
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};



// Run the test
sendTestEmail();



