import express from 'express';
import { updateCompanyInfo, getCompanyInfo, deleteAllCompanyInfo } from '../controllers/companyInfoController.js';

const router = express.Router();

// Route to update company info
router.put('/', updateCompanyInfo);

// Route to fetch company info
router.get('/', getCompanyInfo);

router.delete('/all', deleteAllCompanyInfo);

export default router;
