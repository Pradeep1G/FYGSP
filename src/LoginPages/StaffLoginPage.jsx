

// import { useEffect, useState } from 'react'
// import './index.css'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// // import { useEffect } from 'react';
// // import { useLocation } from 'react-router-dom';
// import LoadingScreen from './shared/Loader';

// import Loginnavbar from "./shared/Loginnavbar";
// import Footer from "./shared/Footer";

// export default function StaffLogin(){


//     const [formData, setFormData] = useState({ email: '', password: '' });

//     // const serverPath1 = "http://127.0.0.1:5000"
//       const serverPath1 = "https://fgspserver.onrender.com"
    
//     const [isLoading, setIsLoading] = useState();
    
//     const navigate = useNavigate()
//     const currentPath = location.pathname;

//     const [Error1, setError1] = useState();

//     const handleLogin=async(e)=>{
//         setError1();
//         e.preventDefault();
//         console.warn("Im clicked");
//         setIsLoading(true);
        
//         const response = await axios.post(serverPath1+"/stafflogin/"+formData['email'], formData)
//         console.warn(response.data);
//         if(response.data.message=="Invalid Credentials" || response.data.message=="Account not found!")
//         {

//             setError1(response.data.message)
//         }
//         else
//         {
//             localStorage.setItem("GuideMailIdToLogin",formData.email);
//             navigate("/staffdashboard")
//         }
//         setIsLoading(false);
//         // navigate("/StudentInfoBar")
//     }

//     useEffect(()=>{
//         if(localStorage.getItem("GuideMailIdToLogin")){
//             navigate("/staffdashboard")
//         }
//     },[])




//     return(
//         <>

//             {isLoading && <LoadingScreen />}
//             <div className="flex flex-col min-h-screen">
//                 <div className="flex-grow">

//                 <Loginnavbar />

//                 <div className="loginbg md:px-0 px-10">


//                 <div className='lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border p-4 bg-white md:bg-opacity-60 bg-opacity-80 backdrop-filter  rounded-lg shadow-lg'>
                        
//                         <div className=' flex justify-center'>
//                             <h1 className='p-4 font-bold text-3xl'>FACULTY LOGIN</h1>
//                         </div>

//                         <div className='justify-center'>

//                         <form onSubmit={handleLogin}>
//                             <input
//                             className='border-2 border-solid border-black rounded-lg px-2 h-12 my-4 w-full'
//                             type="email"
//                             placeholder="Email"
//                             value={formData.email}
//                             required
//                             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                             />
//                             <input
//                             className='border-2 border-solid border-black rounded-lg h-12 px-2 my-4 w-full'
//                             type="password"
//                             placeholder="Password"
//                             value={formData.password}
//                             required
//                             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                             />

//                         <div className=' flex justify-center'>

//                             <button className= 'bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg' type="submit">Login</button>
//                         </div>

//                         <div className="flex justify-around pb-2">
//                             {Error1 && <p style={{ color: 'red' }} className="">{Error1}</p>}

//                         </div>

//                         </form>
//                     </div>
//                 </div>



//                 </div>
                




//                 </div>


//                 <Footer />


//             </div>
//         </>
//     );
// }





import { useEffect, useState } from 'react'
//import './index.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import LoadingScreen from '../shared/Loader';

import Loginnavbar from "../shared/Loginnavbar";
import Footer from "../shared/Footer";
import studentLoginGif from '../assets/stafflogin.gif';
import loginprofile from '../assets/profile2.jpeg'



