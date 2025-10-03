import "./CourseCard.css";
import React, { useState, useEffect } from "react";
import type { Teacher } from "../TeacherCard/TeacherCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEnrolledCourses } from "../../customHooks/useEnrolledCourses";

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

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const navigate = useNavigate();

  const { enrolledCourses, addEnrollment } = useEnrolledCourses();

  const isEnroll = enrolledCourses.includes(course._id);
  const handleEnroll = async () => {
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
      const res = await axios.post(
        "http://localhost:8080/api/enrollments",
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("role", "student");
      addEnrollment(course._id);

      alert("Successfully enrolled!");
      console.log(res.data);
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error || "Failed to enroll");
      } else {
        alert("Something went wrong");
      }
      console.error(error);
    }
  };

  return (
    <div className="card">
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

        {isEnroll ? (
          <button className=" enroll-btn enrolled-btn" disabled>
            Enrolled
          </button>
        ) : (
          <button className="enroll-btn" onClick={handleEnroll}>
            Enroll
          </button>
        )}
      </div>
    </div>
  );
};
export default CourseCard;
