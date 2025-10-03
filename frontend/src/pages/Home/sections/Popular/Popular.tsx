import React, { useEffect, useState } from "react";
import CourseCard from "../../../../components/CourseCard/CourseCard";
import type { Course } from "../../../../components/CourseCard/CourseCard";
import "./Popular.css";
import axios from "axios";

const Popular: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularCourses();
  }, []);
  const fetchPopularCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/courses");
      const popularCourses = res.data
        .filter((c: Course) => c.popular)
        .sort((a: Course, b: Course) => b.price - a.price)
        .slice(0, 3);
      setCourses(popularCourses);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <h2>Loading popular courses...</h2>;

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
      <div className="popular-cards">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default Popular;
