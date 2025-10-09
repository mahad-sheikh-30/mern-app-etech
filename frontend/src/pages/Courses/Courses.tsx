import React, { useEffect, useMemo, useState } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import type { Course } from "../../components/CourseCard/CourseCard";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import "./Courses.css";
import searchIcon from "../../assets/search.png";
import { useLocation } from "react-router-dom";
import { getAllCourses } from "../../api/courseApi";
import { getEnrolledCourses } from "../../api/enrollmentApi";

const Courses: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // const [courses, setCourses] = useState<Course[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  // const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });

  const { data: enrolledCourses = [], isLoading: enrolledLoading } = useQuery({
    queryKey: ["enrolled"],
    queryFn: getEnrolledCourses,
  });

  // useEffect(() => {
  //   loadCourses();
  // }, []);

  // const loadCourses = async () => {
  //   try {
  //     const [allCourses, enrolled] = await Promise.all([
  //       getAllCourses(),
  //       getEnrolledCourses(),
  //     ]);
  //     setCourses(allCourses);
  //     setFilteredCourses(allCourses);
  //     setEnrolledCourses(enrolled);

  //     if (initialSearch) {
  //       const lower = initialSearch.toLowerCase();
  //       setSearchTerm(initialSearch);
  //       setFilteredCourses(
  //         allCourses.filter((c: Course) =>
  //           c.title.toLowerCase().includes(lower)
  //         )
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Error fetching courses:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const loading = coursesLoading || enrolledLoading;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());

    // if (!value) {
    //   setFilteredCourses(courses);
    // } else {
    //   setFilteredCourses(
    //     courses.filter((c) => c.title.toLowerCase().includes(value))
    //   );
    // }
  };
  const filteredCourses = useMemo(() => {
    const search = (searchTerm || initialSearch).toLowerCase();
    return courses.filter((c: Course) =>
      c.title.toLowerCase().includes(search)
    );
  }, [courses, searchTerm, initialSearch]);

  const handleEnrollSuccess = (courseId: string) => {
    queryClient.setQueryData<string[]>(["enrolled"], (old = []) => [
      ...old,
      courseId,
    ]);
    queryClient.invalidateQueries({ queryKey: ["enrolled"] });
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
                  filteredCourses.sort(
                    (a: Course, b: Course) => a.price - b.price
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
                  filteredCourses.sort(
                    (a: Course, b: Course) => b.price - a.price
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
                  filteredCourses.sort(
                    (a: Course, b: Course) => a.studentsCount - b.studentsCount
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
                  filteredCourses.sort(
                    (a: Course, b: Course) => a.coursesCount - b.coursesCount
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
          filteredCourses.map((course: Course) => (
            <CourseCard
              key={course._id}
              course={course}
              enrolledCourses={enrolledCourses}
              onEnrollSuccess={handleEnrollSuccess}
            />
          ))
        ) : (
          <h3>No courses found</h3>
        )}
      </div>
    </section>
  );
};

export default Courses;
