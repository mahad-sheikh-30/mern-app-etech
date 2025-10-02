import React, { useEffect, useState } from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import type { Teacher } from "../../components/TeacherCard/TeacherCard";
import "./TeacherPage.css";
import axios from "axios";

const TeacherPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/teachers");
        console.log(res.data);
        setTeachers(res.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  if (loading) return <h2>Loading teachers...</h2>;

  return (
    <>
      <section className="teachers-page">
        <h1 className="teachers-title">Meet Our Instructors</h1>
        <div className="teachers-list">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </section>
    </>
  );
};

export default TeacherPage;
