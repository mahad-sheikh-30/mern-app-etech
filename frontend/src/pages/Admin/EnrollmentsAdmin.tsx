import React from "react";
import { useState, useEffect } from "react";
import API from "../../api/axiosInstance";
import "./AdminForms.css";
import { useUser } from "../../context/UserContext";
import { deleteEnrollment, getAllEnrollments } from "../../api/enrollmentApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AppDataTable from "../../components/AppDataTable/AppDataTable";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";

const enrollmentColumns = [
  { name: "Student", selector: (row: any) => row.userId?.name, sortable: true },
  { name: "Course", selector: (row: any) => row.courseId?.title },
  { name: "Teacher", selector: (row: any) => row.courseId?.teacherId?.name },
];

const EnrollmentsAdmin: React.FC = () => {
  // const [enrollments, setEnrollments] = useState<any[]>([]);
  const { updateRole, user } = useUser();

  if (!user?.token) {
    toast.error("Please sign in first!");
    return;
  }
  const queryClient = useQueryClient();

  const { data: enrollments = [], isLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: getAllEnrollments,
  });

  console.log("Enrollments", enrollments);
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEnrollment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      toast.success("Enrollment deleted!");
    },
    onError: () => toast.error("Failed to delete enrollment"),
  });
  // useEffect(() => {
  //   fetchEnrollments();
  // }, []);
  // const fetchEnrollments = async () => {
  //   try {
  //     const res = await API.get("/enrollments");
  //     setEnrollments(res.data);
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error("Error fetching courses:", err);
  //   }
  // };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?"))
      return;
    try {
      const res = await deleteMutation.mutateAsync(id);
      if (res.newRole) {
        updateRole(res.newRole);
      }
      // alert(res.message);
      // fetchEnrollments();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while deleting the enrollment.");
      }
      console.error(error);
    }
  };

  return (
    <div className="enroll-admin">
      {deleteMutation.isPending && <FullPageLoader />}
      <AppDataTable
        title="All Enrollments"
        data={enrollments}
        columns={enrollmentColumns}
        isLoading={isLoading}
        onDelete={handleDelete}
        actions
      />
    </div>
  );
};

export default EnrollmentsAdmin;
