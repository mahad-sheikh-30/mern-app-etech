import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminForms.css";

const EnrollmentsAdmin: React.FC = () => {
  const [enrollments, setEnrollments] = useState<any[]>([]);

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please sign in first!");
    return;
  }

  useEffect(() => {
    fetchEnrollments();
  }, []);
  const fetchEnrollments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/enrollments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEnrollments(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/enrollments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.newRole) {
        localStorage.setItem("role", res.data.newRole);
      }
      alert(res.data.message);
      fetchEnrollments();
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error || "Failed to delete enrollment");
      } else {
        alert("Something went wrong");
      }
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="main-h">Manage Enrollments</h1>
      <div className="list">
        <h2>All Enrollments</h2>
        <hr />
        <div className="comp-list">
          <div className="comp-list">
            {enrollments.map((enroll) => (
              <div key={enroll._id} className="comp-card">
                <div className="info">
                  <p>
                    <strong>Student: </strong> {enroll.userId?.name}
                  </p>
                  <p>
                    <strong>Course: </strong> {enroll.courseId?.title}
                  </p>
                  <p>
                    <strong>Teacher: </strong>{" "}
                    {enroll.courseId?.teacherId?.name}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(enroll._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrollmentsAdmin;
