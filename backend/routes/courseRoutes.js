import express from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();


router.get('/', getAllCourses);
router.get('/progress', protect, (req, res) => {
  res.status(200).json([]);
});
router.get('/:id', getCourseById);

router.post(
  '/', 
  protect, 
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'lessonVideos', maxCount: 20 }
  ]), 
  createCourse
);

router.put(
  '/:id', 
  protect, 
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'lessonVideos', maxCount: 20 }
  ]), 
  updateCourse
);

router.delete('/:id', protect, deleteCourse);

export default router;