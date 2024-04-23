

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
import './index.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import LoadingScreen from './shared/Loader';

import Loginnavbar from "./shared/Loginnavbar";
import Footer from "./shared/Footer";

export default function StaffLogin(){


    const [formData, setFormData] = useState({ email: '', password: '' });

     //const serverPath1 = "http://127.0.0.1:5000"
      const serverPath1 = "https://fgspserver.onrender.com"
    
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
            localStorage.setItem("GuideMailIdToLogin",formData.email);
            navigate("/staffdashboard")
        }
        setIsLoading(false);
        // navigate("/StudentInfoBar")
    }

    useEffect(()=>{
        if(localStorage.getItem("GuideMailIdToLogin")){
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


                <div className='lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border p-4 bg-white md:bg-opacity-60 bg-opacity-80 backdrop-filter  rounded-lg shadow-lg'>
                        
                        <div className=' flex justify-center'>
                            <h1 className='p-4 font-bold text-3xl'>FACULTY LOGIN</h1>
                        </div>

                        <div className='justify-center'>

                        <form onSubmit={handleLogin}>
                            <input
                            className='border-2 border-solid border-black rounded-lg px-2 h-12 my-4 w-full'
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            required
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <input
                            className='border-2 border-solid border-black rounded-lg h-12 px-2 my-4 w-full'
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            required
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />

                        <div className=' flex justify-center'>

                            <button className= 'bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg' type="submit">Login</button>
                        </div>

                        <div className="flex justify-around pb-2">
                            {Error1 && <p style={{ color: 'red' }} className="">{Error1}</p>}

                        </div>

                        </form>
                    </div>
                </div>



                </div>
                




                </div>


                <Footer />


            </div>
        </>
    );
}
