import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCourseByIdQuery, useUpdateCourseByIdMutation, useDeleteCourseByIdMutation, useTogglePublishCourseMutation } from '../../../features/api/courseApi';
import RichTextEditor from '../../../components/RichTextEditor.jsx'
import { toast } from 'react-toastify';


const EditCourse = () => {

    const [input, setInput] = useState({
        coursePrice : "",
        category : "",
        courseTitle : "",
        isPublished: false,
        courseLevel : "",
        courseThumbnail : "",
        description:""
    })
    const[isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const {courseId} = useParams();
    const [thumbnail, setThumbnail] = useState("");
    const {data, error, isLoading, refetch} = useGetCourseByIdQuery(courseId);
    const [updateCourseById, {isLoading:updateLoading, isError:updateError, isSuccess}] = useUpdateCourseByIdMutation();
    const[deleteCourseById] = useDeleteCourseByIdMutation();
    const [togglePublishCourse] = useTogglePublishCourseMutation();
    

    useEffect(() => {
        if (data) {
            setInput({
                courseTitle: data.course.courseTitle || "",
                coursePrice: data.course.coursePrice?.toString() || "",
                category: data.course.category || "",
                isPublished: data.course.isPublished ?? false,
                courseThumbnail : data.course.courseThumbnail || "",
                description : data.course.description || "",
                courseLevel : data.course.courseLevel || "",
            });
            if(data.course.courseThumbnail)
                    setThumbnail(data.course.courseThumbnail);

        }
    }, [data]);  
    
    useEffect(()=>{
        if(isError){
            alert("Title and price are mandatory fields!");
        }
    }, [isError])


    if(error){
        return <div>Error occured while loading the data !</div>
    }

    if (isLoading) return <div className="text-gray-700 font-semibold">Loading course data...</div>;


    function handleChange(e){
        const {name, value} = e.target;
        setInput(prev => ({
            ...prev,
            [name] : value
        }));
    }

    function handleCancel(e){
        navigate("/admin/courses");
    }


    async function handleSubmit(e){
        e.preventDefault();
        if(!input.category || !input.courseTitle){
            setIsError(true);
            return;
        }
    
        setIsError(false);

        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("coursePrice", input.coursePrice.toString());
        formData.append("category", input.category);
        formData.append("isPublished", input.isPublished.toString());
        formData.append("description", input.description);
        formData.append("courseLevel", input.courseLevel);

        if(input.courseThumbnail)
            formData.append("courseThumbnail", input.courseThumbnail);

        console.log("input course data from frontend : ");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ':', pair[1]);
          }          

        try{
           const response = await  updateCourseById({
            courseId,
            body:formData
           }).unwrap();

           console.log("course updated successfully response is : ", response);
           alert("Course Updated successfully!");
           navigate("/admin/courses");
        }

        catch(err){
            console.error("Update failed:", err);
            alert("Something went wrong while updating the course",);
        }
    }

    async function handlePublish(){
        try{
            const publish = !(input?.isPublished);
            const res = await togglePublishCourse({courseId, query:publish}).unwrap();
            toast.success(res.message);
            refetch();
            navigate(-1);
        }
        catch(err){
            console.error(err);
            toast.error("Failed to toggle publish status");
        }
    }

    //lectures should also be deleted

    async function deleteCourse(){
        const confirmDelete = window.confirm("Do you want to remove the course permanently?");
            if(confirmDelete){
                try{
                    const response = await  deleteCourseById(courseId).unwrap();
         
                    console.log("course deleted successfully response is : ", response);
                    alert("Course removed successfully!");
                    navigate("/admin/courses");
                 }
         
                 catch(err){
                     console.error("Deletion failed:", err);
                     alert("Something went wrong while deleting the course",);
                 }
            }                
    }

    function handleThumbnail(e){
        const thumbnail = e.target.files?.[0];
        console.log("thumbnail files : ", e.target.files);
        console.log("my thumbnail file : ", thumbnail);
        setInput(prev => ({
            ...prev,
            courseThumbnail:thumbnail
        }))
    }

    return( 
        <div className='px-16 mt-10'>

            <div className=' flex justify-between'> 
                <h1 className='font-bold text-xl'>Add details about the course</h1>
                <button className='px-4 py-1 mr-10 bg-black text-white rounded-xl cursor-pointer border-2 border-white hover:bg-white hover:text-black hover:border-black duration-500' onClick={ () => navigate(`/admin/course/${courseId}/lecture`)}> Add lectures </button> 
            </div>


            <form className='flex flex-col mt-14 gap-5 border-2 border-[#b6b9bc] rounded-2xl py-4 px-8' onSubmit={handleSubmit}>

                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-xl'>Basic Information</h1>
                        <h2 className='font-normal text-[#b6b9bc]'>Make changes to your courses here. Click save when you're done.</h2>
                    </div>

                    <div className='flex items-center'>
                        <button type="button" disabled={data.course.lectures.length===0} className='px-4 py-1 mr-10 bg-black text-white rounded-xl cursor-pointer hover:bg-white hover:text-black duration-500' onClick={handlePublish}> {input.isPublished ? "Unpublish" : "Publish"} </button> 
                        <button type="button" className='px-4 py-1 bg-white text-black rounded-xl cursor-pointer hover:bg-black hover:text-white duration-500' onClick={deleteCourse}> Remove Course </button> 
                    </div>
                </div>

                <label htmlFor="courseTitle" className='font-bold'>Title</label>
                <input type="text" onChange={handleChange} name="courseTitle" value={input.courseTitle}  placeholder='Enter course title' className='p-2 rounded-xl border-2 border-[#b6b9bc]  outline-none' />
                
                <label htmlFor="description" className='font-bold'>Description</label>
                <RichTextEditor input={input} setInput={setInput} />

                <label htmlFor="coursePrice" className='font-bold'>Price</label>
                <input type="text" onChange={handleChange} name="coursePrice" value={input.coursePrice}  placeholder='Enter course price' className='p-2 rounded-xl border-2 border-[#b6b9bc]  outline-none' />

                <label htmlFor="category" className='font-bold'>Category</label>

                <select value={input.category} name="category" className='p-2 rounded-xl border-2 border-[#b6b9bc] outline-none' onChange={handleChange} >
                    <option value="">Select a category</option>
                    <option value="datascience">Data Science</option>
                    <option value="react">React</option>
                    <option value="cloud">Cloud</option>
                    <option value="aiml">Artificial Intelligence</option>
                    <option value="fullstack">Fullstack development</option>
                    <option value="python">Python</option>
                </select>

                <label htmlFor="courseLevel" className='font-bold'>Course Level</label>

                <select value={input.courseLevel} name="courseLevel" className='p-2 rounded-xl border-2 border-[#b6b9bc] outline-none' onChange={handleChange} >
                    <option value="">Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>

                {thumbnail && (
                    
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Current Thumbnail:</p>
                        <img src={thumbnail} alt="Course Thumbnail" className="w-40 h-28 object-cover rounded-md shadow" />
                    </div>
                )}

                <label htmlFor="courseThumbnail" className='font-bold'>Course Thumbnail</label>
                <input type="file" name="courseThumbnail" accept="image/*" onChange={handleThumbnail} className='p-2 rounded-xl border-2 border-[#b6b9bc]  outline-none' />


                <div className='w-[30%] mt-5 text-md font-semibold'>
                    <button type="submit" disabled={updateLoading} className='px-4 py-1 mr-10 bg-black text-white rounded-xl cursor-pointer hover:bg-white hover:text-black duration-500'> Save </button> 
                    <button type="button" disabled={updateLoading} className='px-4 py-1 bg-white text-black rounded-xl cursor-pointer hover:bg-black hover:text-white duration-500' onClick={handleCancel}> Cancel </button> 
                </div>
            </form>

        </div>
    )
}

export default EditCourse;


