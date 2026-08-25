import express from 'express';
import { updateOnboarding } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/onboarding', protect, updateOnboarding);

export default router;