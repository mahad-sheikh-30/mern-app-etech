import "./CourseCard.css";
import React from "react";

export interface Course {
  _id: string;
  image: string;
  category: string;
  tag: string;
  title: string;
  coursesCount: number;
  studentsCount: number;
  price: number;
  instructor: string;
  instructorImg: string;
  popular?: boolean;
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const handleEnroll = async () => {};

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

          <span className="instruct">{course.instructor}</span>
        </div>
        <button onClick={handleEnroll} className="enroll-btn">
          Enroll
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
