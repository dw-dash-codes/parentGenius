import Course from '../models/Course.js';


export const getAllCourses = async (req, res) => {
  try {
    const { topic, ageGroup, search } = req.query;
    let query = {};

    if (topic) query.topic = topic;
    if (ageGroup) query.ageGroup = ageGroup;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


export const createCourse = async (req, res) => {
  try {
    const { title, description, topic, ageGroup, duration, instructor, image, lessonsCount } = req.body;

    const newCourse = await Course.create({
      title,
      description,
      topic,
      ageGroup,
      duration,
      instructor,
      image,
      lessonsCount,
    });

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};