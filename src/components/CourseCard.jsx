import React from 'react';
import { motion } from 'framer-motion';
import defaultThumbnail from '../assets/defaultThumbnail.jpg';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';


const CourseCard = ({ course, user }) => {
  const navigate = useNavigate();
  const isEnrolled = user?.enrolledCourses?.includes(course._id);
  const {width} = useWindowSize();
  const isDesktop = width > 1024 ? 15 : 10;

  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col lg:flex-row max-w-6xl w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
      onClick={() => navigate(`/courses/course-details/${course._id}`)}
    >
      <div className="lg:w-1/3 w-full h-[200px] lg:h-auto bg-gray-50 top-0">
        <img
          src={course?.courseThumbnail || defaultThumbnail}
          alt="Course Thumbnail"
          className=" w-full h-full object-contain"
        />
      </div>

      <div className="lg:w-2/3 w-full p-6 flex flex-col justify-between bg-gray-50">
        <div>
          <h2 className="text-sm font-bold lg:text-2xl lg:font-semibold text-gray-900 mb-1">{course.courseTitle}</h2>
          <p className="text-sm text-gray-600 mb-2">Category: <span className="font-medium text-gray-800">{course.category}</span></p>

          <div className="flex items-center justify-between mb-4">
            <span className="lg:text-lg font-semibold text-[#192A88]">{course.coursePrice}</span>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Bestseller</span>
          </div>

          <p className='text-sm text-gray-700 leading-relaxed mb-4 hidden lg:flex' dangerouslySetInnerHTML={{ __html: truncateText(course?.description, isDesktop) }} /> 
        </div>

        <button className="w-fit bg-[#192A88] text-white px-3 py-2 lg:px-5 lg:py-2.5 rounded-md hover:bg-black transition-all duration-200 text-sm font-medium border border-[#192A88] hover:border-black hover:scale-105 active:scale-95">
          {isEnrolled ? "Continue Course" : "Enroll Now"}
        </button>
      </div>
    </motion.div>
  );

};

export default CourseCard;
