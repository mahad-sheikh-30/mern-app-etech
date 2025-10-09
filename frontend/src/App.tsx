import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.tsx/ProtectedRoute";
import Home from "./pages/Home/Home";
import Courses from "./pages/Courses/Courses";
import TeacherPage from "./pages/TeacherPage/TeacherPage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Transactions from "./pages/Transactions/Transactions";
import AdminPanel from "./pages/Admin/AdminPanel";
import CoursesAdmin from "./pages/Admin/CoursesAdmin";
import TeachersAdmin from "./pages/Admin/TeachersAdmin";
import EnrollmentsAdmin from "./pages/Admin/EnrollmentsAdmin";
import Success from "./pages/Success/Success";
import Cancel from "./pages/Cancel/Cancel";
import PaymentPage from "./pages/Payment/Payment";
import AdminTransactions from "./pages/Admin/TransactionsAdmin";

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
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/checkout" element={<PaymentPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<AdminPanel />} />
          <Route path="courses" element={<CoursesAdmin />} />
          <Route path="teachers" element={<TeachersAdmin />} />
          <Route path="enrollments" element={<EnrollmentsAdmin />} />
          <Route path="transactions" element={<AdminTransactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
