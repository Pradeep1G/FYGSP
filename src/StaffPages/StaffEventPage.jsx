import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EventCard from '../CardComponents/EventCard';
import { useEffect } from 'react';
import {RiArrowDropDownFill} from "react-icons/ri";

import StaffNormalNavbar from '../NavBarComponents/StaffNormalNavbar';
import LoadingScreen from '../shared/Loader';
export default function Events() {
  const [eventsconducted,setEventsConducted] = useState(0);
  const [eventsattended,setEventsAttended] = useState(0);
  const [selectedSemesterAttended, setselectedSemesterAttended] = useState('');
  const [selectedSemesterConducted, setselectedSemesterConducted] = useState('');
  const [EventsCoordinatedDropdownOpen, setEventsCoordinatedDropdownOpen] = useState(false);
  const [EventsCoordinateddrpDwn, setdrpDwnEventsCoordinated] = useState(false);
  const [EventsAttendedDropdownOpen, setEventsAttendedDropdownOpen] = useState(false);
  const [EventsAttendeddrpDwn, setdrpDwnEventsAttended] = useState(false);
  
  const [OpenEventsConducted, setOpenEventsConducted] = useState(false);
  const [OpenEventsAttended, setOpenEventsAttended] = useState(false);


  
  const handleSelectChange = (event) => {
    setselectedSemesterAttended(event.target.value);
    setOpenEventsConducted(true)
  };                                                        

  const OpenEventsConductedCoordinatedSemBtn = () => {
    if (EventsCoordinatedDropdownOpen) {
      setselectedSemesterConducted(''); // Reset selectedSemesterAttended when closing the dropdown
    }
    setEventsCoordinatedDropdownOpen(!EventsCoordinatedDropdownOpen);
  };
 const OpenEventsConductedAttendedSemBtn = () => {
  if (EventsAttendedDropdownOpen) {
    setselectedSemesterAttended(''); // Reset selectedSemesterAttended when closing the dropdown
  }
  setEventsAttendedDropdownOpen(!EventsAttendedDropdownOpen);
};


  const handleSelectButtonClick = () => {
    if (selectedSemesterAttended) {
      EventCard(true);
    } else {
      alert('Please select a semester');
    }
  };

 // const serverPath1 = "http://127.0.0.1:5000";

const serverPath1 = "https://fgspserver.onrender.com";
const { studentId } = useParams();
// console.warn(studentId)
const GuideName = localStorage.getItem("GuideName");
const GuideImage = localStorage.getItem("GuideImage");
const [isLoading, setIsLoading] = useState();

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

  const getStudentData = async () => {
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
    // console.warn('count --',response.data.StudentEventsCounts);
    // setStudentData(response.data.StudentData);
    // setStudentEventsCounts(response.data.StudentEventsCounts);
  }
  catch(error){
    
    setIsLoading(false);
    if (error.response && (error.response.status === 401 || error.response.status === 422)) {
      localStorage.removeItem("jwt_token");
      navigate("/stafflogin");
      return;
    } else {
      console.error("An error occurred:", error);
    }  }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async (sdata) => { // Define data as a parameter
        const response = await axios.post(serverPath1+"/eventsData", sdata);
        console.warn(response.data);
        console.warn(response.data.eventsconducted);
        console.warn(response.data.eventsattended);
        
        // setEvents(response.data.events);
        setEventsConducted(response.data.eventsconducted);
        setEventsAttended(response.data.eventsattended);
    };

    const regNo = studentId; // Set the regNo value here
    const sdata = {
        "collection": "events",
        "regNo": regNo  
    };
    console.log("Request data:", sdata); // Log the data object before sending the request

    fetchData(sdata); // Pass data as an argument to the fetchData function
    getStudentData();
}, []);

  
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


  return (
    <>
    {isLoading && <LoadingScreen/>}
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

    {/*Right container*/}
    <div className=' flex flex-grow w-full '>
    <div className='flex w-full flex-grow justify-center h-screen items-center  my-2 mr-0'>
        <div className="flex-col bg-[#edeef2] space-y-4  shadow-md rounded-lg m-2 ml-4 mr-4 w-full h-full overflow-y-scroll">
            <div className='w-full rounded-t-md bg-[#811338] h-auto lg:h-20 md:h-20'>
              <h1 className="text-3xl text-white font-code mb-4 pt-8 md:pt-5 md:pb-4 pb-8 px-2">Events</h1>
          </div>
          <div className='bg-[#edeef2]'>
          <div className='flex bg-[#edeef2] justify-center items-center'>
            <div className="flex flex-col py-2 px-2 w-full">
              <div className='w-full mt-0 bg-[#EFBDBD] py-2 px-4 rounded-md shad relative' style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' , marginTop: '-2px' }}>
                <div className='text-lg font-semibold text-gray-800 flex justify-between ' ><p className='flex justify-start mt-1'>Events Coordinated</p> <div className='flex justify-end shadow-md' onClick={OpenEventsConductedCoordinatedSemBtn}> <RiArrowDropDownFill  size={40}/></div></div>
                </div>
                {/* {EventsCoordinatedDropdownOpen && ( */}
                    {/* <div className="absolute top-full left-0 flex flex-row items-center w-1/4  rounded-2xl mt-4" > */}
          
                    
                    <div className={`${EventsCoordinatedDropdownOpen ? "" : "hidden"} flex flex-col w-fit justify-start relative`}>
  <button onClick={() => { setdrpDwnEventsCoordinated(!EventsCoordinateddrpDwn); }} className='text-white flex items-center justify-center bg-[#811338] ' style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px' }}>Select Semester<RiArrowDropDownFill size={40} /></button>
  <div className={`${EventsCoordinateddrpDwn ? "" : "hidden"} relative`} style={{ paddingLeft: '5px', paddingRight: '5px', width: '200px' }}>
  <div className='flex flex-col bg-red-400 rounded-md justify-center ' style={{ boxShadow: '0px 0px 6px -3px rgba(0.5,0.5,0.5, 0)' }}>
    <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester1"); setdrpDwnEventsCoordinated(false); }} value="semester 1" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 1</button>
    <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester2"); setdrpDwnEventsCoordinated(false); }} value="semester 2" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 2</button>
    <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester3"); setdrpDwnEventsCoordinated(false); }} value="semester 3" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 3</button>
    <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester4"); setdrpDwnEventsCoordinated(false); }} value="semester 4" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 4</button>
    <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester5"); setdrpDwnEventsCoordinated(false); }} value="semester 5" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 5</button>
    <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester6"); setdrpDwnEventsCoordinated(false); }} value="semester 6" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 6</button>
    <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester7"); setdrpDwnEventsCoordinated(false); }} value="semester 7" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 7</button>
    <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester8"); setdrpDwnEventsCoordinated(false); }} value="semester 8" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 8</button>
  </div>
</div>
<div style={{ paddingLeft: '5px', paddingRight: '5px',display: 'flex', flexDirection: 'column-reverse'}}>
<button
  onClick={() => { 
    setOpenEventsConducted(true); 
    setselectedSemesterConducted("semester9"); 
    setdrpDwnEventsCoordinated(false); 
  }}
  value="semester 9"
  className='p-0 ml-0 px-0 bg-pink-200 mb-0 mt-0 text-left pl-2  shadow-2xl'
  disabled
  style={{
    width: '190px',
    height: '10px', 
    paddingTop: '0px',// Set the height of the button
    borderBottomLeftRadius: '100px',
    borderBottomRightRadius: '100px'
  }}
>    
<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#811338] border w-2 h-1 rounded-full" style={{ borderColor: 'white' }}></div>
</button>
</div>


</div>

               {/* <Dropdown
        EventsCoordinatedDropdownOpen={EventsCoordinatedDropdownOpen}
        setdrpDwnEventsCoordinated={setdrpDwnEventsCoordinated}
        setOpenEventsConducted={setEventsCoordinatedDropdownOpen}
        setselectedSemesterConducted={setselectedSemesterConducted}
      /> */}

           
              {selectedSemesterConducted && (
  <div className="mt-2">
    <h2 className="text-lg font-semibold text-gray-800 ">
      Events Conducted in {selectedSemesterConducted} :
    </h2>
    {/* <EventCard selectedSemesterAttended={selectedSemesterAttended} /> */}
  </div>
)}
      
      <div className={`${OpenEventsConducted && selectedSemesterConducted ? "" : "hidden"}`}>
                
              {OpenEventsConducted && eventsconducted[selectedSemesterConducted]?.some(event => Object.values(event).some(value => typeof value === "string" && value.trim() !== "")) ? (
              <div>
                {eventsconducted[selectedSemesterConducted]?.map((event, index) => (
                  !Object.values(event).every(value => typeof value === "string" && value.trim() === "") && (
                    <EventCard
                      key={index}
                      eventName={event.eventName}
                      eventType={event.eventType}
                      eventSummary={event.eventSummary}
                      bfileURL={event.fileURL}
                      bfileName={event.fileName}
                      brouchureURL={event.brouchureURL}
                      fileURL={event.fileURL}
                      fileName={event.fileName}
                      certificateURL={event.certificateURL}
                    />
                  )
                ))}
              </div>
            ) : (
              <p className="text-black font-bold text-center mt-2">No data available</p>
            )}
          </div>
       
        </div>
           
          
            
        </div>
        <div className='flex bg-[#edeef2] justify-center items-center'>
            <div className="flex flex-col py-2 px-2 w-full">
              <div className='w-full mt-4 bg-[#EFBDBD] py-2 px-4 rounded-md shad relative' style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)'  }}>
                <div className='text-lg font-semibold text-gray-800 flex justify-between ' ><p className='flex justify-start'>Events Attended</p> <div className='flex justify-end shadow-md' onClick={OpenEventsConductedAttendedSemBtn}> <RiArrowDropDownFill  size={40}/></div></div>
                </div>
                {/* {EventsCoordinatedDropdownOpen && ( */}
                    {/* <div className="absolute top-full left-0 flex flex-row items-center w-1/4  rounded-2xl mt-4" > */}
                    <div className={`${EventsAttendedDropdownOpen ? "" : "hidden"} flex flex-col w-fit justify-start relative`}>
  <button onClick={() => { setdrpDwnEventsAttended(!EventsAttendeddrpDwn); }} className='text-white flex items-center justify-center bg-[#811338] ' style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px' }}>Select Semester<RiArrowDropDownFill size={40} /></button>
  <div className={`${EventsAttendeddrpDwn ? "" : "hidden"} relative`} style={{ paddingLeft: '5px', paddingRight: '5px', width: '200px' }}>
  <div className='flex flex-col bg-red-400 rounded-md justify-center ' style={{ boxShadow: '0px 0px 6px -3px rgba(0.5,0.5,0.5, 0)' }}>
          <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterAttended("semester1"); setdrpDwnEventsAttended(false); }} value="semester 1" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 1</button>
          <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterAttended("semester2"); setdrpDwnEventsAttended(false); }} value="semester 2" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 2</button>
          <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterAttended("semester3"); setdrpDwnEventsAttended(false); }} value="semester 3" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 3</button>
          <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterAttended("semester4"); setdrpDwnEventsAttended(false); }} value="semester 4" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 4</button>
          <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterAttended("semester5"); setdrpDwnEventsAttended(false); }} value="semester 5" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 5</button>
          <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterAttended("semester6"); setdrpDwnEventsAttended(false); }} value="semester 6" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 6</button>
          <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterAttended("semester7"); setdrpDwnEventsAttended(false); }} value="semester 7" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 7</button>
          <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterAttended("semester8"); setdrpDwnEventsAttended(false); }} value="semester 8" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 8</button>
          </div>
