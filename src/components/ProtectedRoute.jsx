import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Blocks } from 'react-loader-spinner';


export const ProtectedAdminRoute = ({ children }) => {
    const { user, isAuthenticated, loading } = useSelector(store => store.auth);

    if (loading) return (<div className='flex h-screen w-full justify-center items-center'>
        <Blocks
            height="80"
            width="80"
            color="#192A88"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
        />  </div>)

    if (!isAuthenticated)
        return <Navigate to="/login" />

    console.log("use rrole : ", user.role);
    if (!user || user.role != 'instructor') {
        return <Navigate to="/" />
    }

    return children;
};
