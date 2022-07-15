import "./styles.css";
import React from "react";
//Common
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import Login from "./components/Common/Login";
import Profile from "./components/Common/Profile";
//Admin
import AdminUsers from "./components/Admin/AdminUsers";
import AdminSubjects from "./components/Admin/AdminSubjects";
import CreateUsers from "./components/Admin/CreateUsers";
import CreateSubjects from "./components/Admin/CreateSubjects";
//Student
import StudentSubjects from "./components/Student/StudentSubjects";
import StudentRanking from "./components/Student/StudentRanking";
//Teacher
import TeacherSubjects from "./components/Teacher/TeacherSubjects";
//React Routes
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="wrapper">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/admin/students" element={<AdminUsers userType = "Student" />} />
        <Route exact path="/admin/student/create" element={<CreateUsers userType = "Student" />} />
        <Route exact path="/admin/teachers" element={<AdminUsers userType = "Teacher" />} />
        <Route exact path="/admin/teacher/create" element={<CreateUsers userType = "Teacher" />} />
        <Route exact path="/admin/admins" element={<AdminUsers userType = "Admin" />} />
        <Route exact path="/admin/admin/create" element={<CreateUsers userType = "Admin" />} />
        <Route exact path="/admin/subjects" element={<AdminSubjects />} />
        <Route exact path="/admin/subjects/create" element={<CreateSubjects />} />
        <Route exact path="/student/ranking" element={<StudentRanking />} />
        <Route exact path="/student/subjects" element={<StudentSubjects />} />
        <Route exact path="/teacher/subjects" element={<TeacherSubjects />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
