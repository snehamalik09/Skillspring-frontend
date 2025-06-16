import React from 'react';
import Navbar from './Navbar';
import Filter from './Filter';
import CourseSkeleton from './CourseSkeleton';
import { useGetSearchCoursesQuery } from '../features/api/courseApi';
import { useSearchParams } from 'react-router-dom';
import { Blocks } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { useProfileQuery } from '../features/api/authApi';
import Footer from './Footer';



const SearchPage = () => {

    const { data: userDetails } = useProfileQuery();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortByPrice, setSortByPrice] = useState("");
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    const { data, isLoading } = useGetSearchCoursesQuery({ searchQuery: query, categories: selectedCategories, sortByPrice });

    const [currentPage, setCurrentPage] = useState(1);
    const coursePerPage = 6;
    const totalPages = Math.ceil(data?.courses?.length / coursePerPage);
    const lastIndex = currentPage * coursePerPage;
    const paginatedCourses = data?.courses?.slice(lastIndex - coursePerPage, lastIndex);

    const isEmpty = !isLoading && data?.courses?.length === 0;

    const handleFilterChange = (categories, price) => {
        setSelectedCategories(categories);
        setSortByPrice(price);
    }

    useEffect(() => {
        console.log("query : ", query, "categories : ", selectedCategories, "sorting : ", sortByPrice);
    }, [query, selectedCategories, sortByPrice]);

    useEffect(() => {
        console.log("searched data is : ", data);
    }, [data]);



    return (


        <div className="bg-gray-50 min-h-screen m-0">

            {isLoading ?
                <div className="flex justify-center items-center min-h-screen">
                    <Blocks
                        height="80"
                        width="80"
                        color="#192A88"
                        ariaLabel="blocks-loading"
                        visible={true}
                    />
                </div>


                :

                (
                    <>


                        <Navbar />

                        <div className="px-[5%] py-6">
                            <h1 className="font-bold text-2xl text-gray-800 mb-2"> {data?.courses?.length} results {query ? `for "${query}"` : ""} </h1>
                            <p className="text-gray-600">
                                Showing results <span className="italic text-blue-500"> {query ? `for "${query}"` : '...'} </span>
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-10 w-[90%] mx-auto mb-[5%]">
                            <div className="w-full lg:w-1/4">
                                <Filter handleFilterChange={handleFilterChange} />
                            </div>

                            <div className="flex flex-col w-full lg:w-3/4 gap-6">
                                {isLoading ? (
                                    Array.from({ length: 3 }).map((_, idx) => (
                                        <CourseSkeleton key={idx} />
                                    ))
                                ) : isEmpty ? (
                                    <p className="text-center text-gray-500 text-lg">Your search didn't return any results. Explore other topics!</p>
                                ) :
                                    paginatedCourses.map((course, index) => (
                                        <CourseCard key={index} course={course} user={userDetails?.user} />
                                    ))

                                }
                            </div>

                            {totalPages && totalPages > 0 &&
                                <div className="flex justify-center items-center gap-2 mt-4">
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`px-4 py-2 rounded-lg border font-medium transition-all duration-200 cursor-pointer ${currentPage === index + 1
                                                ? 'bg-indigo-600 text-white shadow-md scale-105'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:border-indigo-400'} `}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                </div>
                            }
                        </div>

                        <Footer />
                    </>
                )}
        </div>
    );
};

export default SearchPage;

