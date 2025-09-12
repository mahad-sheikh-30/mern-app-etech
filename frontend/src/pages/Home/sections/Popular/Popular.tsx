import React from "react";
import CourseCard from "../../../../components/CourseCard/CourseCard";

import "./Popular.css";

import { allCourses as courses } from "../../../Courses/Courses";

const Popular: React.FC = () => (
  <section className="popular" id="offers">
    <div className="popular-head">
      <h1>Our Popular Courses</h1>
      <p>
        Discover our most sought-after courses, carefully curated to meet the
        demands of modern learners. Dive into engaging lessons crafted for
        success in every stage of your educational journey.
      </p>
    </div>
    <div className="popular-cards">
      {courses
        .filter((c) => c.popular)
        .map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
    </div>
  </section>
);

export default Popular;
