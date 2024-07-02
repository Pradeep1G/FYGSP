// // YourComponent.jsx
// // YourComponent.jsx

// import React from 'react';
// // react icons
// import { MdEventNote } from "react-icons/md";
// import { IoPersonSharp } from "react-icons/io5";
// import { GiProgression } from "react-icons/gi";
// import { GrAchievement, GrScorecard } from "react-icons/gr";
// import { GiAchievement } from "react-icons/gi";
// import { SiGooglemeet } from "react-icons/si";
// import { RiFeedbackLine } from "react-icons/ri";
// import { TiPlusOutline } from "react-icons/ti";
// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import StaffNormalNavbar from './StaffNormalNavbar';
// import gu from 'date-fns/esm/locale/gu/index.js';
// // small bar
// export default function StudentProfileTemplate()
// {
  


// // const serverPath1 = "http://127.0.0.1:5000"
// const serverPath1 = "https://fgspserver.onrender.com";
// const { studentId } = useParams();
// // console.warn(studentId)
// const GuideName = localStorage.getItem("GuideName");
// const GuideImage = localStorage.getItem("GuideImage");

// const guideMailId = localStorage.getItem("GuideMailIdToLogin")
//   const [StudentData, setStudentData] = useState({
//     image:"",
//     regNo:"",
//     mailId:"",
//     phoneNo:"",
//     name:"",
//     fullAddress:"",
//     gender:"",
//     fatherName:"",
//     motherName:"",
//     dob:"",
//     nationality:"",
//     religion:"",
//     community:"",
//     aadhar:""  
//   });

//   const getStudentData=async()=>{
//     const data = {regNo:studentId,
//       guideMail:guideMailId
//     }
//     const response = await axios.post(serverPath1+"/getStudentProfileData", data)
//     console.warn(response.data)
//     setStudentData(response.data.StudentData)
//   }

//   useEffect(()=>{
//     getStudentData();
//   },[])

  
//   function getDirectLinkFromShareableLink(shareableLink) {
//     try {
//       const fileIdMatch = shareableLink.match(/\/file\/d\/(.*?)\//);
//       if (fileIdMatch && fileIdMatch[1]) {
//         const fileId = fileIdMatch[1];
//         return `https://drive.google.com/thumbnail?id=${fileId}`;
//       } else {
//         throw new Error("Invalid shareable link format");
//       }
//     } catch (error) {
//       // console.error("Error processing shareable link:", error.message);
//       return null;
//     }
//   }



//   return (
// <>
//     <StaffNormalNavbar GuideName={GuideName} GuideImage={GuideImage} />
//     <div className='sm:flex '>
//       <div className="p-4 sm:h-screen border-b-slate-50 border-2 m-2 lg:ml-6 bg-[#e9d8de] lg:max-w-md rounded-md shadow-md relative" >
//       <div className='w-full rounded-t-md bg-[#811338] h-20 absolute top-0 left-0 right-0'></div>
//         {/* Large Box */}
//         <div className="flex flex-col ">
//           <div className="flex justify-center py-4 px-20">
//             <div className="rounded-full overflow-hidden h-20 w-20 flex-shrink-0 mr-4">
//               <img
//                 src={getDirectLinkFromShareableLink(StudentData.image)}
//                 alt="User Avatar"
//                 className="rounded-full border-2 absolute overflow-hidden h-20 w-20 flex-shrink-0 mr-4 object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Header Design */}
//         <div className="flex justify-center">
//         <div className="mb-10 text-center max-w-xs">
//           <h2 className="text-2xl font-bold break-words" >{StudentData.name}</h2>
//         </div>
//         </div>


//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex flex-col p-0 text-left ">
//               <p className="mb-4 text-sm font-semibold whitespace-nowrap" style={{ color: 'rgba(0,0,0)' }}>Register Number</p>
//               <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Section</p>
//           </div>
//           <div className="flex flex-col p-0 text-left">
//               <p className="mb-4 text-sm text-gray-600">{StudentData.regNo}</p>
//               <p className="text-sm text-gray-600" >E3</p>
//           </div>
//           <div className="flex flex-col text-left">
//               <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Email</p>
//           </div>
//           <div className="flex flex-col p-0 text-left">
//               <p className=" text-sm text-gray-600" style={{wordBreak: 'break-all' }}>{StudentData.mailId}</p>
//           </div>
//           <div className="flex flex-col p-0 text-left">
//               <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Phone</p>
//           </div>
//           <div className="flex flex-col p-0 text-left">
//               <p className="text-sm text-gray-600">{StudentData.phoneNo}</p>
//           </div>
//       </div>
//         <div className="flex justify-center mt-4">
//           <button className="bg-[#811338] text-white px-4 py-2 rounded-md">
//             BACK
//           </button>
//         </div>
//       </div>

