import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { userLoggedOut } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { useEffect, useState } from "react";


const Navbar = ({ handleScrollToContact }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userDetails = useSelector((state) => state.auth);
  const isLoggedIn = userDetails.isAuthenticated;
  const [openNavbar, setOpenNavbar] = useState(false);

useEffect(() => {
  const handleOutsideClick = (e) => {
    if (e.target.closest('.mobileNav') || e.target.closest('.menuToggle')) return;

    if (openNavbar) {
      setOpenNavbar(false);
    }
  };

  document.addEventListener('click', handleOutsideClick);

  return () => {
    document.removeEventListener('click', handleOutsideClick);
  };
});


  console.log("userDetails : ", userDetails);
  console.log("isLoggedIn : ", isLoggedIn);

  const handleClick = (path) => {
    setOpenNavbar(false);
    navigate(path);
  }

  const handleLogout = async () => {
    try {
      console.log("logout clicked");
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`, { withCredentials: true });
      dispatch(userLoggedOut());
      navigate("/");
    }
    catch (err) {
      console.error("Error logging out user:", err?.response?.data || err.message);
    }
  }



  const handleContactClick = () => {
    setOpenNavbar(false);
    if (location.pathname === "/") {
      handleScrollToContact?.();
    } else {
      navigate("/", { state: { scrollToContact: true } });
    }
  };

  const toggleNavbar = () => {
    setOpenNavbar((prev) => !prev);
  };





  return (
    <>
      <nav className='h-20 text-black w-[100%] flex justify-between text-md text-sm py-5 px-10 py-10 px-20 mb-6 cursor-pointer border-b-4 border-white'>
        <div className="text-xl font-bold">SkillSpring</div>
        <div>
          <CiMenuBurger className="menuToggle md:hidden text-xl" onClick={toggleNavbar} aria-label="Toggle navigation menu" />
          <div className={` mobileNav absolute top-0 left-0 w-full h-[50%] justify-center items-center bg-[#ecf0fedc] backdrop-blur-sm z-[100] ${openNavbar ? 'flex' : 'hidden'} `}>
            <ul className="font-semibold flex flex-col gap-10 text-xl">
              <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" onClick={() => handleClick("/")}>Home</li>
              <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" onClick={() => handleClick("/dashboard")}>Dashboard</li>
              <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" onClick={handleContactClick}>Contact</li>

              <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" onClick={() => handleClick("/courses")}> Courses</li>
              {!isLoggedIn ? (
                <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95"><Link to="/login">Login</Link></li>
              ) : (
                <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" onClick={handleLogout}>Logout</li>
              )}
            </ul>
          </div>
          <ul className="gap-10 font-semibold hidden md:flex">
            <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" ><Link to="/">Home</Link></li>
            {/* <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" onClick={() => handleClick("/")}>About</li> */}
            <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" onClick={() => handleClick("/dashboard")}>Dashboard</li>
            <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" onClick={handleContactClick}>Contact</li>

            <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" onClick={() => handleClick("/courses")}> Courses</li>
            {!isLoggedIn ? (
              <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95"><Link to="/login">Login</Link></li>
            ) : (
              <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" onClick={handleLogout}>Logout</li>
            )}


          </ul>
        </div>
      </nav>


    </>
  );
};


export default Navbar;
