import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProfileQuery } from '../features/api/authApi'
import emptyProfilePicture from '../assets/emptyProfilePicture.webp'

const TopNavbar = () => {
    const {data, isLoading, error} = useProfileQuery();
    const [profilePhoto, setProfilePhoto] = useState("");

    useEffect(()=>{
        console.log("data : ", data);
        const profilePhoto = data?.user?.profilePhoto;
        setProfilePhoto(profilePhoto);
    }, [data]);


  return (
    <div className='ml-[20%] gap-[60%] h-20 w-full shadow-xl flex items-center overflow-hidden'>
      
      <div>
        <Link to="/"> <h1 className='font-bold text-xl md:text-2xl ml-12'>SkillSpring</h1> </Link> 
      </div>

      <div className='overflow-hidden'>
        <Link to="/dashboard"> 
            <img src={profilePhoto?profilePhoto:emptyProfilePicture} alt="profilePicture" className="h-12 w-12 rounded-full object-cover border-2 border-white" />
        </Link> 
      </div>


    </div>
  )
}

export default TopNavbar
