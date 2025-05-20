

import React from 'react'
import Navbar from '../components/Navbar'
import { useGetLectureQuery } from '../features/api/courseApi'
import { useParams } from 'react-router-dom'
import { CgPlayButtonO } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { useGetCourseByIdQuery } from '../features/api/courseApi'

const CourseProgress = () => {
  const { courseId } = useParams();
  const [currentLecture, setCurrentLecture] = useState(null);
  const { data: lectures } = useGetLectureQuery(courseId);
  const { data: course, isLoading, error } = useGetCourseByIdQuery(courseId);

  useEffect(() => {
    if (lectures?.lectures?.length > 0) {
      setCurrentLecture(lectures.lectures[0]);
    }
  }, [lectures]);

  return (
    <>
      <Navbar />
      <div className='w-full min-h-screen mt-[-2%] overflow-x-hidden bg-gray-50'>

        <div className='flex items-center gap-4 ml-[5%] mt-6'>
          <img 
            src={course?.course?.courseThumbnail} 
            alt="course thumbnail"
            className='w-20 h-20 rounded-lg object-cover shadow-md border border-gray-300'
          />
          <h1 className='font-bold text-2xl text-gray-900'>{course?.course?.courseTitle}</h1>
        </div>

        <div className='flex flex-col lg:flex-row w-[90%] gap-8 mx-auto mt-8 mb-[7%]'>

          <div className='flex flex-col w-full lg:w-[65%] bg-white shadow-xl shadow-gray-300 p-6 rounded-xl'>
            {currentLecture && (
              <>
                <div className='w-full rounded-xl overflow-hidden'>
                  <video 
                    src={currentLecture?.videoUrl} 
                    controls 
                    autoPlay={true}
                    className='w-full rounded-xl aspect-video object-cover bg-black' 
                  />
                </div>
                <h1 className='font-semibold mt-4 text-xl text-gray-800 px-2'>
                  Lecture {lectures.lectures.findIndex(lec => lec._id === currentLecture._id) + 1}: {currentLecture.lectureTitle}
                </h1>
              </>
            )}
          </div>

          <div className='flex flex-col w-full lg:w-[30%] bg-white shadow-lg shadow-gray-200 rounded-2xl p-6 text-lg'>
            <h1 className='font-bold text-2xl mb-6 text-gray-900'>Course Content</h1>
            <ul className='space-y-3 overflow-y-auto max-h-[70vh]'>
              {lectures?.lectures.map((lecture) => (
                <li
                  key={lecture._id}
                  onClick={() => setCurrentLecture(lecture)}
                  className={`flex items-center gap-4 cursor-pointer border-2 p-3 rounded-xl transition-colors duration-200
                    ${currentLecture?._id === lecture._id
                      ? 'border-blue-600 bg-blue-100 text-blue-900 font-semibold shadow'
                      : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'}
                    `}
                >
                  <CgPlayButtonO className='text-xl' />
                  <span className='truncate'>{lecture.lectureTitle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseProgress;

