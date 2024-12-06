import express from 'express';
import {
  loginAdmin,
  deleteAdminByEmail,
  deleteAllAdmins,
  getAllAdmins,
  getAdminByEmail,
  sendResetCode, 
  verifyResetCode,
  verifyCodeAndUpdateEmail,
  resetPassword,
  validateAndStoreEmail,
  completeRegistration,
} from '../controllers/adminController.js';


const router = express.Router();


router.get('/', getAllAdmins);

router.post('/validate', validateAndStoreEmail);

router.post('/register', completeRegistration);



// Route to send the reset code to the admin's email
router.post('/send-reset-code', sendResetCode);

// Route to verify the reset code sent to the admin's email
router.post('/verify-reset-code', verifyResetCode);

// Route to reset the password
router.post('/reset-password', resetPassword);

// // Admin login route
router.post('/login', loginAdmin);


// Route to delete all admins
router.delete('/', deleteAllAdmins);

// Route to delete an admin by email
router.delete('/:email', deleteAdminByEmail);


router.get('/:email', getAdminByEmail);


// Reset password route
router.post('/reset-password', resetPassword);


// Route to verify the code and update the email
router.post('/verify-code-update-email', verifyCodeAndUpdateEmail);

export default router;

























// import express from 'express';

// import { createService, getServices, updateService, deleteService } from '../controllers/serviceController.js';
// import upload from '../middlewares/multerMiddleware.js';


// const router = express.Router();

// // Route to create a new service (upload an image)
// router.post('/services', upload.single('image'), createService);


// // Route to get all services
// router.get('/services', getServices);

// // Route to update a specific service by ID
// router.put('/services/:id', updateService);

// // Route to delete a specific service by ID
// router.delete('/services/:id', deleteService);

// export default router;

