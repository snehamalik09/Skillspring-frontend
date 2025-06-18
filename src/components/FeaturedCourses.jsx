import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPublishedCoursesQuery } from '../features/api/authApi.js';
import { useSelector } from "react-redux";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";





const FeaturedCourses = () => {
    const { data: courses, isLoading } = useGetPublishedCoursesQuery();
    const userDetails = useSelector((state) => state.auth);
    const isLoggedIn = userDetails.isAuthenticated;
    const navigate = useNavigate();
    const card = useRef(null);

    const featured = courses?.data?.slice(0, 4) || [];

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    }

    const scroll = (direction) => {
        const container = card.current;
        const scrollAmount = window.innerWidth * 0.33;
        if (direction === 'left')
            container.scrollBy({ left: -scrollAmount, behaviour: 'smooth' });
        if (direction === 'right')
            container.scrollBy({ left: scrollAmount, behaviour: 'smooth' });
    }

    const handleClick = (path) => {
        if (isLoggedIn)
            navigate(path);
        else
            navigate("/login");
    }

    const CourseCard = ({ course }) => {

        return (
            <div className='flex flex-col min-w-[250px] md:min-w-[350px] max-w-[28%] rounded-xl shadow-2xl shadow-gray-400 cursor-pointer' onClick={() => { handleClick(`/courses/course-details/${course._id}`) }} >

                <img src={course.courseThumbnail} className='object-cover md:h-48 h-36 w-full border-b-2 border-black' />

                <div className='p-6'>
                    <h1 className='font-bold mb-2'>{course.courseTitle}</h1>
                    <div className='mb-6 hidden md:block' dangerouslySetInnerHTML={{ __html: truncateText(course?.description, 20) }} />
                    <p> <strong>Level :  </strong> {course.courseLevel || 'Beginner'} ⭐</p>

                </div>


            </div>
        );
    };

    const ExploreAllCard = () => {
        return (
            <div
                onClick={() => handleClick('/courses')}
                className="min-w-[300px] max-w-sm h-auto rounded-lg shadow-lg bg-white p-5 flex flex-col justify-between items-center cursor-pointer hover:shadow-xl transition duration-300 mx-2 flex-shrink-0"
            >
                <div className="text-center">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Explore All Courses</h3>
                    <p className="text-gray-700 text-sm">Discover more amazing courses tailored just for you.</p>
                    <button className="mt-12 bg-[#192A88] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#15206f] transition duration-200">
                        Browse All
                    </button>
                </div>
            </div>
        );
    };


    return (
        <section className="relative w-full lg:h-full py-16 bg-gray-50 my-[5%]">
            <div className='text-center'>
                <h2 className="text-xl md:text-4xl font-extrabold bg-gradient-to-r from-black to-gray-600 text-transparent bg-clip-text animate-pulse py-2 border-b-2 border-blue-800 inline-block " style={{ animationDuration: '4s' }}>
                    🎓 Curated Courses Just for You
                </h2>
            </div>


            <div ref={card} className=' lg:h-full overflow-x-auto scroll-smooth scrollbar-hide px-10 md:px-20 py-10 my-[5%] bg-white flex gap-[3%]  rounded-2xl'>
                <button className='absolute top-1/2 md:top-2/3 left-5 scale-150 cursor-pointer p-2' onClick={() => scroll('left')}> <FaArrowAltCircleLeft /> </button>

                <button className='absolute top-1/2 md:top-2/3 right-10 scale-150 cursor-pointer p-2' onClick={() => scroll('right')}> <FaArrowAltCircleRight /> </button>

                {
                    featured?.map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))
                }
                < ExploreAllCard />
            </div>


        </section>
    );
};


export default FeaturedCourses;


