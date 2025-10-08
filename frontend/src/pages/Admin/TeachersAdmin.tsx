import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllTeachers } from "../../api/getService";
import "./AdminForms.css";

const TeachersAdmin: React.FC = () => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    role: "",
    rating: 0,
    image: null as File | null,
  });

  useEffect(() => {
    loadTeachers();
  }, []);

  const [teachers, setTeachers] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const loadTeachers = async () => {
    try {
      const data = await getAllTeachers("teachers");
      setTeachers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  const handleEdit = (teacher: any) => {
    setFormData(teacher);
    setImagePreview(teacher.image || null);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this teacher?"))
      return;
    try {
      await axios.delete(`http://localhost:8080/api/teachers/${id}`);
      loadTeachers();
    } catch (err) {
      console.error("Error deleting teacher:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const fileData = new FormData();
      fileData.append("name", formData.name);
      fileData.append("role", formData.role);
      fileData.append("rating", String(formData.rating));
      if (formData.image) {
        fileData.append("image", formData.image);
      }

      if (isEditing) {
        await axios.put(
          `http://localhost:8080/api/teachers/${formData._id}`,
          fileData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Teacher updated!");
      } else {
        await axios.post("http://localhost:8080/api/teachers", fileData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Teacher Added");
      }
      setFormData({
        _id: "",
        image: null as File | null,
        name: "",
        role: "",
        rating: 0,
      });
      setIsEditing(false);
      loadTeachers();
    } catch (err) {
      console.error("Error adding teacher:", err);
      alert("Failed to add teacher!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="main-h">Manage Teachers</h1>

      <div className="list">
        <h2>{isEditing ? "Update " : "Add "}Teacher</h2>
        <hr />
        <form className="form-container" onSubmit={handleSubmit}>
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
          <div className="form-row">
            <label>
              Rating
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={formData.rating || ""}
                onChange={handleChange}
                min="0"
                max="5"
              />
            </label>
            <label>
              Image
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setFormData({
                    ...formData,
                    image: file,
                  });
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>

            {imagePreview && (
              <div className="preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
          <button type="submit">{isEditing ? "Update " : "Add "}Teacher</button>
        </form>
      </div>

      <div className="list">
        <h2>All Teachers</h2>
        <hr />
        {loading ? (
          <h2>Loading teachers...</h2>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default TeachersAdmin;
