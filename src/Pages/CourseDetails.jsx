import React from 'react'
import { useGetCourseByIdQuery } from '../features/api/courseApi'
import { useGetLectureQuery } from '../features/api/courseApi'
import { useParams } from 'react-router-dom'
import { CgPlayButtonO } from "react-icons/cg";
import { useEffect } from 'react'
import PaymentButton from '../components/PaymentButton'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useProfileQuery } from '../features/api/authApi.js';
import ReactPlayer from 'react-player/lazy';
import { Blocks } from 'react-loader-spinner';
import Footer from '../components/Footer.jsx'




const CourseDetails = () => {
    const { courseId } = useParams();
    const { data: course, isLoading, error } = useGetCourseByIdQuery(courseId);
    const { data: userDetails, refetch } = useProfileQuery();
    const { data: lectures } = useGetLectureQuery(courseId);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("lecture details : ", lectures);
    }, [lectures]);

    // const purchased=true;

    const purchased = userDetails?.user?.enrolledCourses?.includes(courseId);



    return (
        <div className='w-full'>
            {isLoading ?
                <div className='flex h-screen w-full justify-center items-center'>
                    <Blocks
                        height="80"
                        width="80"
                        color="#192A88"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        visible={true}
                    />  </div>
                : <>


                    <div className='flex justify-between gap-2 items-center bg-gray-800 px-8 py-10 md:px-[10%] md:py-[3%]  w-[100%] cursor-pointer'>
                        <FaArrowLeft className='absolute top-5 left-5 text-white cursor-pointer' onClick={() => { navigate(-1) }} />
                        <div className=' text-white flex flex-col'>
                            <h1 className='font-bold text-md lg:text-3xl'>{course?.course?.courseTitle}</h1>
                            <p className='text-sm'>{course?.course?.category.toUpperCase()}</p>
                            {course?.course?.courseLevel ? (
                                <p className='text-sm'>{course.course.courseLevel.toUpperCase()}</p>
                            ) : null}
                            <p>Total lectures - <span className='italic text-sm'>{course?.course?.lectures?.length}</span> </p>
                        </div>

                        <div className='w-[40%] h-[40%] md:w-70 md:h-50'>
                            <img src={course?.course.courseThumbnail} className='object-cover w-full h-full ' />
                        </div>

                    </div>

                    <div className='w-[85%] lg:w-[80%] my-[5%] mx-auto flex flex-col md:flex-row gap-10 md:gap-0 justify-between text-black mb-[7%]'>

                        {/* same react player for mobile view */}
                        <div className="w-full md:hidden flex flex-col shadow-lg rounded-xl gap-3 p-4 bg-white max-h-fit">
                            <div className="w-full aspect-video overflow-hidden rounded-md">
                                <ReactPlayer
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                    playing={true}
                                    url={lectures?.lectures[0]?.videoUrl}
                                />
                            </div>

                            <h2 className="font-semibold text-lg text-gray-800 line-clamp-2">
                                {course?.course?.courseTitle}
                            </h2>

                            <hr className="border-gray-300" />

                            {!purchased && (
                                <p className="font-bold text-gray-700 text-sm">
                                    ₹ <span className="italic font-normal">{course?.course?.coursePrice}/-</span>
                                </p>
                            )}

                            {purchased ? (
                                <button
                                    className="bg-[#192A88] text-white py-2 rounded-lg hover:scale-[1.02] active:scale-95 transition-transform"
                                    onClick={() => navigate(`/course-progress/${courseId}`)}
                                >
                                    Continue
                                </button>
                            ) : (
                                <PaymentButton courseId={courseId} course={course?.course} />
                            )}
                        </div>

                        <div className=' w-full md:w-[50%] lg:w-[60%] flex flex-col gap-6'>
                            <h1 className='font-bold text-lg md:text-2xl'>DESCRIPTION</h1>
                            <div className='text-sm md:text-lg' dangerouslySetInnerHTML={{ __html: course?.course?.description }} />



                            <div className='flex flex-col shadow-2xl shadow-gray-700 rounded-2xl p-5 lg:p-10 text-lg'>
                                <h1 className='font-bold text-lg md:text-xl'>Course Content</h1>
                                <p className='text-gray-500 text-sm italic'> {lectures?.lectures?.length} lectures </p>
                                <ul className='space-y-1.5 my-[4%]'>
                                    {lectures?.lectures.map((lecture) => (
                                        <div className='flex items-center text-sm md:text-lg gap-4 cursor-pointer' key={lecture._id} >
                                            <CgPlayButtonO />
                                            <li>{lecture.lectureTitle}</li>
                                        </div>

                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* <div className='w-[30%] flex flex-col shadow-lg shadow-gray-400 rounded-xl gap-6 p-3'>
                            <div className=' w-[100%] h-[30%]'>
                                <ReactPlayer width="100%" height="100%" controls={true} playing={true} url={lectures?.lectures[0].videoUrl}></ReactPlayer>
                            </div>

                            <h2 className='font-semibold'>{course?.course?.courseTitle}</h2>
                            <hr />

                            {!purchased ? (
                                <p className='font-bold'> ₹ <span className='italic font-normal'> {course?.course?.coursePrice}/-  </span></p>
                            ) : ""}

                            {purchased ? (
                                <button className='bg-[#192A88] text-white px-4 py-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95' onClick={() => { navigate(`/course-progress/${courseId}`) }} >Continue</button>

                            ) :
                                (
                                    <PaymentButton courseId={courseId} course={course?.course} />
                                )
                            }


                        </div> */}

                        <div className="w-full hidden md:flex md:w-[45%] lg:w-[30%] flex flex-col shadow-lg rounded-xl gap-5 p-4 bg-white max-h-fit">
                            <div className="w-full aspect-video overflow-hidden rounded-md">
                                <ReactPlayer
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                    playing={true}
                                    url={lectures?.lectures[0]?.videoUrl}
                                />
                            </div>

                            <h2 className="font-semibold text-lg text-gray-800 line-clamp-2">
                                {course?.course?.courseTitle}
                            </h2>

                            <hr className="border-gray-300" />

                            {!purchased && (
                                <p className="font-bold text-gray-700 text-lg">
                                    ₹ <span className="italic font-normal">{course?.course?.coursePrice}/-</span>
                                </p>
                            )}

                            {purchased ? (
                                <button
                                    className="bg-[#192A88] text-white py-2 rounded-lg hover:scale-[1.02] active:scale-95 transition-transform"
                                    onClick={() => navigate(`/course-progress/${courseId}`)}
                                >
                                    Continue
                                </button>
                            ) : (
                                <PaymentButton courseId={courseId} course={course?.course} />
                            )}
                        </div>

                        

                    </div>

                    <Footer/>
                </>
            }
        </div>
    )
}

export default CourseDetails
