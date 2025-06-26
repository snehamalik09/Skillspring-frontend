import { useState } from 'react'
import { useLoginUserMutation, useRegisterUserMutation } from '../features/api/authApi';
import { userLoggedIn } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Blocks } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';



function Login() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [registerUser, { data: registerData, error: registerError, isSuccess: registerIsSuccess, isLoading: registerIsLoading }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isSuccess: loginIsSuccess, isLoading: loginIsLoading }] = useLoginUserMutation();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [signinInput, setSigninInput] = useState({
    "email": "",
    "password": ""
  })

  const [signupInput, setSignupInput] = useState({
    "name": "",
    "email": "",
    "password": ""
  })

  const [activeTab, setActiveTab] = useState(true);

  function handleChange(e) {

    const { name, value } = e.target;

    if (activeTab == true) {
      setSigninInput({
        ...signinInput,
        [name]: value
      })
    }

    else {
      setSignupInput({
        ...signupInput,
        [name]: value
      })
    }

  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = activeTab ? signinInput : signupInput;
    setUserData(data);
    setSigninInput({ "email": "", "password": "" });
    setSignupInput({ "name": "", "email": "", "password": "" });

    if (activeTab) {
      const response = await loginUser(data);
      console.log("response is : ", response);

      if (response.data && response.data.success) {
        console.log('User signed in successfully:', response.data);
        dispatch(userLoggedIn({ "user": data }));
        navigate('/');
      }

      else {
        console.error('Signin failed:', response);
        toast.error(response.error?.data?.message, { autoClose: 2000 });
      }
    }

    else {
      const response = await registerUser(data);
      if (response.data && response.data.success) {
        console.log('User signed up successfully:', response);
        toast.success(response.data.message, { autoClose: 2000 });
        navigate('/login');
        setActiveTab(true);
      }
      else {
        console.error('Signup failed:', response);
        toast.error(response.error.data.message, {
          autoClose: 2000
        });
      }

    }
  }


  return (
    <div className="w-screen min-h-screen flex justify-center items-center">

      {loginIsLoading ?

        <Blocks
          height="80"
          width="80"
          color="#192A88"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        /> :

        <>



          <div className='min-h-screen w-screen'>
            <Navbar />

            <div className='flex flex-col md:flex-row'>

              <div className='w-full md:w-[50%] md:h-screen bg-[#192A88] hidden lg:block lg:absolute top-0 left-0 text-center '>
                <div className='flex flex-col justify-center items-center font-bold text-white px-10 py-20 md:p-0 md:mt-[40%]'>
                  <h1 className='text-2xl'>Welcome Back!</h1>
                  <h3 className=''>Unlock your learning potential! Sign in to continue your journey!</h3>
                </div>
              </div>

              <div className='w-full lg:w-[50%] lg:ml-[50%] mt-[20%] lg:mt-0 flex  flex-col items-center justify-center'>

                <h1 className='font-bold text-2xl text-[#192A88] my-[2%]'> {activeTab ? "SIGN IN" : "SIGN UP"} </h1>

                {activeTab === true ?
                  <form onSubmit={handleSubmit} className="flex flex-col w-[85%] lg:w-[70%] mt-[2%] px-[6%] py-[7%] font-semibold shadow-2xl shadow-gray-500">
                    <input type="email" name="email" value={signinInput.email} placeholder="Email" onChange={handleChange} className="p-2 border-2 border-black rounded-lg m-2" />

                    <input type="password" name="password" placeholder="Password" value={signinInput.password} onChange={handleChange} className="p-2 border-2 border-black rounded-lg m-2" />
                    <button type="submit" className="py-[1%] px-[4%] rounded-md text-white bg-[#192A88] mt-[5%] font-bold cursor-pointer transition duration-200 hover:scale-105 active:scale-95">Login</button>

                    <p className='font-normal text-sm text-center mt-4'>Don't have an account ? <button className='font-bold cursor-pointer' onClick={() => { setActiveTab(false) }}> Sign up</button> </p>

                  </form> :

                  <form onSubmit={handleSubmit} className="flex flex-col w-[85%] lg:w-[70%] mt-[2%] px-[6%] py-[7%] font-semibold shadow-2xl shadow-gray-500">

                    <input type="text" name="name" value={signupInput.name} placeholder="Name" onChange={handleChange} className="p-2 border-2 border-black rounded-lg m-2" />

                    <input type="email" name="email" value={signupInput.email} placeholder="Email" onChange={handleChange} className="p-2 border-2 border-black rounded-lg m-2" />

                    <input type="password" name="password" placeholder="Create Password" value={signupInput.password} onChange={handleChange} className="p-2 border-2 border-black rounded-lg m-2" />

                    <select className="p-2 border-2 border-black rounded-lg m-2 text-gray-500">
                      <option value="instructor">Instrutor</option>
                      <option value="student">Student</option>
                    </select>

                    <button type="submit" className="py-[1%] px-[4%] rounded-md text-white bg-[#192A88] mt-[5%] font-bold cursor-pointer transition duration-200 hover:scale-105 active:scale-95">Register</button>

                    <p className='font-normal text-sm text-center mt-4'>Already have an account ? <button className='font-bold cursor-pointer' onClick={() => { setActiveTab(true) }}> Sign In</button> </p>

                  </form>
                }
              </div>

            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Login;



