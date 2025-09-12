import React from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import type { Teacher } from "../../components/TeacherCard/TeacherCard";
import teacherImg from "../../assets/teacher.png";
import userCircle from "../../assets/user-circle.png";
import girl1 from "../../assets/girl1.png";
import girl1Alt from "../../assets/girl-1.png";
import "./TeacherPage.css";

const teachers: Teacher[] = [
  {
    id: "1",
    image: teacherImg,
    name: "Asad Ali",
    role: "Mathematics Expert",
    rating: 4.9,
  },
  {
    id: "2",
    image: userCircle,
    name: "Faiza Awan",
    role: "Web Development",
    rating: 4.8,
  },
  {
    id: "3",
    image: girl1,
    name: "Sara Khan",
    role: "Business Management",
    rating: 4.7,
  },
  {
    id: "4",
    image: girl1Alt,
    name: "Bilal Ahmed",
    role: "Cloud Computing",
    rating: 4.6,
  },
  {
    id: "5",
    image: userCircle,
    name: "Adeel Qureshi",
    role: "Digital Marketing",
    rating: 4.8,
  },
];

const TeacherPage: React.FC = () => (
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

export default TeacherPage;