export default function StaffLoginPage(){


    const [formData, setFormData] = useState({ email: '', password: '' });

     const serverPath1 = "http://127.0.0.1:5000"
    //   const serverPath1 = "https://fgspserver.onrender.com"
    
    const [isLoading, setIsLoading] = useState();
    
    const navigate = useNavigate()
    const currentPath = location.pathname;

    const [Error1, setError1] = useState();

    const handleLogin=async(e)=>{
        setError1();
        e.preventDefault();
        console.warn("Im clicked");
        setIsLoading(true);
        
        const response = await axios.post(serverPath1+"/stafflogin/"+formData['email'], formData)
        console.warn(response.data);
        if(response.data.message=="Invalid Credentials" || response.data.message=="Account not found!")
        {

            setError1(response.data.message)
        }
        else
        {    
            localStorage.setItem("GuideMailIdToLogin", formData.email);
            localStorage.setItem("jwt_token", response.data.access_token);
            console.log("token_staff :" , response.data.access_token)  // Store the JWT token
            navigate("/staffdashboard");
        }
        setIsLoading(false);
        // navigate("/StudentInfoBar")
    }
    useEffect(()=>{
        if(localStorage.getItem("jwt_token")){
            navigate("/staffdashboard")
        }
    },[])




    return(
        <>
            {isLoading && <LoadingScreen />}
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow">

                    <Loginnavbar />

                    <div className="loginbg md:px-0 px-10">
                        <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
                            <div className='w-full rounded-l-lg h-[560px] hidden md:block px-8 pt-6 pb-4 bg-[#fefefe] md:bg-opacity-90 bg-opacity-70 backdrop-filter'>
                                {/* <video
                                    className='w-full h-full object-cover'
                                    src={studentLoginGif}
                                    autoPlay
                                    loop
                                    muted
                                /> */}
                                <img
                                    className='w-full h-full object-cover rounded-lg'
                                    src={studentLoginGif}
                                    alt='Student Login Animation'
                                />
                            </div>
                            <div className='p-4 pl-10 pr-10 flex flex-col justify-around bg-white md:bg-opacity-80 bg-opacity-70 backdrop-filter  rounded-r-lg shadow-lg'>



                                {/* <div className='p-4 pl-10 pr-10 flex flex-col justify-around bg-white md:bg-opacity-80 bg-opacity-70 backdrop-filter  rounded-r-lg shadow-lg'> */}

                                <form onSubmit={handleLogin}>
                                <div className="flex justify-center items-center mb-8">
                                        <div className="relative group">
                                            <img
                                                src={loginprofile}
                                                alt="Avatar"
                                                className="h-28 w-28 rounded-full border-4 border-gray-500 transition-transform duration-300 ease-in-out group-hover:scale-105"
                                            />
                                        </div>
                                    </div>

                                    <div className=' flex justify-center'>
                                        <h2 className='text-3xl font-bold text-center mb-8'>FACULTY LOGIN</h2>
                                    </div>
                                    <div class="relative h-11 w-full min-w-[200px] mb-4">
                                        <input
                                            className="peer h-full w-full border-b-2 border-black bg-transparent rounded-md pl-2 pt-4 pb-1.5  text-sm font-bold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-900 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                            type="email"
                                            placeholder='Email'
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                        <label
                                            class="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-bold leading-tight text-gray-900 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-4 after:border-red-000 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-900 peer-focus:after:scale-x-100 peer-focus:after:border-red-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Email
                                        </label>
                                    </div>
                                    {/* <div className="mb-4">
                                        <input
                                            className='border p-2 w-full'
                                            type="email"
                                            placeholder='Email'
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div> */}
                                    <div class="relative h-11 w-full min-w-[200px] mb-4">
                                        <input
                                            className="peer h-full w-full  border-b-2 border-black rounded-md
                                             bg-transparent pl-2 pt-4 pb-1.5  text-sm font-bold text-blue-gray-900 outline outline-0 transition-all placeholder-shown:border-blue-gray-700 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-900 placeholder:opacity-0 focus:placeholder:opacity-100"
                                            type="password"
                                            placeholder='Password'
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                        <label
                                            class="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-bold leading-tight text-gray-900 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-4 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-900 peer-focus:after:scale-x-100 peer-focus:after:border-red-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Password
                                        </label>
                                    </div>
                                    {/* <div className="mb-4">
                                        <input
                                            className='border p-2 w-full'
                                            type="password"
                                            placeholder='Password'
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div> */}
                                    <div className="flex justify-between">
                                        <button className='w-full py-2 my-4 bg-red-900 text-white rounded-md text-lg hover:bg-red-800' type="submit">Login</button>

                                    </div>
                                    <p className='text-center text-red-500'>{Error1}</p>
                                    <p className='text-right text-blue-500 cursor-pointer' onClick={() => navigate("/forgotpassword")}>Forgot Password?</p>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
                <Footer />
                </div>
        </>
    );
}
