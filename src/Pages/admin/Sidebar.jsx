import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import TopNavbar from '../../components/TopNavbar';
import { MdDashboard, MdAssignment } from "react-icons/md";

const Sidebar = () => {
    return (
        <>
            <TopNavbar />

            <div className="flex">
                <div className='w-[20%] min-w-[200px] h-screen fixed top-0 left-0 bg-gray-300 border-r border-gray-400 z-10'>
                    <ul className="flex flex-col gap-4 p-4">
                        <li className="font-semibold text-lg hover:text-blue-700">
                            <Link to="/admin" className='flex items-center gap-2'>
                                <MdDashboard className="text-xl" /> Dashboard
                            </Link>
                        </li>
                        <li className="font-semibold text-lg hover:text-blue-700">
                            <Link to="/admin/courses" className='flex items-center gap-2'>
                                <MdAssignment className="text-xl" /> Courses
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="ml-[20%] w-[80%] overflow-x-hidden px-6 py-4">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Sidebar;


