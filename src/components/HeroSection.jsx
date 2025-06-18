import Navbar from './Navbar.jsx';
import heroImage from '../assets/hero.avif';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import studentImage from '../assets/student.jpg'
import { useSelector } from "react-redux";



function HeroSection({ onBookCallClick }) {

    const navigate = useNavigate();
    const userDetails = useSelector((state) => state.auth);
    const isLoggedIn = userDetails.isAuthenticated;

    const handleClick = (path) => {
        if (isLoggedIn)
            navigate(path);
        else
            navigate("/login");
    }

    return (
        <>
            <div className='lg:h-screen w-screen'>
                <Navbar handleScrollToContact={onBookCallClick} />
                <div className='flex flex-col md:flex-row w-[90%] mx-auto'>

                    <div className='bg-[#FFF1E0] flex flex-col items-center md:items-start text-center md:text-left w-full md:w-[45%] text-black px-4 py-8 md:p-10 lg:py-32 lg:px-20 lg:leading-20'>

                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
                                Not Just Learning. <br className='hidden lg:block' /> Becoming.
                            </h1>
                            <h3 className='text-base md:text-lg mt-2'>
                                Don't Miss out While You Are Away From School
                            </h3>
                        </motion.div>

                        <div className='flex mt-5 justify-around md:justify-start md:gap-5 lg:gap-10 md:font-bold lg:text-lg'>
                                 <button className='bg-[#192A88] text-white px-2 py-2 lg:px-6 lg:py-4 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95' onClick={onBookCallClick}>Book a Call</button>
                                 <button className='border-2 border-[#192A88] text-[#192A88] px-2 py-2 lg:px-6 lg:py-4 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95' onClickCapture={()=>handleClick(`/courses/search?query`)} >Pick a Course</button>
                             </div>

                        <div className='md:hidden mt-6 w-full flex justify-center'>
                            <img src={studentImage} alt="Student" className='w-full object-contain' />
                        </div>
                    </div>

                    <div className='w-[55%] hidden md:block'>
                        <img src={heroImage} alt="Hero" className='w-full h-auto object-cover' />
                    </div>

                </div>
            </div>
        </>

        // <>
        //     <div className=' lg:h-screen w-screen'>
        //         <Navbar handleScrollToContact={onBookCallClick} />
        //         <div className='flex w-[90%] mx-auto '>

        //             <div className='bg-[#FFF1E0] flex md:block w-full md:w-[45%] text-black p-10 lg:py-32 lg:px-20 lg:leading-20'>
        //                 <div>
        //                     <motion.div
        //                         initial={{ y: -100, opacity: 0 }}
        //                         whileInView={{ y: 0, opacity: 1 }}
        //                         transition={{ duration: 0.8 }}
        //                         viewport={{ once: true }}
        //                     >
        //                         <h1 className='font-bold lg:text-5xl'>Not Just Learning. <br className='hidden lg:block' /> Becoming.</h1>
        //                         <h3>Don't Miss out While You Are Away From School</h3>
        //                     </motion.div>
        //                     <div className='flex mt-5 justify-around md:justify-start md:gap-5 lg:gap-10 md:font-bold lg:text-lg'>
        //                         <button className='bg-[#192A88] text-white px-2 py-2 lg:px-6 lg:py-4 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95' onClick={onBookCallClick}>Book a Call</button>
        //                         <button className='border-2 border-[#192A88] text-[#192A88] px-2 py-2 lg:px-6 lg:py-4 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95' onClick={() => navigate(`/courses/search?query`)}>Pick a Course</button>
        //                     </div>
        //                 </div>

        //                 <div className=' md:hidden '> <img src={studentImage} /> </div>
        //             </div>

        //             <div className='w-[55%] hidden md:block '> <img src={heroImage} /> </div>


        //         </div>
        //     </div>
        // </>
    )
};

export default HeroSection;