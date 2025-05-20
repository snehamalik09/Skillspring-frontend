import CourseCard from '../components/courseCard.jsx';
import CourseSkeleton from '../components/CourseSkeleton.jsx';
import Navbar from '../components/Navbar.jsx';
import { useState, useEffect, Profiler } from 'react';
import emptyProfilePicture from '../assets/emptyProfilePicture.webp';
import { useUpdateUserMutation, useProfileQuery, useGetEnrolledCoursesQuery } from '../features/api/authApi.js';
import { toast } from 'react-toastify';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';


function Dashboard() {
    const navigate = useNavigate();
    const { data, isLoading, refetch } = useProfileQuery();
    const {data:enrolledCourses, isLoading:courseLoading } = useGetEnrolledCoursesQuery();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [updateData, { data: updateUserData, isLoading: updateUserLoading, isError, error, isSuccess }] = useUpdateUserMutation();

    useEffect(() => {
        console.log("my enrolled courses : ", enrolledCourses?.data);
    }, [enrolledCourses]);

    useEffect(() => {
        if (data?.user) {
            setUser(data.user);
        }
    }, [data]);

    useEffect(() => {
        if (isSuccess)
            toast.success("User details updated successfully")
        if (isError)
            toast.error(error.message);
    }, [isError, error, isSuccess])

    const skeletons = Array(3).fill(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function onChangeHandler(e) {
        const photo = e.target.files?.[0];
        setProfilePhoto(photo);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("profilePhoto", profilePhoto);

        await updateData(formData);
        await refetch();

        setIsModalOpen(false);
        toast.success("User details updated successfully")
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen flex bg-gray-50">


                <aside className="w-full top-0 sticky h-screen md:w-1/3 lg:w-1/4 bg-white p-6 shadow-2xl">
                    <FaArrowLeft className='cursor-pointer' onClick={() => { navigate(-1) }} />
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={user?.profilePhoto || emptyProfilePicture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
                        />

                        <h2 className="text-xl font-bold text-gray-800 mt-4">{user?.name || 'loading..'}</h2>
                        <p className="text-sm text-gray-500">{user?.email || ''}</p>
                        <p className="text-sm text-gray-500">{user?.role.toUpperCase() || ''}</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700 transition-transform duration-200 hover:scale-[1.02] active:scale-95"
                        >
                            Edit Details
                        </button>
                    </div>
                </aside>

                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Your Enrolled Courses</h1>
                    <div className='w-[70%] my-[5%]'>
                    {
                        enrolledCourses?.data?.map((course) => (
                            <CourseCard key={course._id} course={course} user={data.user} />
                        ))
                    }
                    </div>

                    {/* {enrolledCourses?.data?.length === 0 ? (
                        <p className="text-gray-600">You are not enrolled in any courses yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrolledCourses?.data?.map((course, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                                >
                                    <h3 className="text-lg font-semibold text-gray-700">
                                        {course.title || "Untitled Course"}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {course.description || "No description available."}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )} */}
                </main>

                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-white flex items-center justify-center z-50 " style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} >

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 60, scale: 0.5
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100
                                    }
                                }}
                                exit={{
                                    y: 500,
                                    scale: 0.5,
                                    transition: {
                                        duration: 0.3
                                    }
                                }}
                                className="bg-white p-16 rounded-xl w-full max-w-md shadow-xl ">
                                <h2 className="text-xl font-bold text-gray-700 mb-4">Edit Profile</h2>
                                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                                    <div className='flex flex-col gap-2' >
                                        <label htmlFor='name' className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            id="name"
                                            name="name"
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor='photo' className="block text-sm font-medium text-gray-700">
                                            Profile Photo
                                        </label>
                                        <input
                                            type="file"
                                            name='profilePhoto'
                                            onChange={onChangeHandler}
                                            className="w-full"
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-transform duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={updateUserLoading}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-transform duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
                                        >
                                            {/* {updateUserLoading ? "Saving..." : "Save Changes"} */} Save Changes
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};



//     return (
//         <>
//             <Navbar />
//             <div className='w-screen min-h-screen bg-[#FFF1E0] flex gap-10 overflow-x-hidden'>

//                 {isModalOpen ?

//                     <div className=' absolute top-1/4 left-1/3 bg-white w-[35%] h-[60%] p-4 rounded-2xl shadow-md transition-all duration-500'>
//                         <RxCross1 className='text-black absolute right-10 cursor-pointer' onClick={() => setIsModalOpen(!isModalOpen)} />
//                         <h1 className='font-bold text-xl text-black'>Edit Profile</h1>
//                         <p className='text-md text-gray-500'>Make changes to your profile here. Click save when you are done.</p>

//                         <form onSubmit={handleSubmit} encType="multipart/form-data" className="text-black m-5 p-6 ">
//                             <div className="flex flex-col gap-4">
//                                 <div>
//                                     <label htmlFor="name" className="font-bold block mb-2 text-md">Name </label>
//                                     <input
//                                         type="text"
//                                         id="name"
//                                         name="name"
//                                         value={name}
//                                         onChange={(e) => setName(e.target.value)}
//                                         className="w-full p-2 border-2 border-black rounded-xl text-gray-700 focus:outline-none focus:ring-1"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label htmlFor="photo" className="font-bold block mb-2">Profile Photo</label>
//                                     <input
//                                         type="file"
//                                         id="photo"
//                                         name="profilePhoto"
//                                         accept="image/*"
//                                         onChange={onChangeHandler}
//                                         className="w-full p-2 cursor-pointer border-2 border-black rounded-xl text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#94B49F] file:text-white transition-all duration-500 hover:file:bg-[#005F73] "
//                                     />
//                                 </div>
//                             </div>

//                             <div className='flex justify-center'>
//                                 <button type="submit" className="py-1 px-8 my-4 rounded-md bg-[#005F73] hover:bg-[#94B49F] transition-all duration-500 text-white text-bold cursor-pointer" > Save Changes</button>
//                             </div>
//                         </form>


//                     </div> :


//                     <div className={` ${isOpen ? 'ml-[30%]' : 'ml-[20%]'} h-[20%] mr-[5%] mt-[5%] overflow-x-hidden rounded-xl bg-white w-[65%] p-10 duration-500 transition-all `}>

//                         {/* profile details */}

//                         <div className='p-5 flex justify-start gap-10'>
//                             <div className=''>
//                                 <img src={user?.profilePhoto || emptyProfilePicture} alt=" Profile picture" className='rounded-full w-30 h-30' />
//                             </div>

//                             <div>
//                                 <div className='flex  gap-5 text-lg'> <h1 className='font-bold'>Name : </h1> <span>{user?.name || '...Loading'}</span> </div>
//                                 <div className='flex  gap-5 text-lg'> <h1 className='font-bold'>Email : </h1> <span>{user?.email || '...Loading'}</span> </div>
//                                 <div className='flex  gap-5 text-lg'> <h1 className='font-bold'>Role : </h1> <span>{user?.role.toUpperCase() || '...Loading'}</span> </div>
//                                 <button type="submit" className="py-1 px-8 my-4 rounded-md bg-[#FF6B35] text-white cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)} >Edit profile</button>
//                             </div>

//                         </div>


//                         <div className='w-screen my-20 mx-8 overflow-x-hidden'>

//                             {enrolledCourses.length > 0 ? (
//                                 <>
//                                     <h1 className='font-bold text-xl'>Courses you are enrolled in</h1>
//                                     {!isLoading ? (
//                                         <div className='grid grid-cols-4 p-5 w-[60%]'>
//                                             {enrolledCourses.map((course) => <CourseCard key={course._id} />)}
//                                         </div>
//                                     ) : (
//                                         <div className='grid grid-cols-3 gap-10 p-5 text-center mx-auto'>
//                                             {skeletons.map((_, index) => (
//                                                 <CourseSkeleton key={index} />
//                                             ))}
//                                         </div>
//                                     )}
//                                 </>
//                             ) : (
//                                 <h1 className='font-bold text-xl'>You are not enrolled in any course!</h1>
//                             )}

//                         </div>

//                     </div>

//                 }

//             </div >
//         </>
// )
// }

export default Dashboard;

