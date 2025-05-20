import React from 'react'
import { useState, useEffect } from 'react';

const Filter = ({ handleFilterChange }) => {

    const categories = [
        { id: "fullstack", label: "Full Stack Development" },
        { id: "aiml", label: "AI/ML" },
        { id: "datascience", label: "Data Science" },
        { id: "react", label: "React" },
    ]

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortByPrice, setSortByPrice] = useState("");

    useEffect(()=>{
        handleFilterChange(selectedCategories, sortByPrice);
    }, [sortByPrice]);

    const handleCategoryChange = (category) => {
        if (category)
            setSelectedCategories((prev) => {
                const newCategories = prev.includes(category) ? prev.filter((id) => id !== category) : [...prev, category];
                handleFilterChange(newCategories, sortByPrice);
                return newCategories;
            })
    }

    const handleSort = (e) => {
        const selectedValue = e.target.value;
        setSortByPrice(selectedValue);
    }

    return (
        <div className='border-r-2 border-gray-300 pr-10'>
            <div className='flex justify-between py-4'>
                <h1 className='font-semibold text-xl'>Filter options</h1>
                <select className='rounded-xl border-2 border-gray-500 p-1 cursor-pointer' onChange={handleSort}>
                    <option value="" >Sort by price</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                </select>
            </div>

            <hr />

            <h1 className='font-bold my-[7%]'>CATEGORY</h1>

            <ul className=''>

                {categories.map((category, index) => (
                    <div key={index} className='flex items-center space-y-4 text-lg font-normal gap-2'>
                        <li className="flex items-center gap-2 text-lg font-normal">
                            <input
                                type="checkbox"
                                className="cursor-pointer"
                                onChange={() => handleCategoryChange(category.id)}
                            />
                            <label>{category.label}</label>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Filter
