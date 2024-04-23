// // import axios from "axios";
// // import { useEffect,useState } from "react";
// // import './Navbar.css'; 
// // import { FiMenu } from 'react-icons/fi'; // Assuming you want to use the Feather icon pack
// // import { useNavigate } from "react-router-dom";
// // import sistlogologin from './assets/sistlogologin.png';
// // import LoadingScreen from "./shared/Loader";
// // // import DisplayStudentDetails from "./DisplayStudentDetails";
// // // import Footer from "./shared/Footer";
// // import { format } from "date-fns";

// // export default function StudentDashboard()
// // {

// //     // const serverPath1 = "http://127.0.0.1:5000"
// //       const serverPath1 = "https://fgspserver.onrender.com"
    
// //     const [isLoading, setIsLoading] = useState();

// //     const StudentMailId = localStorage.getItem("StudentMailId");
// //     const [StudentData, setStudentData] = useState();
// //     const [img, setImg] = useState();
// //     const navigate = useNavigate();
// //     const [LatestMessage, setLatestMessage] = useState();
// //     const [OldMessages, setOldMessages] = useState();


// //     const [isSidebarOpen, setSidebarOpen] = useState(false);



// //     function getDirectLinkFromShareableLink(shareableLink) {
// //         try {
// //           const fileIdMatch = shareableLink.match(/\/file\/d\/(.*?)\//);
// //           if (fileIdMatch && fileIdMatch[1]) {
// //             const fileId = fileIdMatch[1];
// //             return `https://drive.google.com/uc?id=${fileId}`;
// //           } else {
// //             throw new Error("Invalid shareable link format");
// //           }
// //         } catch (error) {
// //           console.error("Error processing shareable link:", error.message);
// //           return null;
// //         }
// //       }










// //     const handleMenuClick = () => {
// //       setSidebarOpen(!isSidebarOpen);
// //     };
  
// //     const handleLogout = () => {
// //       // Implement your logout logic here
// //       console.log('Logout clicked!');
// //     };


// //     const getComments = async()=>{
// //     //   e.preventDefault();

// //      console.warn(StudentMailId)
// //      setIsLoading(true);


// //       try{

// //          const data = {
// //             "mailId" : StudentMailId,    
// //          }


// //       const response = await axios.post(serverPath1+"/getStudentData", data)
// //     //   console.warn(response.data);
// //       setIsLoading(false);
// //       if(response.data.message == "SUCCESS")
// //       {
// //         setStudentData(response.data.StudentData);
// //         setLatestMessage(response.data.LatestMessage);
// //         setOldMessages(response.data.OldMessages);
        
// //       }
// //       else{
// //       }
// //     }
// //     catch(error){
// //         navigate("/studentlogin")
// //     }
// //     }

// //     useEffect(()=>{

// //         if(!StudentMailId){
// //             navigate("/studentlogin")
// //         }

// //           // Function to close the sidebar initially
// //   const closeSidebar = () => {
// //     setSidebarOpen(false);
// //   };

// //   // Close the sidebar on component mount
// //   closeSidebar();

// //         getComments();
// //     },[]);




// //     // if(GuideMailId){

// //     return(


// //         <>
// //         {isLoading ? (
// //             <>
// //             <LoadingScreen />
// //             <nav className="flex items-center justify-between bg-[#9e1c3f] p-10 py-5">
// //                     <div className="flex items-center">
// //                     <a href="/">
// //                         <img
// //                         src={sistlogologin}
// //                         alt="Logo"
// //                         className="object-scale-down h-35 w-80 px-3 pt-3"
// //                         />
// //                     </a>
// //                     </div>
// //                     <div className={`lg:flex items-center space-x-10 text-white `}>
                    
// //                     </div>
// //                     <div className="flex items-center">
// //                     <button
// //                         onClick={handleMenuClick}
// //                         className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#9e1c3f] focus:ring-white"
// //                     >
// //                         <FiMenu size={36} />
// //                     </button>
// //                     </div>
// //             </nav>

// //             </>
// //             ) :
            

        
// //         (
// //             <div className='flex flex-col min-h-screen'>
        
// //         {/* <div className=""> */}


// //             <nav className="flex items-center justify-between bg-[#9e1c3f] p-10 py-5">
// //                     <div className="flex items-center">
// //                     <a href="/">
// //                         <img
// //                         src={sistlogologin}
// //                         alt="Logo"
// //                         className="object-scale-down h-35 w-80 px-3 pt-3"
// //                         />
// //                     </a>
// //                     </div>
// //                     <div className={`lg:flex items-center space-x-10 text-white `}>
                    
// //                     </div>
// //                     <div className="flex items-center">
// //                     <button
// //                         onClick={handleMenuClick}
// //                         className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#9e1c3f] focus:ring-white"
// //                     >
// //                         <FiMenu size={36} />
// //                     </button>
// //                     </div>
// //             </nav>



// //                 {StudentData && ( // Check if GuideDetails is not null or undefined
// //                 <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
// //                     <div className="sidebar-content pt-20">

// //                     <div className="w-40 h-40  overflow-hidden rounded-full">
// //                         {StudentData.image && <img 
// //                         src={getDirectLinkFromShareableLink(StudentData.image)} 
// //                         alt=""
// //                         className="" />}
// //                     </div>

// //                     <div className="pt-2 font-bold max-w-fit text-xl">
// //                         <p>{StudentData.name}</p>
// //                     </div>

// //                     <div className="pt-6 p text-base font-semibold">
// //                         <p>{StudentData.regNo}&nbsp;-&nbsp;{StudentData.section}</p>
// //                     </div>

// //                     <div className="pt-2 text-sm font-semibold">
// //                         <p>{StudentMailId}</p>
// //                     </div>

