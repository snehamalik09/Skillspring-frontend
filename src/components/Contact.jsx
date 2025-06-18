import React from 'react'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSendEmailMutation } from '../features/api/authApi';

const Contact = ({ refProp }) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    })
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [tooManyRequests, setTooManyRequests] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 4000)
            return () => clearTimeout(timer);
        }


    }, [showSuccess])

    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => {
                setShowError(false);
            }, 4000)
            return () => clearTimeout(timer);
        }

    }, [showError])

    useEffect(() => {
        if (tooManyRequests) {
            const timer = setTimeout(() => {
                setTooManyRequests(false);
            }, 4000)
            return () => clearTimeout(timer);
        }

    }, [tooManyRequests])

    const [sendEmail, { isLoading, isSuccess, isError, data, error }] = useSendEmailMutation();

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("email : ", formData);
            const res = await sendEmail(formData).unwrap();
            console.log("email response : ", res);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                message: ""
            })
            setShowSuccess(true);
        }
        catch (err) {
            if(err.originalStatus==429)
                setTooManyRequests(true);
            else
                setShowError(true);
            console.log("error is : ", err);
        }

    }

    return (
        <div ref={refProp} className='w-screen lg:min-h-full bg-[#DCDEF7] border-2 border-black'>
            <div className=' w-[90%] gap-28 h-full  md:flex text-lg font-semibold p-10 md:p-20  md:mx-auto'>

                <div className='w-[45%] md:flex md:flex-col justify-center hidden'>
                    <motion.h1
                        initial={{ y: -150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: false, amount: 0.5 }}
                        className='font-bold text-2xl lg:text-3xl'
                    >
                        CONTACT US & <br /> LETS'S GET STARTED
                    </motion.h1>
                </div>

                <div className='w-full md:w-[45%] '>
                    {/* <form onSubmit={handleSubmit} className='md:flex md:flex-col lg:justify-center lg:gap-12'>
                        <div className='flex flex-col md:flex-row md:gap-10'>
                            <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: false, amount: 0.8 }}
                                className='flex flex-col md:gap-5'>
                                <label htmlFor="firstName" >First Name*</label>
                                <input value={formData.firstName} onChange={handleChange} type="text" required name="firstName" className='outline-none border-2 border-[#DCDEF7] border-b-black' />
                            </motion.div>

                            <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: false, amount: 0.8 }}
                                className='flex flex-col md:gap-5'>
                                <label htmlFor="lasttName" >Last Name*</label>
                                <input value={formData.lastName} onChange={handleChange} type="text" required name="lastName" className='outline-none border-2 border-[#DCDEF7] border-b-black' />
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false, amount: 0.8 }}
                            className='flex flex-col md:gap-5 pt-6'>
                            <label htmlFor="email" >Email*</label>
                            <input value={formData.email} onChange={handleChange} type="email" required name="email" className='outline-none border-2 border-[#DCDEF7] border-b-black' />
                        </motion.div>

                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false, amount: 0.8 }}
                            className='flex flex-col md:gap-5 pt-6'>
                            <label htmlFor="message" >Message*</label>
                            <textarea value={formData.message} onChange={handleChange} name="message" id="message" required className='outline-none border-2 border-[#DCDEF7] border-b-black'></textarea>
                        </motion.div>

                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false, amount: 0.8 }}
                            className='flex flex-col justify-end items-end '>
                            <button type="submit" className=' my-8 md:my-4 border-3 md:border-4 border-black p-4 md:w-[30%] cursor-pointer  transition-transform duration-200 hover:scale-[1.02] active:scale-95'> Send Message </button>
                            {isLoading ? (
                                <p>Sending your message...</p>
                            ) : showSuccess ? (
                                <motion.p
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    whileInView={{ scaleX: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    ✅ Message delivered successfully! </motion.p>
                            ) : showError ? (
                                <motion.p
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    whileInView={{ scaleX: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    ❌ Error occured. Try again! </motion.p>) : <p></p>
                            }


                        </motion.div>
                    </form> */}
                    <form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
                        <div className='flex flex-row gap-2 md:gap-10'>
                            <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: false, amount: 0.8 }}
                                className='flex flex-col gap-2 w-1/2 '>
                                <label htmlFor="firstName">First Name*</label>
                                <input value={formData.firstName} onChange={handleChange} type="text" required name="firstName" className='outline-none border-2 border-[#DCDEF7] border-b-black' />
                            </motion.div>

                            <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: false, amount: 0.8 }}
                                className='flex flex-col gap-2 w-1/2'>
                                <label htmlFor="lastName">Last Name*</label>
                                <input value={formData.lastName} onChange={handleChange} type="text" required name="lastName" className='outline-none border-2 border-[#DCDEF7] border-b-black' />
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false, amount: 0.8 }}
                            className='flex flex-col gap-2'>
                            <label htmlFor="email">Email*</label>
                            <input value={formData.email} onChange={handleChange} type="email" required name="email" className='outline-none border-2 border-[#DCDEF7] border-b-black' />
                        </motion.div>

                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false, amount: 0.8 }}
                            className='flex flex-col gap-2'>
                            <label htmlFor="message">Message*</label>
                            <textarea value={formData.message} onChange={handleChange} name="message" id="message" required className='outline-none border-2 border-[#DCDEF7] border-b-black'></textarea>
                        </motion.div>

                        {/* Submit Button + Feedback */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false, amount: 0.8 }}
                            className='flex flex-col items-end'>
                            <button type="submit" className='my-8 md:my-4 border-2 md:border-4 border-black p-2 md:p-4 lg:w-[30%] cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95'>
                                Send Message
                            </button>
                            {isLoading ? (
                                <p>Sending your message...</p>
                            ) : showSuccess ? (
                                <motion.p
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    whileInView={{ scaleX: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    ✅ Message delivered successfully!
                                </motion.p>
                            ) : showError ? (
                                <motion.p
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    whileInView={{ scaleX: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    ❌ Error occurred. Try again!
                                </motion.p>
                            ) : tooManyRequests ? (
                                <motion.p
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    whileInView={{ scaleX: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    ❌ Slow down! You can message us again in an hour.
                                </motion.p>
                            ) : null}
                        </motion.div>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default Contact
