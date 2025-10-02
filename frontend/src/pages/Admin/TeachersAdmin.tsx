import axios from "axios";
import React, { useEffect, useState } from "react";

import "./AdminForms.css";

const TeachersAdmin: React.FC = () => {
  const [formData, setFormData] = useState({
    _id: "",
    image: "",
    name: "",
    role: "",
    rating: 0,
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const [teachers, setTeachers] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/teachers");
      setTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  const handleEdit = (teacher: any) => {
    setFormData(teacher);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this teacher?"))
      return;
    try {
      await axios.delete(`http://localhost:8080/api/teachers/${id}`);
      fetchTeachers();
    } catch (err) {
      console.error("Error deleting teacher:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:8080/api/teachers/${formData._id}`,
          formData
        );
        alert("Teacher updated!");
      } else {
        const { _id, ...newTeacher } = formData;
        await axios.post("http://localhost:8080/api/teachers", newTeacher);
        alert("Teacher Added");
      }
      setFormData({
        _id: "",
        image: "",
        name: "",
        role: "",
        rating: 0,
      });
      setIsEditing(false);
      fetchTeachers();
    } catch (err) {
      console.error("Error adding teacher:", err);
      alert("Failed to add teacher!");
    }
  };

  return (
    <>
      <h1 className="main-h">Manage Teachers</h1>

      <div className="add">
        <h2>{isEditing ? "Update " : "Add "}Teacher</h2>
        <hr />
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Image URL
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
              />
            </label>

            <label>
              Rating
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={formData.rating}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Instructor Name
              <input
                type="text"
                name="name"
                placeholder="Instructor Name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Role
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={formData.role}
                onChange={handleChange}
              />
            </label>
          </div>

          <button type="submit">{isEditing ? "Update " : "Add "}Teacher</button>
        </form>
      </div>

      <div className="list">
        <h2>All Teachers</h2>
        <hr />
        <div className="comp-list">
          {teachers.map((teacher) => (
            <div key={teacher._id} className="comp-card">
              <div className="info">
                <h3>{teacher.name}</h3>
              </div>
              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(teacher)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(teacher._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeachersAdmin;
