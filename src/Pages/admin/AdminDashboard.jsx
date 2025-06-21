import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useGetPurchasedCoursesOfCreatorQuery } from '../../features/api/courseApi';
import { CiMenuBurger } from "react-icons/ci";



const AdminDashboard = () => {
  const { sideBarOpen, setSideBarOpen } = useOutletContext();
  const { data: purchasedCourses, error, isLoading } = useGetPurchasedCoursesOfCreatorQuery();

  const truncate = (text) => {
    const words = text.split(" ");
    const firstLine = words.splice(0, 2).join(" ");
    const secondLine = words.splice(0, 2).join(" ");
    const title = firstLine + secondLine + '...';
    return title;
  }

  const courseDetails = purchasedCourses?.courses?.map((course) => (
    { title: course.category.toUpperCase(), sales: course.enrolledStudents.length }
  ))

  useEffect(() => {
    console.log("purchased courses : ", purchasedCourses);
  }, [purchasedCourses])

  return (
    <div className='w-full mt-5 overflow-x-hidden '>

      {!sideBarOpen
        &&
        <CiMenuBurger
          className="md:hidden absolute top-[13%] left-5 z-50 text-2xl text-gray-800 cursor-pointer"
          onClick={() => setSideBarOpen((prev) => !prev)}
        />
      }

      {sideBarOpen &&
        <div className='z-40 inset-0 bg-white/30 backdrop-blur-sm fixed md:hidden' onClick={() => setSideBarOpen(false)}>
        </div>}

      <div className='w-[95vw] md:w-[90%] mt-10 md:mt-0  h-auto mx-auto grid grid-cols-2 md:grid-cols-3 gap-10'>
        <div className=' p-5 text-lg md:text-2xl flex flex-col gap-4 rounded-xl shadow-xl'>
          <h1 className='font-semibold'>Total Sales</h1>
          <h1 className='font-bold text-blue-700 text-xl md:text-3xl'>{purchasedCourses?.totalSales || 0}</h1>
        </div>
        <div className=' p-5 text-lg md:text-2xl flex flex-col gap-4 rounded-xl shadow-xl'>
          <h1 className='font-semibold'>Total Revenue</h1>
          <h1 className='font-bold text-blue-700 text-xl md:text-3xl'>₹{purchasedCourses?.totalRevenue || 0}</h1>
        </div>
        <div className='text-xs col-span-2 md:col-span-3 rounded-xl shadow-xl md:px-15 bg-gray-50'>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={courseDetails} margin={{ top: 20, right: 20, bottom: 80, left: 30 }}>
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="title" interval={0} textAnchor='middle' />
              <YAxis allowDecimals={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard




