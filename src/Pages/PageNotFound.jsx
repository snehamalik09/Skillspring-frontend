import React from 'react'
import PageNotFoundImage from '../assets/PageNotFoundImage.jpg'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='w-screen h-screen page-not-found'  >
      <div className='text-white flex flex-col justify-center items-center gap-10 left-5 absolute top-1/3 md:left-20'>
        <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold'> Uh-oh, looks like you’re lost. </h1>
        <div className='flex flex-col gap-3 items-center'>
          <p>Even the best explorers get lost sometimes.</p>
          <p>Find your way back to the <Link to="/" className= ' text-black md:text-blue-600 underline cursor-pointer'>Home Page</Link> and start over.</p>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
