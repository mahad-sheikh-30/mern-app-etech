import { Link, useSearchParams } from "react-router-dom";
import { useEnrolledCourses } from "../../customHooks/useEnrolledCourses";
import { useEffect } from "react";
export default function Success() {
  const [params] = useSearchParams();
  const courseId = params.get("courseId");
  const { addEnrollment } = useEnrolledCourses();

  useEffect(() => {
    if (courseId) {
      addEnrollment(courseId);
      localStorage.setItem("role", "student");
    }
  }, [courseId]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {courseId ? (
        <>
          <h1>Payment Successful!</h1>
          <p>You are now successfully enrolled in course</p>
          <Link to="/courses">Go back to Courses</Link>
        </>
      ) : (
        <h1>404. Page not found</h1>
      )}
    </div>
  );
}
