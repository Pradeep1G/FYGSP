// YourComponent.jsx
// YourComponent.jsx

import React from 'react';
// react icons
import { MdEventNote } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";
import { GrAchievement, GrScorecard } from "react-icons/gr";
import { GiAchievement } from "react-icons/gi";
import { SiGooglemeet } from "react-icons/si";
import { RiFeedbackLine } from "react-icons/ri";
import { TiPlusOutline } from "react-icons/ti";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StaffNormalNavbar from './StaffNormalNavbar';
import gu from 'date-fns/esm/locale/gu/index.js';
// small bar
export default function StudentProfileTemplate()
{
  


const serverPath1 = "http://127.0.0.1:5000"
// const serverPath1 = "https://fgspserver.onrender.com";
const { studentId } = useParams();
// console.warn(studentId)
const GuideName = localStorage.getItem("GuideName");
const GuideImage = localStorage.getItem("GuideImage");

const guideMailId = localStorage.getItem("GuideMailIdToLogin")
  const [StudentData, setStudentData] = useState({
    image:"",
    regNo:"",
    mailId:"",
    phoneNo:"",
    name:"",
    fullAddress:"",
    gender:"",
    fatherName:"",
    motherName:"",
    dob:"",
    nationality:"",
    religion:"",
    community:"",
    aadhar:""  
  });

  const getStudentData=async()=>{
    const data = {regNo:studentId,
      guideMail:guideMailId
    }
    const response = await axios.post(serverPath1+"/getStudentProfileData", data)
    // console.warn(response.data)
    setStudentData(response.data.StudentData)
  }

  useEffect(()=>{
    getStudentData();
  },[])

  
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



  return (
<>
    <StaffNormalNavbar GuideName={GuideName} GuideImage={GuideImage} />
    <div className='sm:flex '>
      <div className="p-4 sm:h-screen border-b-slate-50 border-2 m-2 lg:ml-6 bg-[#e9d8de] lg:max-w-xl rounded-md shadow-md relative" >
      <div className='w-full rounded-t-md bg-[#811338] h-20 absolute top-0 left-0 right-0'></div>
        {/* Large Box */}
        <div className="flex flex-col ">
          <div className="flex justify-center py-4 px-20">
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
        <div className="mb-10 text-center max-w-xs">
          <h2 className="text-2xl font-bold break-words" >{StudentData.name}</h2>
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
              <p className=" text-sm text-gray-600" style={{wordBreak: 'break-all' }}>{StudentData.mailId}</p>
          </div>
          <div className="flex flex-col p-0 text-left">
              <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Phone</p>
          </div>
          <div className="flex flex-col p-0 text-left">
              <p className="text-sm text-gray-600">{StudentData.phoneNo}</p>
          </div>
      </div>
        <div className="flex justify-center mt-4">
          <button className="bg-[#811338] text-white px-4 py-2 rounded-md">
            BACK
          </button>
        </div>
      </div>

      {/* Largest Table */}
      <div className='flex w-full justify-center items-center my-2 mx-0 '>
        <div className="flex-col  bg-[#edeef2] space-y-10 lg:space-y-28 border-b-slate-50 shadow-md rounded-lg border-2 m-2 ml-4 mr-4 w-full h-full ">
          {/* First Box */}
          <div className='w-full rounded-t-md bg-[#811338] h-20'>

          </div>


          <div className='flex bg-[#edeef2]  justify-center items-center'>

            <div>

              <div className=" p-4 rounded-md w-full">
                {/* Buttons arranged in 4 rows and 2 columns */}
                <div className="flex-col items-center justify-center space-y-8">
                  

                  <div className='flex items-center justify-center'>
                  <div className='lg:flex lg:w-full lg:justify-around w-fit items-center justify-center  lg:space-x-28 space-y-10 lg:space-y-0'>
                  <div className='md:bg-[#fadaf1]'>
                    <div className="flex justify-center  rounded-xl shadow-md items-center">
                      <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <IoPersonSharp className='text-4xl rounded-l-xl' /> </div>
                      <button className="bg-[#fadaf1] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Personal Information</button>
                    </div>
                    </div>
                    <div className='flex justify-center bg-[#c6edea] rounded-xl shadow-md items-center'>
                    <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <MdEventNote className='text-4xl rounded-l-xl' /> </div>
                      <button className="bg-[#c6edea] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Events</button>
                    </div>

                  </div>
                  </div>

                  <div className='flex items-center justify-center'>
                  <div className='lg:flex lg:w-full lg:justify-around w-fit items-center justify-center lg:space-x-28    space-y-10 lg:space-y-0'>
                  <div className='bg-[#dce7e1] '>
                    <div className="flex justify-center  rounded-xl shadow-md items-center">
                      <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <GiProgression className='text-4xl rounded-l-xl' /> </div>
                      <button className="bg-[#dce7e1]  text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Progress</button>
                    </div>
                    </div>
                    <div className='flex justify-center bg-[#c2d6fb]  rounded-xl shadow-md items-center'>
                    <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <RiFeedbackLine className='text-4xl rounded-l-xl' /> </div>
                      <button className="bg-[#c2d6fb]  text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Remarks</button>
                    </div>

                  </div>
                  </div>
                   <div className='flex items-center justify-center'>
                  <div className='lg:flex lg:w-full lg:justify-around w-fit items-center justify-center lg:space-x-28  space-y-10 lg:space-y-0'>
                  <div className='bg-[#f9afb0] '>
                    <div className="flex justify-center  rounded-xl shadow-md items-center">
                      <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <SiGooglemeet className='text-4xl rounded-l-xl' /> </div>
                      <button className="bg-[#f9afb0] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Mentor Meeting</button>
                    </div>
                    </div>
                    <div className='flex justify-center bg-[#b2e5bc] rounded-xl shadow-md items-center'>
                    <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <TiPlusOutline className='text-4xl rounded-l-xl' /> </div>
                      <button className="bg-[#b2e5bc] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Extra Credits</button>
                    </div>

                  </div>
                  </div>
                  <div className='flex items-center justify-center'>
                  <div className='lg:flex lg:w-full lg:justify-around w-fit items-center justify-center lg:space-x-28  space-y-10 lg:space-y-0'>
                  <div className='bg-[#c8e5f5] '>
                    <div className="flex justify-center  rounded-xl shadow-md items-center">
                      <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <GrScorecard className='text-4xl rounded-l-xl' /> </div>
                      <button className="bg-[#c8e5f5] text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Results</button>
                    </div>
                    </div>
                    <div className='flex justify-center bg-[#f8da80]  rounded-xl shadow-md items-center'>
                    <div className='bg-white pr-5 pl-4 lg:h-full py-5 rounded-l-3xl rounded-r-full flex justify-center items-center'> <GrAchievement className='text-4xl rounded-l-xl' /> </div>
                      <button className="bg-[#f8da80]  text-black px-5 pl-2 py-3 m-0 rounded-xl h-full  w-44 text-lg cursor-pointer">Acheivements</button>
                    </div>

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
  )

</>
)}