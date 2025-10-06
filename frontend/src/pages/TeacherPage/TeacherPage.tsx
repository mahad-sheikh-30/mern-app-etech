import React, { useEffect, useState } from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import type { Teacher } from "../../components/TeacherCard/TeacherCard";
import "./TeacherPage.css";
import axios from "axios";
import searchIcon from "../../assets/search.png";

const TeacherPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchTeachers();
  }, []);
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/teachers");
      console.log(res.data);
      setTeachers(res.data);
      setFilteredTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value) {
      setFilteredTeachers(teachers);
    } else {
      setFilteredTeachers(
        teachers.filter((t) => t.name.toLowerCase().includes(value))
      );
    }
  };
  if (loading) return <h2>Loading teachers...</h2>;

  return (
    <>
      <section className="teachers-page">
        <h1 id="title">Meet Our Instructors</h1>
        <div className="head">
          <div className="search-bar">
            <img src={searchIcon} alt="search" />
            <input
              type="text"
              placeholder="Search teachers..."
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
                    setFilteredTeachers(
                      [...filteredTeachers].sort((a, b) => a.rating - b.rating)
                    );
                  }}
                >
                  Rating: Low to High
                </p>
              </strong>
              <hr />
              <strong>
                <p
                  onClick={() => {
                    setFilteredTeachers(
                      [...filteredTeachers].sort((a, b) => b.rating - a.rating)
                    );
                  }}
                >
                  Rating: High to Low
                </p>
              </strong>
            </div>
          )}
        </div>
        <div className="teachers-list">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))
          ) : (
            <h3>No teachers found</h3>
          )}
        </div>
      </section>
    </>
  );
};

export default TeacherPage;
