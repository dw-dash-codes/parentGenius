
import express from 'express';
import { getSolutions, createSolution, rateSolution } from '../controllers/communityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSolutions);
router.post('/', protect, createSolution);
router.put('/:id/rate', protect, rateSolution);

export default router;