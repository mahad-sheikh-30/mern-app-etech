import React, { useEffect, useState } from "react";
import CourseCard from "../../../../components/CourseCard/CourseCard";
import type { Course } from "../../../../components/CourseCard/CourseCard";
import "./Popular.css";
import axios from "axios";
import { getPopularCourses } from "../../../../api/courseService";

const Popular: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getPopularCourses();
      setPopularCourses(data);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="popular" id="offers">
      <div className="popular-head">
        <h1>Our Popular Courses</h1>
        <p>
          Discover our most sought-after courses, carefully curated to meet the
          demands of modern learners. Dive into engaging lessons crafted for
          success in every stage of your educational journey.
        </p>
      </div>
      {loading ? (
        <h2>Loading popular courses...</h2>
      ) : (
        <div className="popular-cards">
          {popularCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Popular;