// //                     <div className="pt-2 text-sm font-semibold">
// //                         <p>{StudentData.phoneNo}</p>
// //                     </div>


// //                     <div className="pt-6 pb-10 text-sm font-semibold">
// //                         <p>Your Mentor : {StudentData.MentorName}</p>
// //                     </div>

                    

                    




// //                     <button
// //                     className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-sm"
// //                      onClick={()=>{
// //                         localStorage.removeItem("StudentMailId")
// //                         navigate("/")
// //                     }}>Logout</button>
// //                     </div>
// //                 </div>
// //                 )}
// //         {/* </div> */}



        

// //         <div className={`flex-grow justify-center   pt-24 pb-10 px-10  bg-red-50 md:blur-0 ${isSidebarOpen ? "blur-sm md:pr-96":""}`}>


// //         <div className="flex flex-col items-center w-full">
// //         <p className="flex justify-center pb-4 text-xl font-bold">Recent Message</p>


// //             <div className="flex flex-col bg-white max-w-5xl w-full rounded-lg p-5">

    
// //             {LatestMessage &&
// //                 Object.entries(LatestMessage).map(([date, message]) => (
// //                 <div key={date} className="text-lg font-semibold">

// //                         <div className="flex space-x-8"><p>Date</p> <p className="font-bold">:</p><p>{date.slice(0, 10)}</p> </div>
// //                         <div className="flex space-x-8"><p>Time</p> <p className="font-bold">:</p><p>{date.slice(11, 16)}</p> </div>
// //                         <div className="flex space-x-8 pt-4"><p>Message</p> <p className="font-bold">:</p><p>{message}</p> </div>
// //                 </div>
// //                 ))}

// //             {!LatestMessage && <p>There are no messages yet.</p>}
  
// //             </div>

// //             </div>




// //             <div className="flex flex-col items-center w-full pt-5">
// //             <p className="flex justify-center pb-2 text-xl font-bold">Past Messages</p>

// //                 {OldMessages &&
// //                 Object.entries(OldMessages).map(([index, messagesObject]) => (
// //                     <div key={index} className=" flex flex-col max-w-5xl w-full rounded-lg py-4">
// //                     <div className="text-lg font-semibold bg-white p-5 rounded-lg">
// //                     {Object.entries(messagesObject).map(([date, message]) => (
                        
// //                         <div key={date}>
// //                         <div className="flex space-x-8"><p>Date</p> <p className="font-bold">:</p><p>{date.slice(0, 10)}</p> </div>
// //                         <div className="flex space-x-8"><p>Time</p> <p className="font-bold">:</p><p>{date.slice(11, 16)}</p> </div>
// //                         <div className="flex space-x-8 pt-4"><p>Message</p> <p className="font-bold">:</p><p>{message}</p> </div>
// //                         </div>
// //                     ))}
// //                     </div>
// //                     </div>
// //                 ))}
// //             </div>

// //         </div>
// //         {/* <Footer /> */}
// //         </div>
// //         )}
// //         </>
// //     )
// //     // }
// //     // else{
// //     //     navigate("/stafflogin")
// //     // }
// // }



// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import StudentProfileTemplate from "./components/StudentProfileTemplate";

// export default function StudentDashboard() {
//     const serverPath1 = "http://127.0.0.1:5000";
//     // const serverPath1 = "https://fgspserver.onrender.com"
    
//     const [isLoading, setIsLoading] = useState(false);
//     const StudentMailId = localStorage.getItem("StudentMailId");
//     const [StudentData, setStudentData] = useState(null);
//     const navigate = useNavigate();

//     const getComments = async () => {
//         setIsLoading(true);
//         try {
//             const data = {
//                 mailId: StudentMailId,
//             };

//             const response = await axios.post(serverPath1 + "/getStudentData", data);
//             setIsLoading(false);
//             if (response.data.message === "SUCCESS") {
//                 setStudentData(response.data.StudentData);
//             } else {
//                 // Handle unsuccessful response
//             }
//         } catch (error) {
//             // Handle error
//             console.error("Error fetching student data:", error);
//             navigate("/studentlogin");
//         }
//     };

//     useEffect(() => {
//         if (!StudentMailId) {
//             navigate("/studentlogin");
//         } else {
//             getComments();
//         }
//     }, []);

//     return (
//         <div>
//             {StudentMailId ? (
//                 <StudentProfileTemplate userType="student" />
//             ) : (
//                 // Redirect to login page if StudentMailId is not available
//                 navigate("/studentlogin")
//             )}
//         </div>
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

export default function StudentLogin(){


    const [formData, setFormData] = useState({ email: '', password: '' });

    const serverPath1 = "http://127.0.0.1:5000"
      //const serverPath1 = "https://fgspserver.onrender.com"
    
    const [isLoading, setIsLoading] = useState();
    
    const navigate = useNavigate()
    const currentPath = location.pathname;

    const [Error1, setError1] = useState();

    const handleLogin=async(e)=>{
        setError1();
        e.preventDefault();
        console.warn("Im clicked");
        setIsLoading(true);
        
        const response = await axios.post(serverPath1+"/studentlogin/"+formData['email'], formData)
        console.warn(response.data);
        if(response.data.message=="Invalid Credentials" || response.data.message=="Account not found!")
        {
            setError1(response.data.message)
        }
        else
        {
            localStorage.setItem("StudentMailId",formData.email);
            navigate("/studentdashboard");
        }
        setIsLoading(false);
    }

    useEffect(()=>{
        if(localStorage.getItem("StudentMailId")){
            navigate("/studentdashboard");
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
                            <h1 className='p-4 font-bold text-3xl'>STUDENT LOGIN</h1>
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
