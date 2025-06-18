import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCourseMutation } from '../../../features/api/courseApi';
import { toast } from 'react-toastify';

const AddCourse = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [isError, setIsError] = useState("");
    const [createCourse, {data, isLoading, error, isSuccess}] = useCreateCourseMutation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Course created successfully");
            navigate("/admin/courses"); 
        }
        if (error) {
            toast.error(error?.data?.message || "Something went wrong!");
        }
    },[isSuccess, error])

    function handleChange(e){
        const {name, value} = e.target;
        if(name==="title")
            setTitle(value);
        if(name==="category")
            setCategory(value);
        if(name==="price")
            setPrice(value);
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(!category || !title){
            setIsError(true);
            return;
        }

        setIsError(false);
        console.log("Category : ", category);
        console.log("title : ", title);

        await createCourse({title, category, price});
        setTitle("");
        setCategory("");
        setPrice(0);
    }

    function handleCancel(e){
        navigate("/admin/courses");
    }

    return(
        <div className='px-10 md:px-16 mt-10'>

            <h1 className='font-bold text-lg md:text-xl'>Let's add course, add some basic details for your new course</h1>

            <form className='flex flex-col mt-14 text-sm md:text-lg gap-3 md:gap-5 ' onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" onChange={handleChange} name="title" value={title}  placeholder='Enter course title' className='p-2 rounded-xl border-2 border-black outline-none' />

                <label htmlFor="price">Price</label>
                <input type="text" onChange={handleChange} name="price" value={price}  placeholder='Enter course price' className='p-2 rounded-xl border-2 border-black outline-none' />

                <label htmlFor="category">Category</label>

                <select value={category} name="category" className='p-2 rounded-xl border-2 border-black outline-none' onChange={handleChange} >
                    <option value="">Select a category</option>
                    <option value="datascience">Data Science</option>
                    <option value="react">React</option>
                    <option value="cloud">Cloud</option>
                    <option value="aiml">Artificial Intelligence</option>
                    <option value="fullstack">Fullstack development</option>
                    <option value="python">Python</option>
                </select>

                <div className='md:w-[30%] mt-5 text-md font-semibold'>
                    <button type="submit" className='px-4 py-1 mr-10 bg-black text-white rounded-xl cursor-pointer hover:bg-white hover:text-black'> Create </button> 
                    <button type="button" className='px-4 py-1 bg-black text-white rounded-xl cursor-pointer hover:bg-white hover:text-black' onClick={handleCancel}> Cancel </button> 
                </div>
            </form>

            {isError? <div className='font-bold text-red-500 mt-10'> Both fields are mandatory!!</div> : ""}
        </div>
    )
}

export default AddCourse;