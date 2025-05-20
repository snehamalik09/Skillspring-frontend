import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { userLoggedOut } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Navbar = ({ handleScrollToContact }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userDetails = useSelector((state) => state.auth);
  const isLoggedIn = userDetails.isAuthenticated;

  console.log("userDetails : ", userDetails);
  console.log("isLoggedIn : ", isLoggedIn);

  const handleClick = (path) => {
    if (!isLoggedIn)
      navigate("/login");
    else
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
    if (location.pathname === "/") {
      handleScrollToContact?.(); 
    } else {
      navigate("/", { state: { scrollToContact: true } });
    }
  };




  return (
    <>
      <nav className='h-20 text-black w-[100%] flex justify-between text-md py-10 px-20 mb-6 cursor-pointer border-b-4 border-white'>
        <div className="text-xl font-bold">SkillSpring</div>
        <div>
          <ul className="flex gap-10 font-semibold">
            <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" ><Link to="/">Home</Link></li>
            {/* <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" onClick={() => handleClick("/")}>About</li> */}
            {isLoggedIn ? (
              <li className="transition duration-200 hover:text-[#192A88] hover:scale-105 active:scale-95" onClick={() => handleClick("/dashboard")}>Dashboard</li>
            ) : ""}
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
