import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import otpGenerator from 'otp-generator';
import Admin from '../models/adminModel.js';
import { sendVerificationEmail,  sendEmail } from '../config/nodemailer.js';

import { generateToken } from '../middlewares/jwt.js';



// Function to generate a numeric verification code
const generateNumericVerificationCode = (length = 6) => {
    let code = '';
    for (let i = 0; i < length; i++) {
        code += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
    }
    return code;
};





 // Step 1: Validate Email
export const validateAndStoreEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if an admin with this email already exists
    const existingAdmin = await Admin.findOne({ email });
    
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // No need to store the email in session; just return success
    res.status(200).json({ message: 'Email validated. Proceed to next step.' });
  } catch (error) {
    console.error('Error validating email:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



// // Step 2: Complete Registration

export const completeRegistration = async (req, res) => {
  const { phoneNumber, password, confirmPassword, email } = req.body;

  // Check if required fields are missing
  if (!phoneNumber || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Phone number, password, and confirm password are required.' });
  }

  // Ensure the passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin document with hashed password
    const newAdmin = new Admin({
      email,
      phoneNumber,
      password: hashedPassword,
      isVerified: true,
    });

    // Save the new admin
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully!' });
  } catch (error) {
    // Handle duplicate phone number error
    if (error.code === 11000 && error.keyPattern.phoneNumber) {
      return res.status(400).json({ error: 'Phone number already registered.' });
    }

    // Handle missing phoneNumber field or any other errors
    if (error.errors && error.errors.phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required.' });
    }

    // Log and handle general server errors
    console.error('Error completing registration:', error);
    res.status(500).json({ error: 'Server error' });
  }
};




const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const loginAdmin = async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  // Validate the input fields
  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'Email or Phone number is required.' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  try {
    // Find the admin by email or phone number
    const admin = await Admin.findOne({ $or: [{ email }, { phoneNumber }] });

    if (!admin) {
      return res.status(400).json({ error: 'Admin not found.' });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    // Create a JWT token with the admin details (you can include user details in the payload)
    const payload = {
      adminId: admin._id,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
    };

    // Sign the token and set expiration time (1 hour in this case)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Send the token back to the client
    res.status(200).json({
      message: 'Login successful.',
      // token,  
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


// reset areas




// Send verification code for password reset
export const sendResetCode = async (req, res) => {
    const { email } = req.body;

    console.log("Email being searched:", email); // Log the email

    try {
        // Normalize the email to avoid case sensitivity issues
        const admin = await Admin.findOne({ email: email.toLowerCase() });

        // Check if the admin exists
        if (!admin) {
            return res.status(404).json({ message: `Admin not found for email: ${email}` });
        }

        // Generate a 6-digit reset token
        const resetToken = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit token

        // Save the token and its expiration time to the admin record
        admin.resetPasswordToken = resetToken;
        admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
        await admin.save();


        // Send email with the reset token
        await sendEmail(
            admin.email, 
            'Password Reset Verification Code', 
            ` <p>Dear Admin,</p>
            <p>You requested a password reset for your account. Please use the following code to reset your password:</p>
            <h2>${resetToken}</h2>
            <p>This code is valid for one hour. If you did not request a password reset, please ignore this email.</p>
            <p>Best regards,<br>Your Team</p>` 
        );
       

        // Respond with success message
        return res.status(200).json({ message: 'Verification code sent to your email' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error sending reset code:', error);
        return res.status(500).json({ error: 'Server error while sending reset code' });
    }
};


  // Verify the reset code
export const verifyResetCode = async (req, res) => {
    const { email, code } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Check if the code is valid and not expired
      if (admin.resetPasswordToken !== code || admin.resetPasswordExpires < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired verification code' });
      }
  
      res.status(200).json({ message: 'Verification code is valid. You can now reset your password.' });
    } catch (error) {
      console.error('Error verifying reset code:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };


// Reset the password
export const resetPassword = async (req, res) => {
  const { email, password } = req.body; 

  try {
    // Ensure the password is provided
    if (!password || password.trim() === "") {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Log the received password for debugging
    console.log("Received password:", password);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the admin's password
    admin.password = hashedPassword; 
    admin.resetPasswordToken = undefined; 
    admin.resetPasswordExpires = undefined; 
    await admin.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Server error' });
  }
};




//admins function


  export const getAllAdmins = async (req, res) => {
    try {
      // Fetch all admin records from the database
      const admins = await Admin.find({});
      
      res.status(200).json(admins);
    } catch (error) {
      console.error('Error fetching admins:', error); 
      res.status(500).json({ error: 'Server error' });
    }
  };



// Delete all admins
export const deleteAllAdmins = async (req, res) => {
    try {
      await Admin.deleteMany({});
      res.status(200).json({ message: 'All admins deleted successfully.' });
    } catch (error) {
      console.error('Error deleting all admins:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Delete an admin by email
  export const deleteAdminByEmail = async (req, res) => {
    const { email } = req.params;
    try {
      const result = await Admin.deleteOne({ email });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.status(200).json({ message: `Admin with email ${email} deleted successfully.` });
    } catch (error) {
      console.error(`Error deleting admin with email ${email}:`, error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Get an admin by email
export const getAdminByEmail = async (req, res) => {
    const { email } = req.params; 
    try {
        const admin = await Admin.findOne({ email }); 
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' }); 
        }
        res.status(200).json(admin); 
    } catch (error) {
        console.error(`Error retrieving admin with email ${email}:`, error); 
        res.status(500).json({ error: 'Server error' }); 
    }
};






// Step 2: Verify code and update email
export const verifyCodeAndUpdateEmail = async (req, res) => {
    const { email, verificationCode, newEmail } = req.body;
  
    try {
      // Find admin and validate code
      const admin = await Admin.findOne({
        email,
        verificationCode,
        verificationCodeExpires: { $gt: Date.now() },
      });
  
      if (!admin) {
        return res.status(400).json({ error: 'Invalid or expired verification code.' });
      }
  
      // Check if new email is already in use
      const emailExists = await Admin.findOne({ email: newEmail });
      if (emailExists) {
        return res.status(400).json({ error: 'New email is already in use.' });
      }
  
      // Update email
      admin.email = newEmail;
      admin.verificationCode = undefined; 
      admin.verificationCodeExpires = undefined;
  
      await admin.save();
  
      res.status(200).json({ message: 'Email updated successfully.' });
    } catch (error) {
      console.error('Error updating email:', error);
      res.status(500).json({ error: 'Server error.' });
    }
  };
  




// // Step 2: Admin Logout (Optional, to allow users to log out)
// export const adminLogout = async (req, res) => {
//   try {
//     req.session.destroy((err) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error logging out.' });
//       }

//       res.status(200).json({ message: 'Logged out successfully.' });
//     });
//   } catch (error) {
//     console.error('Error during logout:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };





// // Send verification code
// export const sendVerificationCode = async (req, res) => {
//     const { email } = req.body; // Extract the email from the request body

//     try {
//         // Generate a 6-digit numeric verification code
//         const verificationCode = generateNumericVerificationCode();

//         // Update or insert the admin's verification code and expiration time
//         await Admin.updateOne(
//             { email }, // Find admin by email
//             { 
//                 verificationCode, 
//                 verificationCodeExpires: Date.now() + 3600000 // Code expires in 1 hour
//             },
//             { upsert: true } // Create a new admin entry if it does not exist
//         );

//         // Send the verification code to the admin's email
//         await sendVerificationEmail(email, verificationCode);

//         // Respond to the client with success message
//         res.status(200).json({ message: 'Verification code sent to your email.' });
//     } catch (error) {
//         console.error('Error sending verification code:', error); // Log the error
//         res.status(500).json({ error: 'Server error' }); // Respond with server error
//     }
// };


// // //  Verify the code
// // export const verifyCode = async (req, res) => {
// //     const { email, verificationCode } = req.body;
  
// //     try {
// //       const admin = await Admin.findOne({ email });
// //       if (!admin || admin.verificationCode !== verificationCode || admin.verificationCodeExpires < Date.now()) {
// //         return res.status(400).json({ error: 'Invalid or expired verification code.' });
// //       }
// //       res.status(200).json({ message: 'Verification code is valid. Please provide your phone number and password to complete registration.' });
// //     } catch (error) {
// //       console.error('Error verifying code:', error);
// //       res.status(500).json({ error: 'Server error' });
// //     }
// //   };


// //nwe one 💙

// // Verify the code
// export const verifyCode = async (req, res) => {
//   const { email, verificationCode } = req.body;

//   try {
//       // Check if the email is present in the database
//       const admin = await Admin.findOne({ email });
//       if (!admin) {
//           return res.status(404).json({ error: 'Email not found. Please register first.' });
//       }

//       // Inform the user that the email is already associated
//       console.log(`Email ${email} is already associated with an existing account.`);

//       // Verify if the verification code is correct and not expired
//       if (admin.verificationCode !== verificationCode || admin.verificationCodeExpires < Date.now()) {
//           return res.status(400).json({ error: 'Invalid or expired verification code.' });
//       }

//       // If the code is valid
//       res.status(200).json({ message: 'Verification code is valid. Please provide your phone number and password to complete registration.' });
//   } catch (error) {
//       console.error('Error verifying code:', error);
//       res.status(500).json({ error: 'Server error' });
//   }
// };



// // Complete registration sign up

// export const registerAdmin = async (req, res) => {
//     // const { email, phoneNumber, password, confirmPassword } = req.body;
//     const { email, phoneNumber, password, confirmPassword } = req.body;
  
//     // Check if passwords match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: 'Passwords do not match.' });
//     }
  
//     try {
//       // Find the admin by email
//       const admin = await Admin.findOne({ email });
  
//       // Check if the admin exists and is not already verified
//       if (!admin || admin.isVerified) {
//         return res.status(400).json({ error: 'Admin already verified or does not exist.' });
//       }
  
//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       // Update the admin's phone number and password, and mark as verified
//       admin.phoneNumber = phoneNumber;
//       admin.password = hashedPassword;
//       admin.isVerified = true; 
//       admin.verificationCode = undefined; 
//       admin.verificationCodeExpires = undefined; 
  
//       // Save the updated admin details
//       await admin.save();
  
//       // Respond with a success message
//       res.status(201).json({ message: 'Admin registered successfully!' });
//     } catch (error) {
//       // Check for duplicate key error
//       if (error.code === 11000 && error.keyPattern.phoneNumber) {
//         return res.status(400).json({ error: 'Phone number already in use.' });
//       }
  
//       console.error('Error during admin registration:', error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   };
  



// export const loginAdmin = async (req, res) => {
//     const { emailOrPhoneNumber, password } = req.body; // Accept either email or phone number
    
//     try {
//       // Find admin by either email or phone number
//       const admin = await Admin.findOne({
//         $or: [{ email: emailOrPhoneNumber }, { phoneNumber: emailOrPhoneNumber }]
//       });
      
//       // If no admin found or password doesn't match
//       if (!admin || !(await bcrypt.compare(password, admin.password))) {
//         return res.status(400).json({ message: 'Invalid email/phone number or password' });
//       }
      
//       // If the admin is not verified
//       if (!admin.isVerified) {
//         return res.status(400).json({ message: 'Please verify your email first' });
//       }
  
//       // Generate a JWT token for authenticated session
//       const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
//       // Respond with the token
//       res.status(200).json({ token });
//     } catch (error) {
//       console.error('Error during admin login:', error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   };
  

