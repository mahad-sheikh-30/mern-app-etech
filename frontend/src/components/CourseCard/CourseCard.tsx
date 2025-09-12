import "./CourseCard.css";
import React from "react";

export interface Course {
  id: string;
  image: string;
  category: string;
  tag: string;
  title: string;
  coursesCount: number;
  studentsCount: number;
  price: string;
  instructor: string;
  instructorImg: string;
  popular?: boolean;
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <div className="card">
    <img
      src={course.image}
      alt={`Course: ${course.title}`}
      className="main-img"
    />
    <div className="card-details">
      <div className="cat-tag">
        <span className="cat">{course.category}</span>
        <span className="tag">{course.tag}</span>
      </div>
      <h2 className="title">{course.title}</h2>
      <div className="meta-info">
        <span className="courses">{course.coursesCount} Courses</span>
        <span className="students">{course.studentsCount} Students</span>
      </div>
      <div className="pri-ins">
        <h2 className="price">{course.price}</h2>
        <img
          src={course.instructorImg}
          alt={`Instructor: ${course.instructor}`}
          className="user-img"
        />
        <span className="instruct">{course.instructor}</span>
      </div>
    </div>
  </div>
);

export default CourseCard;
