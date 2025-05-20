import Navbar from './Navbar.jsx';
import heroImage from '../assets/hero.avif';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';



function HeroSection({onBookCallClick}){

    const navigate = useNavigate();
    
    return(
        <>
            <div className='h-screen w-screen'>
                <Navbar handleScrollToContact={onBookCallClick}/>
                <div className='flex w-[90%] mx-auto '>

                    <div className='bg-[#FFF1E0] w-[45%] text-black py-32 px-20 leading-20'>
                        <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
    >
                        <h1 className='font-bold text-5xl'>Not Just Learning. <br/> Becoming.</h1>
                        <h3>Don't Miss out While You Are Away From School</h3>
                        </motion.div>
                        <div className='flex gap-10 font-bold text-lg'>
                            <button className='bg-[#192A88] text-white px-6 py-4 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95' onClick={onBookCallClick}>Book a Call</button>
                            <button className='border-2 border-[#192A88] text-[#192A88] px-6 py-4 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95' onClick={() => navigate(`/courses/search?query`)}>Pick a Course</button>
                        </div>
                    </div>

                    <div className='w-[55%] '> <img src={heroImage} /> </div>
                </div>
            </div>
        </>
    )
};

export default HeroSection;