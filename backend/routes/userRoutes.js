import express from 'express';
import { changePassword, completeChallenge, getUserProfile, updateOnboarding, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/onboarding', protect, updateOnboarding);
router.get('/profile', protect,getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/change-password', protect, changePassword);
router.put('/complete-challenge', protect, completeChallenge);

export default router;