//       {/* Largest Table */}
//       <div className='flex w-full justify-center items-center my-2 mx-0 '>
//         <div className="flex-col  bg-[#edeef2] space-y-10 lg:space-y-28 border-b-slate-50 shadow-md rounded-lg border-2 m-2 ml-4 mr-4 w-full h-full ">
//           {/* First Box */}
//           <div className='w-full rounded-t-md bg-[#811338] h-20'>

//           </div>


//           <div className='flex bg-[#edeef2]  justify-center items-center'>

//             <div>

//               <div className=" p-4 rounded-md w-full">
//                 {/* Buttons arranged in 4 rows and 2 columns */}
//                 <div className="flex-col items-center justify-center space-y-8">
                  

//                   <div className='flex items-center justify-center'>
//                   <div className='lg:flex lg:w-full lg:justify-around w-fit items-center justify-center  lg:space-x-28 space-y-10 lg:space-y-0'>
//                   <div className='md:bg-[#fadaf1]'>
//                     <div className="flex justify-center  rounded-xl shadow-md items-center">
//                       <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <IoPersonSharp className='text-4xl rounded-l-xl' /> </div>
//                       <button className="bg-[#fadaf1] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Personal Information</button>
//                     </div>
//                     </div>
//                     <div className='flex justify-center bg-[#c6edea] rounded-xl shadow-md items-center'>
//                     <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <MdEventNote className='text-4xl rounded-l-xl' /> </div>
//                       <button className="bg-[#c6edea] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Events</button>
//                     </div>

//                   </div>
//                   </div>

//                   <div className='flex items-center justify-center'>
//                   <div className='lg:flex lg:w-full lg:justify-around w-fit items-center justify-center lg:space-x-28    space-y-10 lg:space-y-0'>
//                   <div className='bg-[#dce7e1] '>
//                     <div className="flex justify-center  rounded-xl shadow-md items-center">
//                       <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <GiProgression className='text-4xl rounded-l-xl' /> </div>
//                       <button className="bg-[#dce7e1]  text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Progress</button>
//                     </div>
//                     </div>
//                     <div className='flex justify-center bg-[#c2d6fb]  rounded-xl shadow-md items-center'>
//                     <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <RiFeedbackLine className='text-4xl rounded-l-xl' /> </div>
//                       <button className="bg-[#c2d6fb]  text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Remarks</button>
//                     </div>

//                   </div>
//                   </div>
//                    <div className='flex items-center justify-center'>
//                   <div className='lg:flex lg:w-full lg:justify-around w-fit items-center justify-center lg:space-x-28  space-y-10 lg:space-y-0'>
//                   <div className='bg-[#f9afb0] '>
//                     <div className="flex justify-center  rounded-xl shadow-md items-center">
//                       <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <SiGooglemeet className='text-4xl rounded-l-xl' /> </div>
//                       <button className="bg-[#f9afb0] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Mentor Meeting</button>
//                     </div>
//                     </div>
//                     <div className='flex justify-center bg-[#b2e5bc] rounded-xl shadow-md items-center'>
//                     <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <TiPlusOutline className='text-4xl rounded-l-xl' /> </div>
//                       <button className="bg-[#b2e5bc] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Extra Credits</button>
//                     </div>

//                   </div>
//                   </div>
//                   <div className='flex items-center justify-center'>
//                   <div className='lg:flex lg:w-full lg:justify-around w-fit items-center justify-center lg:space-x-28  space-y-10 lg:space-y-0'>
//                   <div className='bg-[#c8e5f5] '>
//                     <div className="flex justify-center  rounded-xl shadow-md items-center">
//                       <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <GrScorecard className='text-4xl rounded-l-xl' /> </div>
//                       <button className="bg-[#c8e5f5] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Results</button>
//                     </div>
//                     </div>
//                     <div className='flex justify-center bg-[#f8da80]  rounded-xl shadow-md items-center'>
//                     <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <GrAchievement className='text-4xl rounded-l-xl' /> </div>
//                       <button className="bg-[#f8da80]  text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Acheivements</button>
//                     </div>

