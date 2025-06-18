import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateLectureMutation, useGetLectureQuery} from '../../../features/api/courseApi';
import { toast } from 'react-toastify';
import {FaEdit} from "react-icons/fa";

const CreateLecture = () => {
    const {courseId} = useParams();
    const [title, setTitle] = useState("");
    const [createLecture, {data, error, isSuccess}] = useCreateLectureMutation();
    const {data:lectures, isLoading, refetch} = useGetLectureQuery(courseId);
    const navigate = useNavigate();

    useEffect(()=>{
        if(lectures){
                refetch();
                console.log("lectures are : ", lectures);
        }
    }, [lectures])



    useEffect(()=>{
        if(isSuccess){
            refetch();
            toast.success(data?.message || "Lecture created successfully");
            navigate(`/admin/course/${courseId}/lecture`); 
        }
        if (error) {
            toast.error(error?.data?.message || "Something went wrong!");
        }
    },[isSuccess, error])

    function handleChange(e){
        const {name, value} = e.target;
        if(name==="title")
            setTitle(value);
    }

    async function handleSubmit(e) {
      e.preventDefault();
      try {
          const response = await createLecture({ title, courseId }).unwrap();
          console.log("Lecture creation response:", response);
          setTitle("");
      } catch (err) {
          console.error("Error creating lecture:", err);
      }
  }
  

    return(
        <div className='px-5 md:px-16 mt-10 overlfow-x-hidden '>

            <h1 className='font-bold text-lg md:text-xl'>Let's add lectures, add some basic details for your new lecture</h1>

            <form className='flex flex-col mt-14 text-lg gap-5 ' onSubmit={handleSubmit}>
                <label htmlFor="title" className='font-bold'>Title</label>
                <input type="text" onChange={handleChange} name="title" value={title}  placeholder='Enter lecture title' className='p-2 rounded-xl border-2 border-black outline-none' />

                <div className='mt-10 text-md font-semibold'>
                    <button type="button" className='px-4 py-1 mr-10 bg-black text-white rounded-xl cursor-pointer border-2 border-white hover:bg-white hover:text-black hover:border-black duration-500' onClick= {() => navigate(`/admin/course/${courseId}`)} > Back to Course </button> 
                    <button type="submit" className='px-4 py-1 bg-white text-black rounded-xl cursor-pointer border-2 border-black hover:bg-black hover:text-white hover:border-white duration-500'> Create Lecture </button> 
                </div>
            </form>

            <div className='my-10 w-[100%]'>
                <ul>
                    {lectures?.lectures?.map((lecture, index)=>(      
                    <div key={index} className='flex justify-between cursor-pointer bg-gray-200 p-3 md:p-5 my-5 text-xs md:text-sm'>
                        <li className= 'font-semibold'> <span className='font-bold'> Lecture {index} - </span> {lecture.lectureTitle} </li>
                        <FaEdit onClick={()=>{navigate(`/admin/course/${courseId}/lecture/${lecture._id}`)}}/>
                    </div>
                    ))}
                    
                </ul>
            </div> 

        </div>
    )
}

export default CreateLecture;