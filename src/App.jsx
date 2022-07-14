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
import AdminSections from "./components/Admin/AdminSections";
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
        <Route exact path="/admin/students" element={<AdminUsers userType = "Ivy" />} />
        <Route exact path="/admin/teachers" element={<AdminUsers userType = "Walter" />} />
        <Route exact path="/admin/admins" element={<AdminUsers userType = "Karn" />} />
        <Route exact path="/admin/subjects" element={<AdminSubjects />} />
        <Route exact path="/admin/sections" element={<AdminSections />} />
        <Route exact path="/student/ranking" element={<StudentRanking />} />
        <Route exact path="/student/subjects" element={<StudentSubjects />} />
        <Route exact path="/teacher/subjects" element={<TeacherSubjects />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
