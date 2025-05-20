import CourseCard from '../components/courseCard.jsx';
import CourseSkeleton from '../components/CourseSkeleton.jsx';
import Navbar from '../components/Navbar.jsx';
import { useSelector, useDispatch } from "react-redux";
import { useGetPublishedCoursesQuery, useProfileQuery } from '../features/api/authApi.js';
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursesPageTopImage from '../assets/CoursesPageTopImage.avif'
import Footer from '../components/Footer.jsx'

function Courses() {
    const skeletons = Array(3).fill(null);
    const navigate = useNavigate();
    const { data: userDetails, refetch } = useProfileQuery();
    const { data: courses, error, isLoading } = useGetPublishedCoursesQuery();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        console.log("my coursesss : ", courses);
    }, [courses]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "")
            navigate(`/courses/search/?query=${searchQuery}`);
        setSearchQuery("");
    }


    return (
        <>
            <div className='w-full min-h-screen bg-gray-50 overflow-x-hidden '>

                <Navbar />
                {/* <div className='bg-[#f3f3f3] w-[100%] h-screen flex justify-center items-center '>
                    <div className='bg-[#FFF1E0] w-[80%] h-[80%] mx-auto rounded-2xl p-10 flex'>
                        <div className='w-[50%] text-black flex flex-col justify-center'>
                            <h1 className='text-4xl font-bold my-2'>Learn without limits</h1>
                            <p>This platform simplicity belies its powerful capabilities, offering a seamless and enjoyable learning experience.</p>
                            <form onSubmit={handleSearchSubmit} className='relative w-full my-2'>
                                <input
                                    type="text"
                                    name="searchbar"
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value) }}
                                    placeholder="Search Courses"
                                    className="bg-white outline-none rounded-lg px-10 py-4 w-full"
                                />
                                <button
                                    type="submit"
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                >
                                    <FaSearch />
                                </button>
                            </form>

                            <button
                                onClick={() => navigate(`/courses/search?query`)}
                                className="mx-auto mt-6 px-6 py-2 rounded-xl border-2 border-[#192A88] text-[#192A88] font-semibold bg-white hover:bg-[#192A88] hover:text-white transition duration-300 ease-in-out hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                                Explore Courses
                            </button>

                        </div>
                    </div>

                </div> */}

                <div className='bg-gradient-to-r from-[#FFF1E0] to-[#f3f3f3] w-[90%] h-[85%] mx-auto rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between shadow-md'>
                    <div className='w-full md:w-[50%] text-black flex flex-col justify-center'>
                        <h1 className='text-5xl font-bold leading-tight mb-4'>Learn Without Limits</h1>
                        <p className='text-lg text-gray-700 mb-6'>Explore a wide variety of professional and practical courses tailored just for you.</p>

                        <form onSubmit={handleSearchSubmit} className='relative w-full mb-4'>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search courses..."
                                className="bg-white shadow-sm border border-gray-300 outline-none rounded-lg px-12 py-4 w-full text-sm"
                            />
                            <button
                                type="submit"
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                            >
                                <FaSearch />
                            </button>
                        </form>

                        <button
                            onClick={() => navigate(`/courses/search?query`)}
                            className="w-fit px-6 py-3 text-sm rounded-lg font-medium bg-[#192A88] text-white hover:bg-black transition-all duration-300"
                        >
                            Explore Courses
                        </button>
                    </div>

                    <div className='hidden md:block w-[45%] h-full'>
                        <img
                            src={CoursesPageTopImage}
                            alt="Learning illustration"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>


                <div className='text-center my-20'>
                    <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900'>Explore Our Courses</h1>
                    <p className="mt-2 text-gray-600 text-lg">Upskill from curated courses designed by experts</p>
                    <div className="w-24 h-1 bg-[#192A88] mx-auto mt-4 rounded-full"></div>
                </div>

                <div className='w-[85%] mx-auto py-10 bg-white rounded-xl shadow-md mb-[10%]'>
                    {!isLoading ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-6'>
                            {courses?.data?.map((course) => (
                                <CourseCard key={course._id} course={course} user={userDetails?.user} />
                            ))}
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-6'>
                            {skeletons.map((_, index) => (
                                <CourseSkeleton key={index} />
                            ))}
                        </div>
                    )}
                </div>




            </div>

            <Footer/>
        </>
    )
}

export default Courses;

