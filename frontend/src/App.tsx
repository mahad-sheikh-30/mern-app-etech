import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Courses from "./pages/Courses/Courses";
import TeacherPage from "./pages/TeacherPage/TeacherPage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

import AdminPanel from "./pages/Admin/AdminPanel";
import CoursesAdmin from "./pages/Admin/CoursesAdmin";
import TeachersAdmin from "./pages/Admin/TeachersAdmin";
import EnrollmentsAdmin from "./pages/Admin/EnrollmentsAdmin";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/teachers" element={<TeacherPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/courses" element={<CoursesAdmin />} />
          <Route path="/admin/teachers" element={<TeachersAdmin />} />
          <Route path="/admin/enrollments" element={<EnrollmentsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
