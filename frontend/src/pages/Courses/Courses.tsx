import React, { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import type { Course } from "../../components/CourseCard/CourseCard";
import "./Courses.css";
import searchIcon from "../../assets/search.png";
import { useLocation } from "react-router-dom";
import { getAllCourses } from "../../api/getService";

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("search") || "";

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data);
      setFilteredCourses(data);

      if (initialSearch) {
        const lower = initialSearch.toLowerCase();
        setSearchTerm(initialSearch);
        setFilteredCourses(
          data.filter((c: Course) => c.title.toLowerCase().includes(lower))
        );
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((c) => c.title.toLowerCase().includes(value))
      );
    }
  };
  if (loading) return <h2>Loading courses...</h2>;

  return (
    <section className="courses-page">
      <h1 id="title">All Courses</h1>
      <div className="head">
        <div className="search-bar">
          <img src={searchIcon} alt="search" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <button
          className="filter-btn"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        {isOpen && (
          <div className="filter-opt">
            <strong>
              <p
                onClick={() => {
                  setFilteredCourses(
                    [...filteredCourses].sort((a, b) => a.price - b.price)
                  );
                }}
              >
                Price: Low to High
              </p>
            </strong>
            <hr />
            <strong>
              <p
                onClick={() => {
                  setFilteredCourses(
                    [...filteredCourses].sort((a, b) => b.price - a.price)
                  );
                }}
              >
                Price: High to Low
              </p>
            </strong>
            <hr />
            <strong>
              <p
                onClick={() => {
                  setFilteredCourses(
                    [...filteredCourses].sort(
                      (a, b) => a.studentsCount - b.studentsCount
                    )
                  );
                }}
              >
                Sort by Students Count
              </p>
            </strong>
            <hr />
            <strong>
              <p
                onClick={() => {
                  setFilteredCourses(
                    [...filteredCourses].sort(
                      (a, b) => a.coursesCount - b.coursesCount
                    )
                  );
                }}
              >
                Sort by Lessons Count
              </p>
            </strong>
          </div>
        )}
      </div>

      <div className="popular-cards">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <h3>No courses found</h3>
        )}
      </div>
    </section>
  );
};

export default Courses;
