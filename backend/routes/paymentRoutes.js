import express from 'express';
import { verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

// POST route to verify payment after frontend sends the transaction ID
router.post('/verify', verifyPayment);

export default router;

