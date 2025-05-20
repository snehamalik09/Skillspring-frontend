import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPublishedCoursesQuery } from '../features/api/authApi.js';
import { useSelector } from "react-redux";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";



const CourseCard = ({ course }) => {
    const truncateText = (text, wordLimit) => {
        if (!text) return '';
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    };

    const userDetails = useSelector((state) => state.auth);
    const isLoggedIn = userDetails.isAuthenticated;

    const handleClick = (path) => {
        if (!isLoggedIn)
            navigate("/login");
        else
            navigate(path);
    }

    const navigate = useNavigate();

    return (
        <div className="min-w-[300px] max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-5 mx-2 flex-shrink-0 cursor-pointer" onClick={() => handleClick(`/courses/course-details/${course._id}`)}>
            <img className="w-full h-40 object-cover rounded" src={course.courseThumbnail} alt={course.courseTitle} />
            <div className="px-2 py-4">
                <div className="font-bold text-xl mb-2">{course.courseTitle}</div>
                <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: truncateText(course?.description, 15) }} />
            </div>
            <div className="px-2 pt-4 pb-2">
                <p className="text-sm text-gray-600">Level: {course.courseLevel || 'Beginner'} ⭐</p>
                <p className="font-semibold text-lg mt-2">₹ {course.coursePrice}/-</p>
            </div>
        </div>
    );
};

const ExploreAllCard = () => {
    const navigate = useNavigate();
    const userDetails = useSelector((state) => state.auth);
    const isLoggedIn = userDetails.isAuthenticated;

    const handleClick = (path) => {
        if (!isLoggedIn)
            navigate("/login");
        else
            navigate(path);
    }

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

const FeaturedCourses = () => {
    const { data: courses, isLoading } = useGetPublishedCoursesQuery();
    const scrollRef = useRef(null);
    const [scrollIndex, setScrollIndex] = useState(0);

    useEffect(() => {
        console.log('featured courses : ', courses);
    }, [courses]);

    const featured = courses?.data?.slice(0, 4) || [];

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = 320; // width of one card + margin

        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            setScrollIndex((prev) => Math.max(0, prev - 1));
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setScrollIndex((prev) => Math.min(featured.length, prev + 1));
        }
    };

    return (
        <section className="relative p-10 bg-gray-50 mt-[10%]">
            <h2 className="text-3xl font-bold mb-6 text-center my-4">Featured Courses</h2>

            <button
                onClick={() => scroll('left')}
                className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full hover:bg-gray-100"
            >
                <FaArrowAltCircleLeft size={36} />
            </button>
            <button
                onClick={() => scroll('right')}
                className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 z-10  rounded-full hover:bg-gray-100"
            >
                <FaArrowAltCircleRight size={36} />
            </button>

            <div ref={scrollRef} className="flex overflow-x-hidden scroll-smooth p-[5%]">
                {featured.map((course) => (
                    <CourseCard key={course._id} course={course} />
                ))}
                <ExploreAllCard />
            </div>
        </section>
    );
};

export default FeaturedCourses;

