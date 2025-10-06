import axios from "axios";
import type { Course } from "../components/CourseCard/CourseCard";

const API_URL = "http://localhost:8080/api/courses";

export const getAllCourses = async (): Promise<Course[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getPopularCourses = async (): Promise<Course[]> => {
  const courses = await getAllCourses();
  return courses.filter((c) => c.popular);
};
