import "./styles.css";
import React from "react";
//Common
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import Login from "./components/Common/Login";
import Profile from "./components/Common/Profile";
//Admin
import AdminTeachers from "./components/Admin/AdminTeachers";
import AdminStudents from "./components/Admin/AdminStudents";
import AdminSubjects from "./components/Admin/AdminSubjects";
//Student
import StudentSubjects from "./components/Student/StudentSubjects";
import StudentRanking from "./components/Student/StudentRanking";
//Teacher
import TeacherSubjects from "./components/Teacher/TeacherSubjects";
//React Routes
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("accessToken");
  var userType = null;
  if (token) {
    //TODO: Change fname to usertype
    userType = JSON.parse(localStorage.getItem("user"))["fname"];
  }

  function RedirectToLogin() {
    return <Navigate replace to={"/login"} />;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/*
                Karn = admin
                Ivy = student
                Walter = teacher
          */}
          {/* TODO: Change names to respective usertypes */}
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/profile"
            element={token ? <Profile /> : RedirectToLogin()}
          />
          <Route
            exact
            path="/admin/students"
            element={
              token && userType === "Karn" ? <AdminStudents /> : RedirectToLogin()
            }
          />
          <Route
            exact
            path="/admin/teachers"
            element={
              token && userType === "Karn" ? <AdminTeachers /> : RedirectToLogin()
            }
          />
          <Route
            exact
            path="/admin/subjects"
            element={
              token && userType === "Karn" ? <AdminSubjects /> : RedirectToLogin()
            }
          />
          <Route
            exact
            path="/student/ranking"
            element={
              token && userType === "Ivy" ? <StudentRanking /> : RedirectToLogin()
            }
          />
          <Route
            exact
            path="/student/subjects"
            element={
              token && userType === "Ivy" ? <StudentSubjects /> : RedirectToLogin()
            }
          />
          <Route
            exact
            path="/teacher/subjects"
            element={
              token && userType === "Walter" ? <TeacherSubjects /> : RedirectToLogin()
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
