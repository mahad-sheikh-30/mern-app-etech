import React from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import type { Course } from "../../components/CourseCard/CourseCard";
import "./Courses.css";

import laptop1 from "../../assets/laptop1.jpeg";
import laptop2 from "../../assets/laptop2.jpg";
import laptop3 from "../../assets/laptop3.png";
import userCircle from "../../assets/user-circle.png";

export const allCourses: Course[] = [
  {
    id: "1",
    image: laptop1,
    category: "Web Design",
    tag: "Free",
    title: "Web Design & Development",
    coursesCount: 8,
    studentsCount: 50,
    price: "$160.00",
    instructor: "Asad Ali",
    instructorImg: userCircle,
    popular: true,
  },
  {
    id: "2",
    image: laptop2,
    category: "Web Design",
    tag: "Free",
    title: "Wireframing & Prototyping",
    coursesCount: 6,
    studentsCount: 400,
    price: "$190.00",
    instructor: "Faiza Awan",
    instructorImg: userCircle,
    popular: true,
  },
  {
    id: "3",
    image: laptop3,
    category: "Open Course",
    tag: "Free",
    title: "Python For Data Science",
    coursesCount: 10,
    studentsCount: 500,
    price: "$432.00",
    instructor: "Asad Ali",
    instructorImg: userCircle,
    popular: true,
  },
  {
    id: "4",
    image: laptop1,
    category: "Business",
    tag: "Premium",
    title: "Business Management Essentials",
    coursesCount: 5,
    studentsCount: 120,
    price: "$210.00",
    instructor: "Sara Khan",
    instructorImg: userCircle,
  },
  {
    id: "5",
    image: laptop2,
    category: "Marketing",
    tag: "Free",
    title: "Digital Marketing Masterclass",
    coursesCount: 7,
    studentsCount: 340,
    price: "$10.00",
    instructor: "Ali Raza",
    instructorImg: userCircle,
  },
  {
    id: "6",
    image: laptop3,
    category: "Design",
    tag: "Premium",
    title: "Graphic Design Bootcamp",
    coursesCount: 9,
    studentsCount: 210,
    price: "$299.00",
    instructor: "Hina Malik",
    instructorImg: userCircle,
  },
  {
    id: "7",
    image: laptop1,
    category: "IT & Software",
    tag: "Free",
    title: "Cloud Computing Basics",
    coursesCount: 4,
    studentsCount: 180,
    price: "$0.00",
    instructor: "Bilal Ahmed",
    instructorImg: userCircle,
  },
  {
    id: "8",
    image: laptop2,
    category: "Education",
    tag: "Premium",
    title: "Education Leadership",
    coursesCount: 3,
    studentsCount: 90,
    price: "$150.00",
    instructor: "Dr. Sadaf",
    instructorImg: userCircle,
  },
  {
    id: "9",
    image: laptop3,
    category: "Teaching",
    tag: "Free",
    title: "Online Teaching Tools",
    coursesCount: 2,
    studentsCount: 60,
    price: "$0.00",
    instructor: "Adeel Qureshi",
    instructorImg: userCircle,
  },
];

const Courses: React.FC = () => (
  <>
    <section className="courses-page">
      <h1 id="title">All Courses</h1>
      <div className="popular-cards">
        {allCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  </>
);

export default Courses;
