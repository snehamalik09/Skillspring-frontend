import HeroSection from "../components/HeroSection.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import QuizOfTheDay from "../components/QuizOfTheDay.jsx";
import FeaturedCourses from "../components/FeaturedCourses.jsx";


function Home(){
    const contactRef = useRef(null);
    const location = useLocation();

    const handleScrollToContact = () =>{
        contactRef.current?.scrollIntoView({
            behavior: 'smooth', 
            block: 'start', 
          });
    }

    useEffect(() => {
    if (location.state?.scrollToContact) {
      handleScrollToContact();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

    

    return(
        <div className='w-screen h-screen bg-white overflow-x-hidden'>
            <HeroSection onBookCallClick={handleScrollToContact}/>
            <FeaturedCourses/>
            <QuizOfTheDay/>
            <Contact refProp={contactRef}/>
            <Footer  onBookCallClick={handleScrollToContact} />
        </div>
    )
}

export default Home;