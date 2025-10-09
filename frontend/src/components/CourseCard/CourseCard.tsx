import "./CourseCard.css";
import React, { useState, useEffect } from "react";
import type { Teacher } from "../TeacherCard/TeacherCard";

import { useNavigate } from "react-router-dom";
import { createEnrollment } from "../../api/enrollmentApi";

export interface Course {
  _id: string;
  image: string;
  category: string;
  tag: string;
  title: string;
  coursesCount: number;
  studentsCount: number;
  price: number;
  teacherId: Teacher;
  popular?: boolean;
}

const CourseCard: React.FC<{
  course: Course;
  checkout?: boolean;
  enrolledCourses?: string[];
  onEnrollSuccess?: (courseId: string) => void;
}> = ({ course, checkout = false, enrolledCourses = [], onEnrollSuccess }) => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   loadEnrolledCourses();
  // }, []);

  // const loadEnrolledCourses = async () => {
  //   try {
  //     const data = await getEnrolledCourses();
  //     console.log(data);
  //     setEnrolledCourses(data);
  //   } catch (err) {
  //     console.error("Error fetching courses:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const [enrolledCourses, setEnrolledCourses] = useState<String[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const isEnroll = enrolledCourses.includes(course._id);
  const [loading, setLoading] = useState(false);
  const handleEnroll = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading || isEnroll) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please sign in first!");
        navigate("/signin");
        return;
      }
      const role = localStorage.getItem("role");
      if (role === "admin") {
        alert("Admin cannot enroll in a course!");
        return;
      }
      setLoading(true);

      if (course.price === 0) {
        await createEnrollment({ courseId: course._id });
        localStorage.setItem("role", "student");
        alert("You have been enrolled in this free course!");
        onEnrollSuccess?.(course._id);
        setLoading(false);
        return;
      }

      navigate("/checkout", { state: { course } });

      // const res = await axios.post(
      //   "http://localhost:8080/api/payment/create-checkout-session",
      //   { courseId: course._id },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      // window.location.href = res.data.url;
    } catch (error: any) {
      console.error("Payment session failed:", error);
      alert(
        error.response?.data?.error ||
          "Payment session could not be created. Try again."
      );
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    if (loading) return;
    setModalOpen(true);
  };

  return (
    <>
      <div className="card" onClick={handleCardClick}>
        <img src={course.image} className="main-img" />
        <div className="card-details">
          <div className="cat-tag">
            <span className="cat">{course.category}</span>
            <span className="tag">{course.tag}</span>
          </div>
          <h2 className="title">{course.title}</h2>
          <div className="meta-info">
            <span className="courses">{course.coursesCount} Lessons</span>
            <span className="students">{course.studentsCount} Students</span>
          </div>
          <div className="pri-ins">
            <h2 className="price">${course.price}</h2>

            <span className="instruct">
              {course.teacherId?.name || "Not assigned yet"}
            </span>
          </div>
          {checkout ? (
            <></>
          ) : isEnroll ? (
            <button className="enroll-btn enrolled-btn" disabled>
              Enrolled
            </button>
          ) : (
            <button
              className="enroll-btn"
              onClick={handleEnroll}
              disabled={loading}
            >
              {loading ? "Redirecting..." : "Enroll"}
            </button>
          )}
        </div>
      </div>
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={course.image} className="modal-img-fullscreen" />

            <div className="modal-details-column">
              <div className="cat-tag">
                <span className="cat">{course.category}</span>
                <span className="tag">{course.tag}</span>
              </div>
              <h2 className="title">{course.title}</h2>
              <span className="courses">{course.coursesCount} Lessons</span>
              <span className="students">{course.studentsCount} Students</span>
              <h2 className="price">${course.price}</h2>
              <span className="instruct">
                {course.teacherId?.name || "Not assigned yet"}
              </span>

              {isEnroll ? (
                <button className="enroll-btn enrolled-btn" disabled>
                  Enrolled
                </button>
              ) : (
                <button className="enroll-btn" onClick={handleEnroll}>
                  Enroll
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CourseCard;
