// import { motion } from 'framer-motion';
// import { useSelector } from "react-redux";

// const CourseSkeleton = () => {
//     const isOpen = useSelector((state) => state.navbarToggle.isNavbarOpen);

//     return (
//         <motion.div
//             initial={{ scale: 0.90 }}
//             className={`bg-[#FFF1E0] shadow-md rounded-2xl flex w-full max-w-[80%] mx-auto my-5 overflow-hidden ${isOpen ? 'w-[100%]' : 'w-[80%]'} animate-pulse`}
//         >
//             <div className="w-1/3 h-full bg-gray-300 rounded-lg"></div>

//             <div className="w-2/3 p-6 flex flex-col justify-center bg-white text-black">
//                 <div className="w-3/4 h-4 bg-gray-300 rounded mb-3"></div> 
//                 <div className="w-1/2 h-3 bg-gray-300 rounded mb-2"></div> 
//                 <div className="w-1/3 h-4 bg-[#FFF1E0] rounded mb-3"></div>
//                 <div className="w-full h-20 bg-gray-300 rounded mb-3"></div> 
//                 <div className="bg-[#192A88] text-white px-6 py-2 rounded-lg cursor-not-allowed opacity-50">
//                     Enroll
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default CourseSkeleton;

import { motion } from 'framer-motion';
import { useSelector } from "react-redux";

const CourseSkeleton = () => {
  const isOpen = useSelector((state) => state.navbarToggle.isNavbarOpen);

  return (
    <motion.div
      initial={{ scale: 0.95 }}
      className={`flex flex-col md:flex-row max-w-6xl w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-200 animate-pulse ${
        isOpen ? 'w-full' : 'w-[80%]'
      }`}
    >
      <div className="md:w-1/3 w-full h-[220px] bg-gray-300 flex items-center justify-center">
        <div className="w-full h-full bg-gray-300 object-contain" />
      </div>

      <div className="md:w-2/3 w-full p-6 flex flex-col justify-between bg-gray-50">
        <div>
          <div className="w-2/3 h-6 bg-gray-300 rounded mb-4"></div>
          <div className="w-1/3 h-4 bg-gray-300 rounded mb-4"></div>

          <div className="flex items-center justify-between mb-4">
            <div className="w-1/4 h-5 bg-gray-300 rounded"></div>
            <div className="w-20 h-4 bg-green-100 rounded"></div>
          </div>

          <div className="w-full h-16 bg-gray-300 rounded mb-4"></div>
        </div>

        <div className="w-32 h-10 bg-gray-300 rounded"></div>
      </div>
    </motion.div>
  );
};

export default CourseSkeleton;
