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
            setShowError(true);
            console.error(err);
        }

    }

    return (
        <div ref={refProp} className='w-screen min-h-full bg-[#DCDEF7] border-2 border-black'>
            <div className=' w-[90%] h-full flex text-lg font-semibold p-20  mx-auto'>
                <div className='w-[45%] flex flex-col justify-center'>
                    <motion.h1
                        initial={{ y: -150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: false, amount: 0.5 }}
                        className='font-bold text-3xl'
                    >
                        CONTACT US & <br /> LETS'S GET STARTED
                    </motion.h1>
                </div>
                <div className='w-[45%] '>
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-12'>
                        <div className='flex gap-10'>
                            <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: false, amount: 0.8 }}
                                className='flex flex-col gap-5'>
                                <label htmlFor="firstName" >First Name*</label>
                                <input value={formData.firstName} onChange={handleChange} type="text" required name="firstName" className='outline-none border-2 border-[#DCDEF7] border-b-black' />
                            </motion.div>

                            <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: false, amount: 0.8 }}
                                className='flex flex-col gap-5'>
                                <label htmlFor="lasttName" >Last Name*</label>
                                <input value={formData.lastName} onChange={handleChange} type="text" required name="lastName" className='outline-none border-2 border-[#DCDEF7] border-b-black' />
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false, amount: 0.8 }}
                            className='flex flex-col gap-5'>
                            <label htmlFor="email" >Email*</label>
                            <input value={formData.email} onChange={handleChange} type="email" required name="email" className='outline-none border-2 border-[#DCDEF7] border-b-black' />
                        </motion.div>

                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false, amount: 0.8 }}
                            className='flex flex-col gap-5'>
                            <label htmlFor="message" >Message*</label>
                            <textarea value={formData.message} onChange={handleChange} name="message" id="message" required className='outline-none border-2 border-[#DCDEF7] border-b-black'></textarea>
                        </motion.div>

                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false, amount: 0.8 }}
                            className='flex flex-col justify-end items-end '>
                            <button type="submit" className='my-4 border-4 border-black p-4 w-[30%] cursor-pointer  transition-transform duration-200 hover:scale-[1.02] active:scale-95'> Send Message </button>
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
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Contact
