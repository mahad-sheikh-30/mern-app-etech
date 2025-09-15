import Home from "./pages/Home/Home";
import Courses from "./pages/Courses/Courses";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import TeacherPage from "./pages/TeacherPage/TeacherPage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import "./index.css";
function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/teachers" element={<TeacherPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
