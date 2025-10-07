import axios from "axios";
import type { Course } from "../components/CourseCard/CourseCard";
import type { Teacher } from "../components/TeacherCard/TeacherCard";
const API_URL = "http://localhost:8080/api/";

export const getAllCourses = async (
  name: string = "courses"
): Promise<Course[]> => {
  const res = await axios.get(API_URL + name);
  return res.data;
};
export const getAllTeachers = async (name: string): Promise<Teacher[]> => {
  const res = await axios.get(API_URL + name);
  return res.data;
};

export const getPopularCourses = async (): Promise<Course[]> => {
  const courses = await getAllCourses();
  return courses.filter((c) => c.popular);
};
