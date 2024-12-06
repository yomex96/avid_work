import express from 'express';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// Protected route
router.get('/protected-data', authenticate, (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
});

export default router;