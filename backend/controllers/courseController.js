import Course from "../models/Course.js";

export const getAllCourses = async (req, res) => {
  try {
    const { topic, ageGroup, search } = req.query;
    let query = {};
    if (topic) query.topic = topic;
    if (ageGroup) query.ageGroup = ageGroup;
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, topic, ageGroup, instructor } = req.body;
    let image = "";

    if (req.files && req.files.image) {
      image = req.files.image[0].path;
    }

    // JSON string se lessons array parse karein
    let rawLessons = [];
    if (req.body.lessons) {
      try {
        rawLessons =
          typeof req.body.lessons === "string"
            ? JSON.parse(req.body.lessons)
            : req.body.lessons;
      } catch (e) {
        rawLessons = [];
      }
    }

    let totalMinutes = 0;
    let videoFileIndex = 0;

    const lessons = rawLessons.map((lesson) => {
      let videoUrl = "";
      // Agar is lesson ki video upload hui thi
      if (
        lesson.hasVideo &&
        req.files &&
        req.files.lessonVideos &&
        req.files.lessonVideos[videoFileIndex]
      ) {
        videoUrl = req.files.lessonVideos[videoFileIndex].path;
        videoFileIndex++;
      }

      const mins = parseInt(lesson.duration);
      if (!isNaN(mins)) totalMinutes += mins;

      return {
        title: lesson.title,
        duration: lesson.duration ? `${lesson.duration} mins` : "",
        videoUrl: videoUrl,
      };
    });

    // Auto-calculate Total Duration
    let calculatedDuration = req.body.duration || "1.5 Hours";
    if (totalMinutes > 0) {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      calculatedDuration =
        hours > 0 ? `${hours} hr ${mins} mins` : `${mins} mins`;
    }

    const newCourse = await Course.create({
      title,
      description,
      topic,
      ageGroup,
      duration: calculatedDuration,
      instructor,
      image,
      lessons,
    });

    res.status(201).json(newCourse);
  } catch (error) {
    console.error("createCourse error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { title, description, topic, ageGroup, instructor } = req.body;
    let updateData = { title, description, topic, ageGroup, instructor };

    if (req.files && req.files.image) {
      updateData.image = req.files.image[0].path;
    }

    let lessons = [];
    let totalMinutes = 0;
    let hasLessons = false;

    let i = 0;
    while (req.body[`lessons[${i}][title]`] !== undefined) {
      hasLessons = true;
      const lessonDuration = req.body[`lessons[${i}][duration]`] || "";
      lessons.push({
        title: req.body[`lessons[${i}][title]`],
        duration: lessonDuration,
        videoUrl: req.body[`lessons[${i}][existingVideo]`] || "",
      });

      const mins = parseInt(lessonDuration);
      if (!isNaN(mins)) totalMinutes += mins;

      i++;
    }

    if (hasLessons) {
      let videoFileIndex = 0;
      lessons.forEach((lesson, idx) => {
        const hasVideo = req.body[`lessons[${idx}][hasVideo]`] === "true";
        if (
          hasVideo &&
          req.files &&
          req.files.lessonVideos &&
          req.files.lessonVideos[videoFileIndex]
        ) {
          lesson.videoUrl = req.files.lessonVideos[videoFileIndex].path;
          videoFileIndex++;
        }
      });

      updateData.lessons = lessons;

      // Auto-Format Total Time
      if (totalMinutes > 0) {
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        updateData.duration =
          hours > 0 ? `${hours} hr ${mins} mins` : `${mins} mins`;
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
