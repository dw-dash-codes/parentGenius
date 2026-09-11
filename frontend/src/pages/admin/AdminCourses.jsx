import { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaPenToSquare,
  FaXmark,
  FaCheck,
  FaSpinner, // Spinner icon
} from "react-icons/fa6";
import courseImg from "../../assets/home_course_img.png";
import toast, { Toaster } from "react-hot-toast"; // Toast Notification

const TOPICS = [
  "Chores",
  "Sleep Routines",
  "Tantrums",
  "Screen Time",
  "Positive Discipline",
  "Emotional Health",
];

const AGE_GROUPS = ["0-2 Years", "3-5 Years", "6-12 Years", "Teens (13+)"];

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Naya state submission loading track karne ke liye
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialFormState = {
    title: "",
    topic: "Chores",
    ageGroup: "3-5 Years",
    duration: "1.5 Hours",
    instructor: "Dr. Ahmed",
    image: null,
    description: "",
    lessons: [
      { title: "Introduction & Foundations", duration: "", video: null },
    ],
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/courses`);
      const contentType = res.headers.get("content-type");
      if (res.ok && contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons[index][field] = value;
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const addLessonField = () => {
    setFormData({
      ...formData,
      lessons: [...formData.lessons, { title: "", duration: "", video: null }],
    });
  };

  const removeLessonField = (index) => {
    if (formData.lessons.length === 1) return;
    const updatedLessons = formData.lessons.filter((_, i) => i !== index);
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingId(course._id || course.id);
    setFormData({
      title: course.title || "",
      topic: course.topic || "Chores",
      ageGroup: course.ageGroup || "3-5 Years",
      duration: course.duration || "1.5 Hours",
      instructor: course.instructor || "Dr. Ahmed",
      image: null,
      description: course.description || "",
      lessons:
        course.lessons && course.lessons.length > 0
          ? course.lessons.map((l) => ({
              ...l,
              duration: l.duration ? l.duration.replace(/\D/g, "") : "",
              video: null,
            }))
          : [{ title: "Introduction", duration: "", video: null }],
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading("Uploading course, please wait...");

    try {
      const url = editingId
        ? `${API_BASE}/api/courses/${editingId}`
        : `${API_BASE}/api/courses`;

      const method = editingId ? "PUT" : "POST";
      const submitData = new FormData();

      submitData.append("title", formData.title);
      submitData.append("topic", formData.topic);
      submitData.append("ageGroup", formData.ageGroup);
      submitData.append("instructor", formData.instructor);
      submitData.append("description", formData.description);

      if (formData.image) {
        submitData.append("image", formData.image);
      }

      // Lessons metadata ko JSON string bana kar bhejein
      const lessonsMeta = formData.lessons.map((lesson) => ({
        title: lesson.title,
        duration: lesson.duration,
        hasVideo: !!lesson.video,
      }));
      submitData.append("lessons", JSON.stringify(lessonsMeta));

      // Videos append karein
      formData.lessons.forEach((lesson) => {
        if (lesson.video) {
          submitData.append("lessonVideos", lesson.video);
        }
      });

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: submitData,
      });

      if (res.ok) {
        toast.success("Course published successfully!", { id: loadingToast });
        setIsModalOpen(false);
        fetchCourses();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to publish course.", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/courses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        setCourses(courses.filter((c) => (c._id || c.id) !== id));
        toast.success("Course deleted!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toaster component to render notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl ring-1 ring-ink-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-ink-900">Manage Courses</h2>
          <p className="text-sm text-ink-500">
            Create, edit, or remove curriculum modules for parents.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="h-11 px-6 rounded-full bg-brand-500 text-white font-semibold text-sm inline-flex items-center gap-2 hover:bg-brand-600 transition-colors shadow-md cursor-pointer self-start sm:self-auto"
        >
          <FaPlus size={13} /> Add New Course
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center ring-1 ring-ink-100">
          <p className="text-ink-500 font-medium">
            Loading courses from server...
          </p>
        </div>
      ) : courses.length > 0 ? (
        <div className="bg-white rounded-3xl ring-1 ring-ink-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-50/50 border-b border-ink-100 text-xs font-bold text-ink-700 uppercase tracking-wider">
                  <th className="p-4 pl-6">Course</th>
                  <th className="p-4">Topic</th>
                  <th className="p-4">Age Group</th>
                  <th className="p-4">Lessons</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 text-sm">
                {courses.map((c) => {
                  const courseId = c._id || c.id;
                  return (
                    <tr
                      key={courseId}
                      className="hover:bg-brand-50/30 transition-colors"
                    >
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={c.image || courseImg}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover ring-1 ring-ink-100 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-ink-900 line-clamp-1">
                              {c.title}
                            </p>
                            <p className="text-xs text-ink-500">
                              {c.instructor || "Expert Instructor"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-brand-100/70 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full">
                          {c.topic || "General"}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-ink-700">
                        {c.ageGroup || "All Ages"}
                      </td>
                      <td className="p-4 font-semibold text-ink-900">
                        {c.lessons ? c.lessons.length : 0} Lessons
                      </td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(c)}
                          className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 hover:bg-brand-500 hover:text-white inline-flex items-center justify-center transition-all cursor-pointer"
                        >
                          <FaPenToSquare size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(courseId)}
                          className="w-9 h-9 rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white inline-flex items-center justify-center transition-all cursor-pointer"
                        >
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center ring-1 ring-ink-100">
          <h3 className="text-lg font-bold text-ink-900 mb-1">
            No Courses Yet
          </h3>
          <p className="text-sm text-ink-500 mb-6">
            Start by adding your first curriculum module.
          </p>
          <button
            onClick={openAddModal}
            className="h-10 px-6 rounded-full bg-brand-500 text-white font-semibold text-xs inline-flex items-center gap-2 hover:bg-brand-600 cursor-pointer"
          >
            <FaPlus size={11} /> Create Course
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl ring-1 ring-ink-100 my-8">
            <div className="flex justify-between items-center pb-4 border-b border-ink-100 mb-6">
              <h3 className="text-xl font-bold text-ink-900">
                {editingId ? "Edit Course" : "Add New Course"}
              </h3>
              {/* Disable close button if submitting */}
              <button
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                disabled={isSubmitting}
                className="w-8 h-8 rounded-full bg-ink-100 text-ink-600 flex items-center justify-center hover:bg-ink-200 cursor-pointer disabled:opacity-50"
              >
                <FaXmark size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. Master Toddler Bedtime Routines"
                  className="w-full h-11 rounded-xl border border-ink-200 px-4 text-sm outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5">
                    Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    className="w-full h-11 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-brand-500 bg-white"
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5">
                    Target Age Group
                  </label>
                  <select
                    value={formData.ageGroup}
                    onChange={(e) =>
                      setFormData({ ...formData, ageGroup: e.target.value })
                    }
                    className="w-full h-11 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-brand-500 bg-white"
                  >
                    {AGE_GROUPS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5">
                    Instructor Name
                  </label>
                  <input
                    type="text"
                    value={formData.instructor}
                    onChange={(e) =>
                      setFormData({ ...formData, instructor: e.target.value })
                    }
                    placeholder="e.g. Dr. Ahmed"
                    className="w-full h-11 rounded-xl border border-ink-200 px-4 text-sm outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5">
                    Thumbnail Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                    className="w-full h-11 rounded-xl border border-ink-200 px-4 text-xs outline-none bg-white flex items-center pt-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5">
                  Course Overview & Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Provide brief details..."
                  className="w-full rounded-xl border border-ink-200 p-3 text-sm outline-none resize-none focus:border-brand-500"
                />
              </div>

              <div className="pt-2 border-t border-ink-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-ink-900">
                    Curriculum & Lessons
                  </h4>
                  <button
                    type="button"
                    onClick={addLessonField}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <FaPlus size={11} /> Add Lesson
                  </button>
                </div>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {formData.lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 items-center bg-brand-50/50 p-2.5 rounded-xl ring-1 ring-ink-100"
                    >
                      <input
                        type="text"
                        placeholder="Title"
                        required
                        value={lesson.title}
                        onChange={(e) =>
                          handleLessonChange(idx, "title", e.target.value)
                        }
                        className="flex-1 h-9 rounded-lg border border-ink-200 px-3 text-xs outline-none bg-white focus:border-brand-500"
                      />
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                          handleLessonChange(idx, "video", e.target.files[0])
                        }
                        className="w-48 h-9 rounded-lg border border-ink-200 px-2 text-[10px] outline-none bg-white flex items-center pt-2"
                      />
                      <div className="flex items-center gap-1 bg-white border border-ink-200 rounded-lg px-2 w-24 h-9 focus-within:border-brand-500">
                        <input
                          type="number"
                          min="1"
                          placeholder="10"
                          value={lesson.duration}
                          onChange={(e) =>
                            handleLessonChange(idx, "duration", e.target.value)
                          }
                          className="w-full text-xs outline-none bg-transparent text-center"
                        />
                        <span className="text-[10px] text-ink-400 font-medium select-none">
                          mins
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLessonField(idx)}
                        className="w-8 h-8 rounded-lg text-ink-400 hover:text-red-500 flex items-center justify-center shrink-0 cursor-pointer"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-ink-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting} // Disable cancel while uploading
                  className="h-11 px-6 rounded-full border border-ink-200 text-ink-600 font-semibold text-xs hover:bg-ink-50 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting} // Disable button to prevent double-clicks
                  className="h-11 px-8 rounded-full bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-md cursor-pointer inline-flex items-center gap-1.5 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner size={12} className="animate-spin" />{" "}
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaCheck size={12} /> Publish Course
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
