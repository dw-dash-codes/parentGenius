import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    ageGroup: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: '3 Months',
    },
    instructor: {
      type: String,
      default: 'Expert Instructor',
    },
    image: {
      type: String,
      default: '',
    },
    lessonsCount: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;