//                   </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           </div>
//           {/* Second Box */}
//         </div>
//     </div>
//   )

// </>
// )}



// YourComponent.jsx
// YourComponent.jsx

 // YourComponent.jsx
// YourComponent.jsx

import React from 'react';
import PersonalInfo from '../PersonalInfo';
// react icons
import { useNavigate } from 'react-router-dom';
import { MdEventNote } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";
import { GrAchievement, GrScorecard } from "react-icons/gr";
import { GiAchievement } from "react-icons/gi";
import { SiGooglemeet } from "react-icons/si";
import { RiFeedbackLine } from "react-icons/ri";
import { TiPlusOutline } from "react-icons/ti";
import { FaUnlockAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StaffNormalNavbar from '../NavBarComponents/StaffNormalNavbar';
import StudentNormalNavbar from '../NavBarComponents/StudentNormalNavbar';
import gu from 'date-fns/esm/locale/gu/index.js';
import { FaRegCalendarPlus } from "react-icons/fa";
import { RiMessageLine } from "react-icons/ri";

import '../App.css'
// small bar
export default function StudentProfileTemplate() {



  const serverPath1 = "http://127.0.0.1:5000"
  // const serverPath1 = "https://fgspserver.onrender.com";
  const { studentId } = useParams();

  // console.warn(studentId)
  const GuideName = localStorage.getItem("GuideName");
  const GuideImage = localStorage.getItem("GuideImage");
  const StudentImage = localStorage.getItem("StudentImage");
  const [userType, setUserType] = useState("");
  const [studentEventsCounts, setStudentEventsCounts] = useState({ attended_count: '', conducted_count: '' });
  const studentMailId = localStorage.getItem("StudentMailId")

  const guideMailId = localStorage.getItem("GuideMailIdToLogin")
  const [StudentData, setStudentData] = useState({
    image: "",
    regNo: "",
    mailId: "",
    phoneNo: "",
    name: "",
    fullAddress: "",
    gender: "",
    fatherName: "",
    motherName: "",
    dob: "",
    nationality: "",
    religion: "",
    community: "",
    aadhar: ""
  });

  const [isLoading, setIsLoading] = useState();


  const getStudentProfileData = async () => {
    const data = {
      regNo: studentId,
      guideMail: guideMailId
    }
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      navigate("/stafflogin");
      return;
    }
    try{
      setIsLoading(true);
    const response = await axios.post(serverPath1 + "/getStudentProfileData", data, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    console.warn(response.data)
    setStudentData(response.data.StudentData)
    console.warn('count --',response.data.StudentEventsCounts);
    setStudentData(response.data.StudentData);
    setStudentEventsCounts(response.data.StudentEventsCounts);
  }
  catch{
    
    setIsLoading(false);
    if (error.response && (error.response.status === 401 || error.response.status === 422)) {
      localStorage.removeItem("jwt_token");
      navigate("/stafflogin");
      return;
    } else {
      console.error("An error occurred:", error);
    }  }
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt_token");
    if (!token) {
      navigate("/stafflogin");
      return;
    }
      try {

        // Check for the presence of GuideMailIdToLogin in local storage to determine user type
        const guideMailId = localStorage.getItem("GuideMailIdToLogin");
        if (!guideMailId) {
          setUserType("student");

          const data = { mailId: studentMailId };
          const response = await axios.post(serverPath1 + "/getStudentData", data,
        { headers: { Authorization: `Bearer ${token}` } }
          );
          console.warn(response.data.StudentData);
          setStudentData(response.data.StudentData);
        } else {
          setUserType("staff");
          getStudentProfileData();
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        setIsLoading(false);
      if (error.response && (error.response.status === 401 || error.response.status === 422)) {
        localStorage.removeItem("jwt_token");
        navigate("/stafflogin");
        return;
      } else {
        console.error("An error occurred:", error);
      }
      }
    };

    fetchData();
  }, [studentId, studentMailId]);



  function getDirectLinkFromShareableLink(shareableLink) {
    try {
      const fileIdMatch = shareableLink.match(/\/file\/d\/(.*?)\//);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/thumbnail?id=${fileId}`;
      } else {
        throw new Error("Invalid shareable link format");
      }
    } catch (error) {
      // console.error("Error processing shareable link:", error.message);
      return null;
    }
  }

  const navigate = useNavigate();
  const buttonRoutes = {
    PersonalInfo: userType === 'staff' ? `/staffdashboard/studentprofile/${studentId}/PersonalInfo` : `/studentdashboard/studentMailId/PersonalInfo`,
    Events: userType === 'staff' ? `/staffdashboard/studentprofile/${studentId}/Events` : `/studentdashboard/studentMailId/Events`,
    Results: userType === 'staff' ? `/staffdashboard/studentprofile/${studentId}/ResultPage` : `/studentdashboard/studentMailId/ResultPage`,
    Remarks: userType === 'staff' ? `/staffdashboard/studentprofile/${studentId}/Remarks` : `/studentdashboard/studentMailId/Remarks`,
    MentorMeetings: userType === 'staff' ? `/staffdashboard/studentprofile/${studentId}/MentorMeetings` : `/studentdashboard/studentMailId/MentorMeetings`,
    ExtraCredits: userType === 'staff' ? `/staffdashboard/studentprofile/${studentId}/ExtraCredits` : `/studentdashboard/studentMailId/ExtraCredits`,
    StaffMessages: userType === 'staff' ? `/staffdashboard/studentprofile/${studentId}/Messages` : `/studentdashboard/studentMailId/Messages`,
    Permission: userType === 'staff' ? `/staffdashboard/studentprofile/${studentId}/Permission` : `/studentdashboard/studentMailId/Permission`,
  };

  const [hoveredButtons, setHoveredButtons] = useState({});

  const handleHover = (buttonId) => {
    setHoveredButtons((prevHoveredButtons) => ({
      ...prevHoveredButtons,
      [buttonId]: true,
    }));
  };

  const handleMouseLeave = (buttonId) => {
    setHoveredButtons((prevHoveredButtons) => ({
      ...prevHoveredButtons,
      [buttonId]: false,
    }));
  };

  return (
    <>
      {userType === 'staff' ? (
        <StaffNormalNavbar GuideName={GuideName} GuideImage={GuideImage} />
      ) : (
        <StudentNormalNavbar />
      )}
      <div className='sm:flex '>
      <div className="p-4 sm:h-screen ml-2 mr-2 m-2 lg:ml-6  bg-[#e9d8de] mx-auto lg:w-96 rounded-md shadow-md relative" style={{ maxWidth: '600px' }}>
          <div className='w-full rounded-t-md bg-[#811338] h-20 absolute top-0 left-0 right-0'></div>
          {/* Large Box */}
          <div className="flex flex-col " style={{ maxWidth: '600px' }}>
            <div className="flex justify-center py-4 px-20" >
              <div className="rounded-full overflow-hidden h-20 w-20 flex-shrink-0 mr-4">
                <img
                  src={getDirectLinkFromShareableLink(StudentData.image)}
                  alt="User Avatar"
                  className="rounded-full border-2 absolute overflow-hidden h-20 w-20 flex-shrink-0 mr-4 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Header Design */}
          <div className="flex justify-center">
            <div className="mb-10 text-center max-w-xs">
              <h2 className="text-2xl font-bold break-words" >{StudentData.name}</h2>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col p-0 text-left ">
              <p className="mb-4 text-sm font-semibold whitespace-nowrap" style={{ color: 'rgba(0,0,0)' }}>Register Number</p>
              <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Section</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="mb-4 text-sm text-gray-600">{StudentData.regNo}</p>
              <p className="text-sm text-gray-600" >E3</p>
            </div>
            <div className="flex flex-col text-left">
              <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Email</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className=" text-sm text-gray-600" style={{ wordBreak: 'break-all' }}>{StudentData.mailId}</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Phone</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm text-gray-600">{StudentData.phoneNo}</p>
            </div>

            <div className="flex flex-col p-0 text-left">
              <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Events attended</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm text-gray-600">{studentEventsCounts.attended_count}</p>
            </div>

            <div className="flex flex-col p-0 text-left">
              <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Events conducted</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm text-gray-600">{studentEventsCounts.conducted_count}</p>
            </div>
          </div>


          {/* <div className="flex flex-col p-0 text-left">
              <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Events attended:</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm text-gray-600">{studentEventsCounts.attended_count}</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Events conducted:</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm text-gray-600">{studentEventsCounts.conducted_count}</p>
            </div> */}



          <div className="flex justify-center mt-4">
            <div className="flex justify-center mt-4">
              <button
                className="bg-[#811338] text-white px-4 py-2 rounded-md ml-0 mr-2"
                onClick={() => {
                  if (userType === "staff") {
                    navigate("/staffdashboard");
                  }
                }}
              >
                BACK
              </button>
            </div>

            {userType === "student" && (
              <div className="flex justify-center mt-4">
                <button
                  className="bg-[#811338] text-white px-4 py-2 rounded-md ml-2"
                  onClick={() => {
                    localStorage.removeItem("StudentMailId");
                  //  navigate("/studentdashboard");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Largest Table */}
        <div className=' flex flex-grow w-full '>
    <div className='flex w-full flex-grow justify-center h-screen items-center  my-2 mr-0'>
    <div className="flex-col bg-[#edeef2] space-y-4  shadow-md rounded-lg m-2 ml-4 mr-4 w-full h-full overflow-y-scroll">

            {/* First Box */}
            <div className='w-full rounded-t-md bg-[#811338] h-20'>
              <h1 className="text-3xl text-white font-mono italic font-thin  mb-4 pt-8 pb-8 px-2"></h1>
            </div>

            <div className='flex bg-[#edeef2]  justify-center items-center'>

              <div>

                <div className=" p-4 rounded-md w-full">
                  {/* Buttons arranged in 4 rows and 2 columns */}
                  <div className="flex-col items-center justify-center space-y-8">


                    <div className='flex items-center justify-center'>
                      <div className='lg:flex lg:w-auto lg:justify-around w-fit items-center justify-center space-y-10 lg:space-y-0 custom-space'>

                        <div className='flex justify-center bg-[#fadaf1] rounded-xl shadow-md items-center'>
                          <div className='bg-white  pr-5 pl-4 lg:h-full py-6 rounded-l-3xl rounded-r-full flex justify-center items-center'> <IoPersonSharp className='text-4xl rounded-l-xl' /> </div>
                          <button
                            className="bg-[#fadaf1] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full w-44 text-lg cursor-pointer"
                            onMouseEnter={() => handleHover('personalInfo')}
                            onMouseLeave={() => handleMouseLeave('personalInfo')}
                            onClick={() => {
                              navigate(buttonRoutes.PersonalInfo)
                            }}
                          >
                            {hoveredButtons['personalInfo'] ? 'View Personal Info' : 'Personal Information'}
                          </button>

                        </div>

                        <div className='flex justify-center bg-[#c6edea] rounded-xl shadow-md items-center'>
                          <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <MdEventNote className='text-4xl rounded-l-xl' /> </div>
                          <button
                            className="bg-[#c6edea] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full w-44 text-lg cursor-pointer"
                            onMouseEnter={() => handleHover('events')}
                            onMouseLeave={() => handleMouseLeave('events')}
                            onClick={() => {
                              navigate(buttonRoutes.Events)
                            }} >
                            {hoveredButtons['events'] ? 'View Events' : 'Events'}
                          </button>

                        </div>

                      </div>
                    </div>

                    <div className='flex items-center justify-center'>
                      <div className='lg:flex lg:w-full lg:justify-around w-fit items-center justify-center custom-space    space-y-10 lg:space-y-0'>

                        <div className='flex justify-center bg-[#f8da80] rounded-xl shadow-md items-center'>
                          <div className='bg-white  pr-5 pl-4 lg:h-full py-6 rounded-l-3xl rounded-r-full flex justify-center items-center'> <GrScorecard className='text-4xl rounded-l-xl' /> </div>
                          <button
                            className="bg-[#f8da80] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full w-44 text-lg cursor-pointer"
                            onMouseEnter={() => handleHover('result')}
                            onMouseLeave={() => handleMouseLeave('result')}
                            onClick={() => {
                              navigate(buttonRoutes.Results)
                            }}                        >
                            {hoveredButtons['result'] ? 'View Results' : 'Results'}
                          </button>                        </div>


                        <div className='flex justify-center bg-[#c2d6fb]  rounded-xl shadow-md items-center'>
                          <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <RiFeedbackLine className='text-4xl rounded-l-xl' /> </div>
                          <button
                            className="bg-[#c2d6fb] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full w-44 text-lg cursor-pointer"
                            onMouseEnter={() => handleHover('remark')}
                            onMouseLeave={() => handleMouseLeave('remark')}
                            onClick={() => {
                              navigate(buttonRoutes.Remarks)
                            }}                        >
                            {hoveredButtons['remark'] ? 'View Remarks' : 'Remarks'}
                          </button>
                        </div>

                      </div>
                    </div>
                    <div className='flex items-center justify-center'>
                      <div className='lg:flex lg:w-full lg:justify-around w-fit items-center justify-center custom-space  space-y-10 lg:space-y-0'>

                        <div className='flex justify-center bg-[#f9afb0] rounded-xl shadow-md items-center'>
                          <div className='bg-white  pr-5 pl-4 lg:h-full py-6 rounded-l-3xl rounded-r-full flex justify-center items-center'> <SiGooglemeet className='text-4xl rounded-l-xl' /> </div>
                          <button
                            className="bg-[#f9afb0] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full w-44 text-lg cursor-pointer"
                            onMouseEnter={() => handleHover('meeting')}
                            onMouseLeave={() => handleMouseLeave('meeting')}
                            onClick={() => {
                              navigate(buttonRoutes.MentorMeetings)
                            }}                        >
                            {hoveredButtons['meeting'] ? 'View Meetings' : 'Mentor Meetings'}
                          </button>
                        </div>

                        <div className='flex justify-center bg-[#b2e5bc] rounded-xl shadow-md items-center'>
                          <div className='bg-white pr-5 pl-4 lg:h-full py-6 rounded-l-3xl rounded-r-full flex justify-center items-center'> <GrAchievement className='text-4xl rounded-l-xl' /> </div>
                          <button
                            className="bg-[#b2e5bc] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full w-44 text-lg cursor-pointer"
                            onMouseEnter={() => handleHover('credits')}
                            onMouseLeave={() => handleMouseLeave('credits')}
                            onClick={() => {
                              // navigate(buttonRoutes.ExtraCredits)
                            }}                        >
                            {hoveredButtons['credits'] ? 'View Credits' : 'Additional Credentials'}
                          </button>
                        </div>


                      </div>
                    </div>
                    <div className='flex items-center justify-center'>
                      <div className='lg:flex lg:w-full lg:justify-start w-fit items-start justify-start custom-space  space-y-10 lg:space-y-0'>

                        <div className='flex justify-start bg-[#E0CEFE] rounded-xl shadow-md items-center'>
                          <div className='bg-white  pr-5 pl-4 lg:h-full py-6 rounded-l-3xl rounded-r-full flex justify-center items-center'> <FaUnlockAlt className='text-4xl rounded-l-xl' /> </div>
                          <button
                            className="bg-[#E0CEFE] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full w-44 text-lg cursor-pointer"
                            onMouseEnter={() => handleHover('permission')}
                            onMouseLeave={() => handleMouseLeave('permission')}
                            onClick={() => {
                              navigate(buttonRoutes.Permission)
                            }}        >
                            {hoveredButtons['permission'] ? 'View Permissions' : 'Permissions'}
                          </button>
                        </div>



                        <div className='flex justify-center bg-[#FFF5E0] rounded-xl shadow-md items-center'>
                          <div className='bg-white pr-5 pl-4 lg:h-full py-6 rounded-l-3xl rounded-r-full flex justify-center items-center'> <RiMessageLine className='text-4xl rounded-l-xl' /> </div>
                          <button
                            className="bg-[#FFF5E0] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full w-44 text-lg cursor-pointer"
                            onMouseEnter={() => handleHover('StaffMessages')}
                            onMouseLeave={() => handleMouseLeave('StaffMessages')}
                            onClick={() => {
                              navigate(buttonRoutes.StaffMessages)
                            }}                        >
                            {hoveredButtons['StaffMessages'] ? 'Send Message' : 'Messages'}
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* Second Box */}
          </div>
        </div>
      </div>
      </div>


    </>
  )
}