</div>
<div style={{ paddingLeft: '5px', paddingRight: '5px',display: 'flex', flexDirection: 'column-reverse'}}>
<button
  onClick={() => { 
    setOpenEventsAttended(true); 
    setselectedSemesterAttended("semester9"); 
    setdrpDwnEventsAttended(false); 
  }}
  value="semester 9"
  className='p-0 ml-0 px-0 bg-pink-200 mb-0 mt-0 text-left pl-2  shadow-2xl'
  disabled
  style={{
    width: '190px',
    height: '10px', 
    paddingTop: '0px',// Set the height of the button
    borderBottomLeftRadius: '100px',
    borderBottomRightRadius: '100px'
  }}
>    
<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#811338] border w-2 h-1 rounded-full" style={{ borderColor: 'white' }}></div>
</button>
</div>


</div>

    {selectedSemesterAttended && (
  <div className="mt-2">
    <h2 className="text-lg font-semibold text-gray-800 ">
      Events Attended in {selectedSemesterAttended} :
    </h2>
  </div>
)}

<div className={`${OpenEventsAttended&& selectedSemesterAttended ? "" : "hidden"}`}>
    
{OpenEventsAttended && eventsattended[selectedSemesterAttended]?.some(event => Object.values(event).some(value => typeof value === "string" && value.trim() !== "")) ? (
              <div>
                {eventsattended[selectedSemesterAttended]?.map((event, index) => (
                  !Object.values(event).every(value => typeof value === "string" && value.trim() === "") && (
                    <EventCard
                      key={index}
                      eventName={event.eventName}
                      eventType={event.eventType}
                      eventSummary={event.eventSummary}
                      bfileURL={event.fileURL}
                      bfileName={event.fileName}
                      brouchureURL={event.brouchureURL}
                      fileURL={event.fileURL}
                      fileName={event.fileName}
                      certificateURL={event.certificateURL}
                    />
                  )
                ))}
              </div>
            ) : (
              <p className="text-black font-bold text-center mt-2">No data available</p>
            )}
          </div>
       
        </div>
           
          
            
        </div>
        
      </div>












      

      
    </div>
    </div>
    </div>
    </div>
    </>
  );
}
