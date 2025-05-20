import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGetCoursesByCreatorQuery } from '../../../features/api/courseApi'
import { FaEdit } from "react-icons/fa";
import { Navigate } from 'react-router-dom';

const CourseTable = () => {

  //fetching all the courses created by the current admin(instructor)

  const {data:courses, isLoading, isSuccess, error} = useGetCoursesByCreatorQuery();

  const navigate = useNavigate();

  useEffect(()=>{
    console.log("All courses created by instructor : ", courses);
  },[courses])

  if (isLoading) return <p>Loading courses...</p>;
  if (error) return <p>Error loading courses</p>;

  var totalPrice = courses?.courses?.reduce((sum, course) => sum + Number(course.coursePrice) || 0, 0);

  // var totalPrice = courses?.reduce((sum, course) => sum + Number(course.price) || 0, 0);

  


  return (
    <div className='overflow-x-hidden'>

      <div className='px-16 mt-10'>
      <Link to="/admin/create">  <button className='px-4 py-1 bg-black text-white rounded-xl cursor-pointer'> Create a new course </button>  </Link>
      </div>
      
      <div className='grid grid-cols-7 gap-5 text-black px-16 mt-10 cursor-pointer'>

        {/* header rows */}
        <div className='col-span-4 font-bold text-gray-500 ' >Title</div>
        <div className='col-span-1 font-bold text-gray-500 '>Price</div>
        <div className='col-span-1 font-bold text-gray-500 '>Status</div>
        <div className='col-span-1 font-bold text-gray-500 '>Action</div>

        

        {courses?.courses?.length>0 ? 
        <>
        {courses.courses.map((course) => {
          return (
            <React.Fragment key={course._id}>
              <div className='col-span-4 font-bold' > {course.courseTitle} </div>
              <div className='col-span-1 font-bold'> ${course.coursePrice||0} </div>
              <div className='col-span-1 font-bold text-md'> 
                {Boolean(course.isPublished)? <button className='px-2 py-1 bg-green-400 text-white rounded-xl'>published</button> : 
                <button className='px-2 py-1 bg-yellow-400 text-white rounded-xl'>Draft</button>}  </div>
              <div className='col-span-1 font-bold ml-5' onClick={() => navigate(`/admin/course/${course._id}`)} > <FaEdit /> </div>
            </React.Fragment>
          )
        })}
          <div className='col-span-4 font-bold text-gray-500 ' >Total</div>
          <div className='col-span-1 font-bold text-gray-500 '></div>
          <div className='col-span-1 font-bold text-gray-500 '></div>
          <div className='col-span-1 font-bold text-gray-500 '>${totalPrice}</div>

        </>
        : 
        (
          <div className='col-span-4 text-lg'> Course list is empty</div>
        )
        }

        

        
      </div>
    </div>
  )
}

export default CourseTable



// const fakeCourses = [
//   { title: "React for Beginners", price: 49, isPublished: true },
//   { title: "Advanced JavaScript", price: 79, isPublished: false },
//   { title: "Full Stack Web Development", price: 129, isPublished: true },
//   { title: "Python Data Science", price: 99, isPublished: false },
//   { title: "Machine Learning with Python", price: 149, isPublished: true },
//   { title: "UI/UX Design Fundamentals", price: 39, isPublished: true },
//   { title: "Cybersecurity Essentials", price: 59, isPublished: false }
// ];

// var totalPrice = fakeCourses.reduce((sum, course) => sum + parseInt(course.price), 0);