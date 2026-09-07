import express from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', protect, createCourse);
router.get('/progress', protect, (req, res) => {
  res.status(200).json([]);
});

export default router;