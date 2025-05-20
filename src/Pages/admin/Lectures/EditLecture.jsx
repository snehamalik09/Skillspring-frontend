import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import LectureTab from './LectureTab.jsx';


const EditLecture = () => {

    const navigate = useNavigate();

    return( 
        <div className='overflow-x-hidden px-16 mt-10'>

            <div className='flex items-center gap-10'>
                <FaArrowLeft className='cursor-pointer' onClick={()=>{navigate(-1)}} />
                <h1 className='font-bold text-xl'>Update Lecture</h1>
            </div>

            <LectureTab/>
        </div>
    )
}

export default EditLecture;


