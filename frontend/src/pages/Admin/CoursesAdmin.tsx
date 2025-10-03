import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminForms.css";

const CoursesAdmin: React.FC = () => {
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    category: "",
    tag: "Free",
    price: 0,
    coursesCount: 0,
    studentsCount: 0,
    image: null as File | null,
    teacherId: "",
    popular: false,
  });

  const [courses, setCourses] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      if (formData.image) {
        const fileData = new FormData();
        fileData.append("image", formData.image);

        const uploadRes = await axios.post(
          "http://localhost:8080/api/upload",
          fileData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        imageUrl = uploadRes.data.url;
      }

      const payload = { ...formData, image: imageUrl };

      if (isEditing) {
        await axios.put(
          `http://localhost:8080/api/courses/${formData._id}`,
          payload
        );
        alert("Course updated!");
      } else {
        const { _id, ...newCourse } = payload;
        if (!newCourse.teacherId) delete (newCourse as any).teacherId;
        await axios.post("http://localhost:8080/api/courses", newCourse);
        alert("Course added!");
      }

      setFormData({
        _id: "",
        title: "",
        category: "",
        tag: "Free",
        price: 0,
        coursesCount: 0,
        studentsCount: 0,
        image: null as File | null,
        teacherId: "",
        popular: false,
      });
      setIsEditing(false);
      fetchCourses();
    } catch (err) {
      console.error("Error saving course:", err);
      alert("Failed!");
    }
  };

  const handleEdit = (course: any) => {
    setFormData(course);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  return (
    <div className="course-admin">
      <h1 className="main-h">Manage Courses</h1>

      <div className="list">
        <h2>{isEditing ? "Edit Course" : "Add Course"}</h2>
        <hr />
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Title
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Category
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Tag
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                required
              >
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
              </select>
            </label>

            <label>
              Price
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
              />
            </label>

            <label>
              Lessons Count
              <input
                type="number"
                name="coursesCount"
                placeholder="Lessons Count"
                value={formData.coursesCount}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Students Count
              <input
                type="number"
                name="studentsCount"
                placeholder="Students Count"
                value={formData.studentsCount}
                onChange={handleChange}
              />
            </label>

            <label>
              Image
              <input
                type="file"
                name="image"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files?.[0] || null,
                  })
                }
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Teacher Id
              <input
                type="text"
                name="teacherId"
                placeholder="Teacher Id"
                value={formData.teacherId}
                onChange={handleChange}
              />
            </label>

            <label className="checkbox-label">
              Popular:
              <input
                type="checkbox"
                name="popular"
                checked={formData.popular}
                onChange={handleChange}
              />
            </label>
          </div>

          <button type="submit">
            {isEditing ? "Update Course" : "Add Course"}
          </button>
        </form>
      </div>

      <div className="list">
        <h2>All Courses</h2>
        <hr />
        <div className="comp-list">
          {courses.map((course) => (
            <div key={course._id} className="comp-card">
              <div className="info">
                <h3>{course.title}</h3>
              </div>
              <div className="actions">
                <button className="edit-btn" onClick={() => handleEdit(course)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesAdmin;
