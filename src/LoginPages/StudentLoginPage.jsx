import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../shared/Loader';
import Loginnavbar from "../shared/Loginnavbar";
import Footer from "../shared/Footer";
import studentLoginGif from '../assets/student.mp4';  // Assuming you have a similar GIF for student login
import loginprofile from '../assets/studentprof.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function StudentLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    //const serverPath1 = "http://127.0.0.1:5000";
     const serverPath1 = "https://fgspserver.onrender.com"
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        setError(null);
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await axios.post(`${serverPath1}/studentlogin/${formData.email}`, formData);
            if (response.data.message === "Invalid Credentials" || response.data.message === "Account not found!") {
                toast.error(response.data.message);
            } else {
                localStorage.setItem("StudentMailId", formData.email);
                localStorage.setItem("jwt_token_student", response.data.access_token_student);
                navigate("/studentdashboard");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("jwt_token_student")) {
            navigate("/studentdashboard");
        }
    }, []);

    return (
        <>
            {isLoading && <LoadingScreen />}
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                    <Loginnavbar />
                    <div className="loginbg md:px-0 px-10">
                        <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
                            <div className='w-full rounded-l-lg h-[560px] hidden md:block px-8 pt-6 pb-4 bg-[#fefefe] md:bg-opacity-90 bg-opacity-70  backdrop-filter'>
                            <video
                                    className='w-full h-full object-cover '
                                    src={studentLoginGif}
                                    autoPlay
                                    loop
                                    muted
                                />
                            </div>
                            <div className='p-4 pl-10 pr-10 flex flex-col justify-around bg-white md:bg-opacity-80 bg-opacity-70  backdrop-filter rounded-r-lg shadow-lg'>
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
                                    <div className='flex justify-center'>
                                        <h2 className='text-3xl font-bold text-center mb-8'>STUDENT LOGIN</h2>
                                    </div>
                                    <div className="relative h-11 w-full min-w-[200px] mb-4">
                                        <input
                                            className="peer h-full w-full border-b-2 border-black bg-transparent rounded-md pl-2 pt-4 pb-1.5 text-sm font-bold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-900 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                            type="email"
                                            placeholder='Email'
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                        <label
                                            className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-bold leading-tight text-gray-900 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-4 after:border-red-000 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-900 peer-focus:after:scale-x-100 peer-focus:after:border-red-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Email
                                        </label>
                                    </div>
                                    <div className="relative h-11 w-full min-w-[200px] mb-4">
                                        <input
                                            className="peer h-full w-full border-b-2 border-black bg-transparent rounded-md pl-2 pt-4 pb-1.5 text-sm font-bold text-blue-gray-900 outline outline-0 transition-all placeholder-shown:border-blue-gray-700 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-900 placeholder:opacity-0 focus:placeholder:opacity-100"
                                            type="password"
                                            placeholder='Password'
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                        <label
                                            className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-bold leading-tight text-gray-900 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-4 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-900 peer-focus:after:scale-x-100 peer-focus:after:border-red-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Password
                                        </label>
                                    </div>
                                    <div className="flex justify-between">
                                        <button className='w-full py-2 my-4 bg-red-900 text-white rounded-md text-lg hover:bg-red-800' type="submit">Login</button>
                                    </div>
                                    <p className='text-center text-red-500'>{error}</p>
                                     {/* <p className='text-right text-blue-500 cursor-pointer' onClick={() => navigate("/forgotpassword")}>Forgot Password?</p> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <div className="sm:w-3/4 sm:mx-4">  <ToastContainer
  position="top-center"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  
/></div>

        </>
    );
}
