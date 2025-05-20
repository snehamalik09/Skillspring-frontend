import React from 'react'
import { motion } from 'framer-motion';

const Contact = ({refProp}) => {

    return (
        <div ref={refProp} className='w-screen min-h-full bg-[#DCDEF7] border-2 border-black'>
            <div className=' w-[90%] h-full flex text-lg font-semibold p-20  mx-auto'>
                <div className='w-[45%] flex flex-col justify-center'>
                    <motion.h1
                        initial={{ y: -150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: false, amount:0.8 }}
                        className='font-bold text-3xl'
                    >
                        CONTACT US & <br /> LETS'S GET STARTED
                    </motion.h1>
                </div>
                <div className='w-[45%] '>
                    <form className='flex flex-col justify-center gap-12'>
                        <div className='flex gap-10'>
                            <motion.div 
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false, amount:0.8 }}
                            className='flex flex-col gap-5'>
                                <label htmlFor="firstName" >First Name*</label>
                                <input type="text" required name="firstName" className='outline-none border-2 border-[#DCDEF7] border-b-black' />
                            </motion.div>

                            <motion.div 
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false, amount:0.8 }}
                            className='flex flex-col gap-5'>
                                <label htmlFor="lasttName" >Last Name*</label>
                                <input type="text" required name="lastName" className='outline-none border-2 border-[#DCDEF7] border-b-black' />
                            </motion.div>
                        </div>

                        <motion.div 
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: false, amount:0.8 }}
                        className='flex flex-col gap-5'>
                            <label htmlFor="email" >Email*</label>
                            <input type="text" required name="email" className='outline-none border-2 border-[#DCDEF7] border-b-black' />
                        </motion.div>

                        <motion.div 
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: false, amount:0.8 }}
                        className='flex flex-col gap-5'>
                            <label htmlFor="message" >Message*</label>
                            <textarea name="message" id="message" required className='outline-none border-2 border-[#DCDEF7] border-b-black'></textarea>
                        </motion.div>

                        <motion.div 
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: false, amount:0.8 }}
                        className='flex justify-end '>
                            <button type="submit" className='mt-4 border-4 border-black p-4 w-[30%] cursor-pointer  transition-transform duration-200 hover:scale-[1.02] active:scale-95'> Submit </button>
                        </motion.div>



                    </form>
                </div>
            </div>

        </div>
    )
}

export default Contact
