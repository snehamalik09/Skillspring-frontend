import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";


const Footer = ({handleScrollToContact }) => {
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

  const handleContactClick = () => {
    if (location.pathname === "/") {
      handleScrollToContact?.(); 
    } else {
      navigate("/", { state: { scrollToContact: true } });
    }
  };


  return (
    <footer className="w-full bg-white text-gray-800 border-t-2 border-gray-200 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        <div>
          <h2 className="text-2xl font-bold text-[#192A88] mb-4">SkillSpring</h2>
          <p className="text-sm text-gray-600">
            Empowering learners with accessible knowledge and interactive learning.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link to="/" className="hover:text-[#192A88] transition">Home</Link>
            </li>
            <li onClick={() => handleClick("/courses")} className="cursor-pointer hover:text-[#192A88] transition">
              Courses
            </li>
            <li onClick={handleContactClick} className="cursor-pointer hover:text-[#192A88] transition">
              Contact
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm">📧 info@skillspring.com</p>
          <p className="text-sm">📞 +91-123-456-7890</p>
        </div>

        <div className="flex items-start md:items-end justify-start md:justify-end text-sm text-gray-500">
          <p className="md:text-right">© {new Date().getFullYear()} SkillSpring. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
