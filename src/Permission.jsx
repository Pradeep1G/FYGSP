import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import StaffNormalNavbar from './components/StaffNormalNavbar';

export default function Permission() {
  const [personalInfoPermission, setPersonalInfoPermission] = useState(false);
  const [resultsPermission, setResultsPermission] = useState(false);
  const [eventsPermission, setEventsPermission] = useState(false);
  const [creditsPermission, setCreditsPermission] = useState(false);

  const togglePermission = (permissionSetter) => {
    permissionSetter((prevState) => !prevState);
  };

  

    

  
  
  
  // const serverPath1 = "http://127.0.0.1:5000";


   const serverPath1 = "https://fgspserver.onrender.com";
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
    console.warn(response.data)
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
  
  const navigate = useNavigate();

  useEffect(()=>{
    const func = async() => {
      const regNo = studentId;
      const data = {
        "collection":"permissions",
        "regNo": regNo
    }
        const rsponse = await axios.post(serverPath1+"/permissionDetail", data)
        console.warn(rsponse.data)
    }
    func();
  },[])




  return (
<>  
    <StaffNormalNavbar GuideName={GuideName} GuideImage={GuideImage} />
    <div className='sm:flex '>
    <div className="p-4 sm:h-screen ml-2 mr-2 m-2 lg:ml-6  bg-[#e9d8de] mx-auto lg:w-96 rounded-md shadow-md relative" style={{ maxWidth: '600px' }}>
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
          <button className="bg-[#811338] text-white px-4 py-2 rounded-md" onClick={() => {
                    navigate(`/staffdashboard/studentprofile/${studentId}`);
                  }}>
            BACK
          </button>
        </div>
      </div>

        {/* Largest Table */}
        <div className='flex w-full justify-center items-center my-2 mx-0 overflow-hidden'>
          <div className="flex-col justify-centre bg-[#edeef2] space-y-3  shadow-md rounded-lg  m-2 ml-4 mr-4 w-full h-full overflow-y-scroll ">
            {/* First Box */}
            <div className='w-full rounded-t-md bg-[#811338] h-fit'>
          <h1 className="text-3xl text-white font-code mb-4 pt-8 md:pt-5 md:pb-4 pb-8 px-2">Permission</h1>
          </div>

          <div className="flex justify-center pt-8">
      <div className="w-2/3">
        <table className="table-auto border border-black">
          <thead>
          <tr className=" bg-[#811338]">
              <th className="px-4 py-2 w-full border border-black text-start text-white">Permission</th>
              <th className="px-4 py-2 border border-black"></th>
            </tr>
          </thead>
          <tbody>
          <tr className="bg-white">
              <td className="border border-black px-4 py-2">Permission to edit the personal info page</td>
              <td className="border border-black px-4 py-2">
                <label className="flex items-center">
                  <div
                    className={`h-5 w-10 rounded-full shadow-inner cursor-pointer relative ${
                      personalInfoPermission ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    onClick={() => togglePermission(setPersonalInfoPermission)}
                  >
                    <div
                      className={`h-5 w-5 bg-white rounded-full shadow-md absolute ${
                        personalInfoPermission ? 'left-5' : 'left-0'
                      }`}
                    >
                      <span className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold ${
                          personalInfoPermission ? 'text-green-500' : 'text-red-500'
                        }`}>
                        {personalInfoPermission ? 'On' : 'Off'}
                      </span>
                    </div>
                  </div>
                </label>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-black px-4 py-2">Permission to edit the results page</td>
              <td className="border border-black px-4 py-2">
                <label className="flex items-center">
                  <div
                    className={`h-5 w-10 rounded-full shadow-inner cursor-pointer relative ${
                      resultsPermission ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    onClick={() => togglePermission(setResultsPermission)}
                  >
                    <div
                      className={`h-5 w-5 bg-white rounded-full shadow-md absolute ${
                        resultsPermission ? 'left-5' : 'left-0'
                      }`}
                    >
                      <span className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold ${
                          resultsPermission ? 'text-green-500' : 'text-red-500'
                        }`}>
                        {resultsPermission ? 'On' : 'Off'}
                      </span>
                    </div>
                  </div>
                </label>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-black px-4 py-2">Permission to edit the events page</td>
              <td className="border border-black px-4 py-2">
                <label className="flex items-center">
                  <div
                    className={`h-5 w-10 rounded-full shadow-inner cursor-pointer relative ${
                      eventsPermission ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    onClick={() => togglePermission(setEventsPermission)}
                  >
                    <div
                      className={`h-5 w-5 bg-white rounded-full shadow-md absolute ${
                        eventsPermission ? 'left-5' : 'left-0'
                      }`}
                    >
                      <span className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold ${
                          eventsPermission ? 'text-green-500' : 'text-red-500'
                        }`}>
                        {eventsPermission ? 'On' : 'Off'}
                      </span>
                    </div>
                  </div>
                </label>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-black px-4 py-2">Permission to edit the additional credits page</td>
              <td className="border border-black px-4 py-2">
                <label className="flex items-center">
                  <div
                    className={`h-5 w-10 rounded-full shadow-inner cursor-pointer relative ${
                      creditsPermission ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    onClick={() => togglePermission(setCreditsPermission)}
                  >
                    <div
                      className={`h-5 w-5 bg-white rounded-full shadow-md absolute ${
                        creditsPermission ? 'left-5' : 'left-0'
                      }`}
                    >
                      <span className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold ${
                          creditsPermission ? 'text-green-500' : 'text-red-500'
                        }`}>
                        {creditsPermission ? 'On' : 'Off'}
                      </span>
                    </div>
                  </div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
          
          </div>
        </div>
        {/* Second Box */}
      </div>

     
    </>
  );
}
