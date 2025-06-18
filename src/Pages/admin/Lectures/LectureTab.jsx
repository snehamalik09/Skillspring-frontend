import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUpdateLectureMutation, useGetLectureByIdQuery, useDeleteLectureMutation } from '../../../features/api/courseApi';

const LectureTab = () => {
    const {lectureId, courseId} = useParams();
    const {data:lectureData, error} = useGetLectureByIdQuery({courseId, lectureId});
    const [updateLecture] = useUpdateLectureMutation();
    const [deleteLecture] = useDeleteLectureMutation();
    const [isFree, setIsFree] = useState(false);
    const [title, setTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState({
        videoUrl: '',
        publicId: '',
        lectureTitle: '',
        isPreviewFree: false
    });

    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [btnDisable, setBtnDisable] = useState(true);

    useEffect(() => {
        if (lectureData) {
            console.log("lecture details : ",lectureData);
            setTitle(lectureData.data.lectureTitle || "");
            setIsFree(lectureData.data.isPreviewFree || false);
            setUploadVideoInfo(prev => ({
                ...prev,
                videoUrl: lectureData.data.videoUrl || '',
                publicId: lectureData.data.publicId || '',
                lectureTitle: lectureData.data.lectureTitle || '',
                isPreviewFree: lectureData.data.isPreviewFree || false
            }));
            setBtnDisable(false);
        }
    }, [lectureData]);

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleToggle = () => {
        setUploadVideoInfo(prev => {
            const newValue = !prev.isPreviewFree;
            return {
                ...prev,
                isPreviewFree: newValue
            };
        });
    }

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        if (file) {
            formData.append("file", file);
            setMediaProgress(true);
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/media/upload-video`, formData, {
                onUploadProgress: ({ loaded, total }) => {
                    setUploadProgress(Math.round((loaded * 100) / total));
                }
            })
            if (res.data.success) {
                console.log("video url : ", res.data.data.url);
                setUploadVideoInfo(prev => ({
                    ...prev,
                    videoUrl: res.data.data.url,
                    publicId: res.data.data.public_id
                }));
            }

            setBtnDisable(false);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setMediaProgress(false);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("Please enter a lecture title");
            return;
        }

        try {
            const lectureDetails = {
                ...uploadVideoInfo,
                lectureTitle: title,
            };
            
            console.log("submitting lecture : ", {lectureId, courseId,lectureDetails}); 
            
            await updateLecture({lectureId, courseId,lectureDetails}).unwrap();
            toast.success("Lecture uploaded successfully")
            navigate(-1);
        }
        catch (error) {
            toast.error("Error uploading video");
        }
    }

    const removeLectureFromCourse = async () => {
        
        try{
            const res = await deleteLecture({ courseId, lectureId }).unwrap();
            toast.success("Lecture removed successfully!");
            navigate(-1);
        }
        catch(err){
            console.error(err);
            toast.error("Error in removing the lecture!");
        }
    }

    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full overflow-x-hidden">

            <form encType="multipart/form-data" onSubmit={handleSubmit} className="flex flex-col mt-14 gap-5 border-2 border-[#b6b9bc] rounded-2xl py-4 px-4 sm:px-8">

                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-xl'>Edit Lecture</h1>
                        <h2 className='font-normal text-[#b6b9bc]'>Make changes and click save when done.</h2>
                    </div>
                </div>

                <button type="button" onClick={removeLectureFromCourse} className='w-[50%] lg:w-[15%] px-4 py-1 bg-red-400 text-white rounded-xl cursor-pointer duration-500'> Remove Lecture </button>

                <label htmlFor="lectureTitle" className='font-bold'>Title</label>
                <input type="text" value={title} onChange={handleChange} name="lectureTitle" className='w-full lg:w-[15%] p-2 rounded-xl border-2 border-[#b6b9bc]  outline-none' />

                <label htmlFor="video" className='font-bold'>Video*</label>
                <input type="file" onChange={fileChangeHandler} name="video" accept="video/*" className='w-[50%] lg:w-[15%] p-2 rounded-xl border-2 border-[#b6b9bc]  outline-none' />

                <div className='flex gap-5'>
                    <div
                        className={`border-2 border-black rounded-xl w-18 h-7 p-1 flex items-center transition-all duration-300 ${uploadVideoInfo.isPreviewFree ? 'bg-green-400' : 'bg-gray-300'
                            }`}
                        onClick={handleToggle}
                    >
                        <div
                            className={`bg-black rounded-full w-6 h-full transition-transform duration-300 transform ${uploadVideoInfo.isPreviewFree ? 'translate-x-[2.5rem]' : 'translate-x-0'
                                }`}
                        ></div>
                    </div>

                    <p className='text-black'>Is this video free ?</p>
                </div>



                {mediaProgress && (
                    <div>
                        <div className='h-2 bg-black rounded-xl' style={{ width: `${uploadProgress}%` }}> </div>
                        {uploadProgress === 100 ? (<p> Uploading </p>) : (<p> Uploading - {uploadProgress}% </p>)}

                    </div>
                )}

                <button type="submit" disabled={btnDisable.toString()} className='w-[50%] lg:w-[15%] px-4 py-1 mr-10 mt-10 bg-black text-white rounded-xl cursor-pointer hover:bg-white hover:text-black duration-500' > Update Lecture </button>

            </form>
        </div>
    )
}

export default LectureTab;

