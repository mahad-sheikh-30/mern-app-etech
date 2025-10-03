import { useState, useEffect } from "react";
import axios from "axios";

export const useEnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setEnrolledCourses([]);

          return;
        }

        const res = await axios.get(
          "http://localhost:8080/api/enrollments/my",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEnrolledCourses(res.data);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchEnrollments();
  }, []);
  const addEnrollment = (courseId: string) => {
    setEnrolledCourses((prev) => [...prev, courseId]);
  };
  return { enrolledCourses, addEnrollment };
};
