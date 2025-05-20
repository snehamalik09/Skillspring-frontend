import { useEffect, useState } from 'react';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import Courses from './Pages/Courses';
import 'react-toastify/dist/ReactToastify.css'; 
import MyCourses from './Pages/MyCourses';
import Dashboard from './Pages/Dashboard';
import Sidebar from './Pages/admin/Sidebar';
import AddCourse from './Pages/admin/Course/AddCourse';
import CourseTable from './Pages/admin/Course/CourseTable';
import AdminDashboard from './Pages/admin/AdminDashboard';
import CourseDetails from './Pages/CourseDetails';
import EditCourse from './Pages/admin/Course/EditCourse';
import CreateLecture from './Pages/admin/Lectures/CreateLecture';
import EditLecture from './Pages/admin/Lectures/EditLecture';
import PaymentFailed from './Pages/PaymentFailed.jsx';
import CourseProgress from './Pages/CourseProgress.jsx';
import SearchPage from './components/SearchPage.jsx';
import { useDispatch } from 'react-redux';
import { userLoggedIn, userLoggedOut } from './features/authSlice.js';
import { useGetUserQuery } from './features/api/authApi.js';
import Contact from './components/Contact.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx';


function App() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetUserQuery();

  useEffect(() => {
  if (data?.user) {
    dispatch(userLoggedIn({ user: data.user }));
  } else if (error) {
    dispatch(userLoggedOut()); 
  }
}, [data, error, dispatch]);



  return(
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/courses" element={<Courses/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/courses/search" element={<SearchPage/>}></Route>
        <Route path="/course-progress/:courseId" element={<CourseProgress/>}></Route>
        <Route path="/courses/course-details/:courseId" element={<CourseDetails/>}></Route>
        <Route path="/mycourses" element={<MyCourses/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/paymentSuccess" element={<PaymentSuccess/>}></Route>
        <Route path="/PaymentFailed" element={<PaymentFailed/>}></Route>
        <Route path="/admin" element={<Sidebar/>}>
            <Route index element={<AdminDashboard/>} /> 
            <Route path="courses" element={<CourseTable/>} /> 
            <Route path="create" element={<AddCourse/>} /> 
            <Route path="course/:courseId" element={<EditCourse/>} /> 
            <Route path="course/:courseId/lecture" element={<CreateLecture/>} />   
            <Route path="course/:courseId/lecture/:lectureId" element={<EditLecture/>} />   
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App;

