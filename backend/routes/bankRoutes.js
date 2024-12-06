import express from 'express';

import authenticate from '../middlewares/authenticate.js';

import { createBankInfo, updateBankInfo, deleteAllBankInfo, getAllBankInfo} from '../controllers/bankController.js';


const router = express.Router();



// Route for creating new bank information
router.post('/',  createBankInfo);

// Route for updating existing bank information
router.put('/:id', authenticate, updateBankInfo);

// Route for fetching all bank information
router.get('/',  authenticate, getAllBankInfo);


// Route for deleting all bank information
router.delete('/', deleteAllBankInfo);





// // POST: Add Bank Details
// router.post('/add', addBankInfo);

// //PUT: Update bank info
// router.put('/', addBankInfo);


// // GET: Retrieve All Bank Details
// router.get('/', updateBankInfo);

// // GET: Retrieve All Bank Details
// router.delete('/', deleteAllBankInfo);

export default router;
