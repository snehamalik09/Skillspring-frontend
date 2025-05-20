// import {useState } from 'react'
// import { useLoginUserMutation, useRegisterUserMutation } from '../features/api/authApi';
// import { userLoggedIn } from '../features/authSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { Circles } from 'react-loader-spinner';



// function ForgotPassword() {

  

//   const [userData, setUserData] = useState(null);
//   const [ registerUser, {data:registerData, error:registerError, isSuccess:registerIsSuccess, isLoading:registerIsLoading} ] =  useRegisterUserMutation();
//   const [loginUser, {data:loginData, error:loginError, isSuccess:loginIsSuccess, isLoading:loginIsLoading} ]= useLoginUserMutation();
//   const authState = useSelector( (state) => state.auth);
//   const dispatch = useDispatch();

//   const [signinInput, setSigninInput] = useState({
//     "email": "",
//     "password": ""
//   })

//   const [signupInput, setSignupInput] = useState({
//     "name":"",
//     "email": "",
//     "password": ""
//   })

//   const [activeTab, setActiveTab] = useState(true);

//   function handleChange(e) {

//     const { name, value } = e.target;


//   async function handleSubmit(e) {
//     e.preventDefault();
//     const data = activeTab ? signinInput : signupInput;
//     setUserData(data);
//     setSigninInput({"email": "", "password": ""});
//     setSignupInput({"name" : "","email": "", "password": ""});

//     if(activeTab){
//       const response = await loginUser(data).unwrap();
//       if (response.success) {
//         console.log('User signed in successfully:', response);
//         dispatch(userLoggedIn({"user" : data}));
        
//       }
        
//       else
//         console.error('Signin failed:', response.message);
      
//     }

//     else{
//       const response = await registerUser(data).unwrap();
//       if (response.success) 
//         console.log('User signed up successfully:', response.message);
//       else
//         console.error('Signup failed:', response.message);
//     }
//   }

 
//   return (
//     <div className="w-screen h-screen flex justify-center items-center">

//       {loginIsLoading || registerIsLoading ? 
//         <Circles
//         height="80"
//         width="80"
//         radius="9"
//         color="#F57D1F"
//         ariaLabel="loading"
//         wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
//         wrapperClass=""
//       /> : 

//       <div className=" w-[40%] h-[90%] border-2 border-black rounded-2xl bg-black text-white shadow-2xl shadow-amber-600">

//         <div className="flex w-[100%] border-b-4 border-slate-200 p-4 justify-around text-lg cursor-pointer"  >
//           <p className={activeTab ? "text-[#F57D1F]" : ""} onClick={() => setActiveTab(true)}> Sign in</p>
//           <p className={!activeTab ? "text-[#F57D1F]" : ""}  onClick={() => setActiveTab(false)}> Sign up</p>
//         </div>

//         {activeTab ===true ? <form onSubmit={handleSubmit} className="grid grid-cols-3 p-10 gap-5">
//           <label className="m-2">Email</label>
//           <input type="email" name="email" value={signinInput.email} placeholder="Enter email address" onChange={handleChange} className="col-span-2 p-1 border-2 border-white rounded-lg m-2" />


//           <label className="m-2">Password</label>
//           <input type="password" name="password" placeholder="Enter password" value={signinInput.password} onChange={handleChange} className="col-span-2 p-1 border-2 border-white rounded-lg m-2" />

//           <div className=" ml-48 mt-16">
//            <button type="submit" className="py-2 px-14 rounded-md bg-[#F57D1F] text-white cursor-pointer">Login</button> 
//           </div>
//         </form> : <form onSubmit={handleSubmit} className="grid grid-cols-3 p-10">

//           <label className="m-2">Name</label>
//           <input type="text" name="name" value={signupInput.name} placeholder="Enter full name" onChange={handleChange} className="col-span-2 p-1 border-2 border-white rounded-lg  m-2" />

//           <label className="m-2">Email</label>
//           <input type="email" name="email" value={signupInput.email} placeholder="Enter your email" onChange={handleChange} className="col-span-2 p-1 border-2 border-white rounded-lg  m-2" />


//           <label className="m-2">Password</label>
//           <input type="password" name="password" placeholder="Create a strong password" value={signupInput.password} onChange={handleChange} className="col-span-2 p-1 border-2 border-white rounded-lg  m-2" />

//           <div className=" ml-48 mt-16">
//            <button type="submit" className="py-2 px-14 rounded-md bg-[#F57D1F] text-white cursor-pointer">Register</button> 
//           </div>
//         </form>  }








//       </div>
// }
//     </div>
//   )
// }

// export default ForgotPassword


