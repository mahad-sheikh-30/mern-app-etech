import React, { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import type { Course } from "../../components/CourseCard/CourseCard";
import "./Courses.css";
import axios from "axios";

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/courses");
        console.log(res);
        console.log(res.data);
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <h2>Loading courses...</h2>;

  return (
    <section className="courses-page">
      <h1 id="title">All Courses</h1>
      <div className="popular-cards">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default Courses;
