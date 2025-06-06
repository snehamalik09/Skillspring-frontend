

import React from 'react'
import { useLocation } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const referenceID = query.get("reference");
  const navigate = useNavigate();

  return (
    <div className='w-screen h-screen bg-[#192A88]'>

      <div className="flex gap-3 items-center absolute top-10 left-10 ">
        <FaArrowLeft
          className="text-white text-xl cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        <button className="text-white font-bold text-lg underline cursor-pointer" onClick={() => navigate("/dashboard")} >
          Go Back
        </button>
      </div>

      
        

      <div
        className='w-screen h-screen flex justify-center items-center'>

        <div className='bg-white shadow-2xl shadow-gray-500 flex flex-col p-10 text-center rounded-xl space-y-4'>
          <img width="120" height="120" src="https://img.icons8.com/fluency/48/cheap-2--v1.png" alt="cheap-2--v1" className='spin-infinite mx-auto'/>
          <h1 className='text-green-500 font-semibold text-2xl'>Payment Successfull</h1>
          <p>You're now enrolled! Thank you for choosing us!</p>
          {referenceID && (
            <p className='font-bold text-sm  rounded-lg '>Reference Id : {referenceID} </p>
          )}

        </div>
      </div>

      <style>
        {`
          @keyframes spinInfinite {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spin-infinite {
            animation: spinInfinite 3s linear infinite;
          }
        `}
      </style>
    </div>
  )
}

export default PaymentSuccess



