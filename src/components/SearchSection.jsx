function SearchSection() {
    return (
        <>
            <div className='h-screen w-screen bg-[#E6D5B8] text-[#005F73] font-bold flex flex-col justify-center items-center overflow-hidden'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-4xl p-2'>Find the best courses for you.</h1>
                    <h3 className='text-xl p-4'>Discover, Learn, and Upskill with our wide range of courses</h3>
                </div>
                     <div className="flex w-[100%] justify-center gap-10">
                    <input type="text" name="searchbar" className="bg-white rounded-xl p-2  w-[30%]" />  <button className='px-4 py-2 rounded-xl bg-[#D4A373] text-white font-bold text-lg cursor-pointer'>Search</button>
                    </div>

                    <button className='px-4 py-2 rounded-xl bg-[#D4A373] text-white font-bold text-lg m-6 cursor-pointer'>Explore Courses</button>
            </div>
        </>
    );
};

export default SearchSection;