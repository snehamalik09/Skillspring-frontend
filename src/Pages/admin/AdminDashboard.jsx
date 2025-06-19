import React, { useEffect } from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { useOutletContext } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';



const AdminDashboard = () => {
  const { sideBarOpen, setSideBarOpen } = useOutletContext();
  const data = [{ name: 'Page A', uv: 400 }, { name: 'Page B', uv: 200 }, { name: 'Page C', uv: 900 }, { name: 'Page D', uv: 650 }, { name: 'Page E', uv: 500 }];


  return (
    <div className='w-full mt-5 overflow-x-hidden '>

      <div className='w-[90%] h-full mx-auto grid grid-cols-3 gap-10'>
        <div className=' p-5 text-2xl flex flex-col gap-4 rounded-xl shadow-xl'>
          <h1 className='font-semibold'>Total Sales</h1>
          <h1 className='font-bold text-blue-700 text-4xl'>1</h1>
        </div>
        <div className=' p-5 text-2xl flex flex-col gap-4 rounded-xl shadow-xl'>
          <h1 className='font-semibold'>Total Revenue</h1>
          <h1 className='font-bold text-blue-700 text-4xl'>1</h1>
        </div>
        <div className=' px-5 py-10 text-lg col-span-3 rounded-xl shadow-xl'>
          <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard

// {!sideBarOpen
//               &&
//               <CiMenuBurger
//                 className="md:hidden absolute top-[13%] left-5 z-50 text-2xl text-gray-800 cursor-pointer"
//                 onClick={() => setSideBarOpen((prev)=>!prev)}
//               />
//             }

//         {sideBarOpen &&
//                     <div className='z-40 inset-0 bg-white/30 backdrop-blur-sm fixed md:hidden' onClick={() => setSideBarOpen(false)}>
//                     </div>} 
