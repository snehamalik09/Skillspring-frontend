import CourseCard from '../components/courseCard.jsx';
import CourseSkeleton from '../components/CourseSkeleton.jsx';
import Navbar from '../components/Navbar.jsx';
import { useSelector } from "react-redux";

function MyCourses(){
    const isLoading=true;
    const isOpen = useSelector((state) => state.navbarToggle.isNavbarOpen);
    const skeletons = Array(3).fill(null);
    const Courses = [1,2];

    return(
        <>

            <div className='w-screen min-h-screen bg-[#E6D5B8] text-[#005F73] overflow-x-hidden flex gap-10'>

            <Navbar/>
                <div className={` ${isOpen? 'ml-[25%]' : 'ml-[15%]'} mr-[5%] mt-[5%] duration-500 transition-all`}>

                { !isLoading ? 
                <div className='grid grid-cols-4 gap-10 p-5'>
                {Courses.length>0 ? <CourseCard/> : <p className=' font-bold text-center text-xl col-start-2 col-end-4'> You are not enrolled in any course!</p>}
                </div> :
                 (
                    <div className='grid grid-cols-3 gap-10 p-5 text-center mx-auto'>
                        {skeletons.map((_, index) => (
                            <CourseSkeleton key={index} />
                        ))}
                    </div>
                )}
                </div>

            </div>
        </>
    )
}

export default MyCourses;