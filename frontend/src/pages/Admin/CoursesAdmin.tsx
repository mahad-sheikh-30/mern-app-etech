import React, { useState } from "react";
import axios from "axios";
import "./CoursesAdmin.css";
const CoursesAdmin: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tag: "Free",
    price: 0,
    coursesCount: 0,
    studentsCount: 0,
    image: "",
    instructor: "",
    instructorImg: "",
    popular: false,
  });

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
      const res = await axios.post(
        "http://localhost:8080/api/courses",
        formData
      );
      alert("Course added!");
      console.log(res.data);
    } catch (err) {
      console.error("Error adding course:", err);
      alert("Failed to add course!");
    }
  };

  return (
    <div className="course-admin">
      <h1>Manage Courses</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <select
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          required
        >
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="coursesCount"
          placeholder="Lessons Count"
          value={formData.coursesCount}
          onChange={handleChange}
        />
        <input
          type="number"
          name="studentsCount"
          placeholder="Students Count"
          value={formData.studentsCount}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="instructor"
          placeholder="Instructor Name"
          value={formData.instructor}
          onChange={handleChange}
        />

        <label>
          Popular:{" "}
          <input
            type="checkbox"
            name="popular"
            checked={formData.popular}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default CoursesAdmin;
