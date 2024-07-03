import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EventCard from '../CardComponents/EventCard';
import { useEffect } from 'react';
import {RiArrowDropDownFill} from "react-icons/ri";
import LoadingScreen from '../shared/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffNormalNavbar from '../NavBarComponents/StaffNormalNavbar';
import StudentNormalNavbar from '../NavBarComponents/StudentNormalNavbar';
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
  const [isLoading, setIsLoading] = useState(false);


  const [dropdownOpen, setDropdownOpen] = useState({
    conducted: false,
    attended: false,
  });
  const [newEvent, setNewEvent] = useState({
    eventName: '',
    eventType: '',
    eventSummary: '',
    brouchure: null,
    certificate: null,
    semester: '',
    conductedOrAttended: 'events_conducted',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  
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

  const serverPath1 = "http://127.0.0.1:5000";
// const serverPath1 = "https://fgspserver.onrender.com";
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


  const studentMailId = localStorage.getItem("StudentMailId")
  const studentId = localStorage.getItem("regNo")


  const getStudentData = async () => {
    const data = {
      mailId: studentMailId,
      // guideMail: guideMailId
    }
    const token = localStorage.getItem("jwt_token_student");
  if (!token) {
    navigate("/studentlogin");
    return;
  }
  setIsLoading(true);
    try{const response = await axios.post(serverPath1 + "/StudentMenuPage/getLeftSideBarData", data, { headers: { Authorization: `Bearer ${token}` }})
    console.warn(response.data)
    setStudentData((prev)=>response.data.StudentData)
    localStorage.setItem("regNo",response.data.StudentData.regNo)}
    catch(error){
      if (error.response && (error.response.status === 401 || error.response.status === 422)) {
        localStorage.removeItem("jwt_token_student");
        navigate("/studentlogin");
        return;
      } else {
        console.error("An error occurred:", error);
      }
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const data = {regNo:studentId,
      mailId :studentMailId
    }
    const fetchData = async (data) => { // Define data as a parameter
        const response = await axios.post(serverPath1+"/eventsData", data);
        console.warn(response.data);
        console.warn(response.data.eventsconducted);
        console.warn(response.data.eventsattended);
        
        // setEvents(response.data.events);
        setEventsConducted(response.data.eventsconducted);
        setEventsAttended(response.data.eventsattended);
    };
    fetchData(data); // Pass data as an argument to the fetchData function
    getStudentData();
}, []);




const handleAddEvent = async (e) => {
  e.preventDefault();
  if(errorMessages.brouchure || errorMessages.certificate )
    {
      return;
    }
  const endpoint = newEvent.conductedOrAttended === 'conducted' ? 'addConductedEvent' : 'addAttendedEvent';
  const formData = new FormData();
  formData.append('eventName', newEvent.eventName);
  formData.append('eventType', newEvent.eventType);
  formData.append('eventSummary', newEvent.eventSummary);
  formData.append('brouchure', newEvent.brouchure);
  formData.append('certificate', newEvent.certificate);
  formData.append('semester', newEvent.semester);
  formData.append('conductedOrAttended', newEvent.conductedOrAttended);
  formData.append('studentName',StudentData.name)

  const token = localStorage.getItem("jwt_token_student");
  if (!token) {
    navigate("/studentlogin");
    return;
  }

  try {
    const regNo = localStorage.getItem("regNo");
    setIsLoading(true);
    const response = await axios.post(`${serverPath1}/studentdashboard/${regNo}/AddEvents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}` 
      },
      
  });
    if (response.data.success) {
      // const updatedEvents = { ...eventsConducted };
      toast.success("Events data added successfully!");
      setIsFormOpen(false);
      // if (newEvent.conductedOrAttended === 'events_conducted') {
      //   // updatedEvents[newEvent.semester] = [...(updatedEvents[newEvent.semester] || []), newEvent];
      //   setEventsConducted(updatedEvents);
      // } else {
      //   // const updatedAttendedEvents = { ...eventsAttended };
      //   // updatedAttendedEvents[newEvent.semester] = [...(updatedAttendedEvents[newEvent.semester] || []), newEvent];
      //   setEventsAttended(updatedAttendedEvents);
      // }
      // setNewEvent({
      //   eventName: '',
      //   eventType: '',
      //   eventSummary: '',
      //   brouchure: null,
      //   certificate: null,
      //   semester: '',
      //   conductedOrAttended: newEvent.conductedOrAttended,
      // });
      
    }
    
  } 
 
  
  
  catch (error) {
    console.error("Error adding event:", error);
    toast.error("Error adding Event");

   

  }
  finally{
    setIsLoading(false);
  }
};



  
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




  const toggleDropdown = (type) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };


    const [CAisOpen, CAsetIsOpen] = useState(false);
    const [CAselectedOption, CAsetSelectedOption] = useState('');
    const [showOtherInput, setShowOtherInput] = useState(false);
  
    const CAoptions = [
      { value: 'events_conducted', label: 'Coordinated' },
      { value: 'events_attended', label: 'Attended' },
    ];
  
    const CAhandleSelect = (option) => {
      CAsetSelectedOption(option.value);
      setNewEvent((prev) => ({
        ...prev,
        conductedOrAttended: option.value
      }));
      CAsetIsOpen(false);
    };

    
    const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'webinar', label: 'Webinar' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'hackathons', label: 'Hackathons' },
    { value: 'tech_talks', label: 'Tech Talks' },
    { value: 'paper_presentation', label: 'Paper Presentation' },
    { value: 'conference', label: 'Conference' },
    { value: 'symposium', label: 'Symposium' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'other', label: 'Other' },
  ];

  
  const handleSelect = (option) => {
    if (option.value === 'other') {
      setNewEvent({ ...newEvent, eventType: option.label });
      setShowOtherInput(true);
      setIsOpen(false); // Close the dropdown on selection
    } else {
      setNewEvent({ ...newEvent, eventType: option.label });
      setShowOtherInput(false);
      setIsOpen(false); // Close the dropdown on selection
    }
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, otherDetails: e.target.value });
  };
  const handleSemesterSelect = (semester, type) => {
    setSelectedSemester(semester);
    toggleDropdown(type);
  };



  const [errorMessages, setErrorMessages] = useState({
    brouchure: '',
    certificate: ''
  });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    const maxSize = 100 * 1024; // 100 KB

    if (file && file.size > maxSize) {
      setErrorMessages(prev => ({ ...prev, [type]: 'File size greater than 100KB' }));
      setNewEvent(prev => ({ ...prev, [type]: null }));
    } else {
      setErrorMessages(prev => ({ ...prev, [type]: '' }));
      setNewEvent(prev => ({ ...prev, [type]: file }));
    }
  };

  return (
    <>
    {isLoading && <LoadingScreen/>}
     <StudentNormalNavbar />
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
                  navigate(`/studentdashboard`);                  }}>
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












          
              {/* Add Event Section */}
              <div className="text-center flex flex-col items-center">
                <button
                  className="bg-[#811338] text-white font-semibold py-2 px-4 rounded my-2 mx-2 mb-6"
                  onClick={() => setIsFormOpen(!isFormOpen)}
                >
                  Add New Event
                </button>
                {isFormOpen && (
  <form onSubmit={handleAddEvent} className="bg-white shadow-lg rounded-lg px-6 pt-6 pb-10 mb-8 w-full max-w-md mx-auto">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Event Details</h2>
    
    <div className="mb-4">
      <label className="block text-blue-800 text-md font-semibold mb-1 text-left" htmlFor="eventName">
        Event Name
      </label>
      <input
        id="eventName"
        type="text"
        value={newEvent.eventName}
        onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
        className="w-full px-3 py-2 border-b-2 border-gray-400 focus:outline-none focus:border-gray-500"
        placeholder="Enter event name"
      />
    </div>
    
    <div className="mb-4">
      <label className="block text-blue-800 text-md font-semibold mb-2 text-left" htmlFor="eventType">
        Event Type
      </label>
      <div className="relative">
        <div
          className="cursor-pointer appearance-none w-full px-3 py-2 border-b-2 border-gray-400 rounded-lg focus:outline-none focus:border-gray-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{newEvent.eventType || 'Select event type'}</span>
          <svg
            className={`h-4 w-4 ${isOpen ? 'transform rotate-180' : ''} text-gray-500 transition-transform`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        {isOpen && (
          <div className="absolute mt-3 w-full max-h-40 overflow-y-auto bg-white shadow-lg rounded-lg py-1 text-left border border-gray-300 z-10">
            {options.map((option) => (
              <div
                key={option.value}
                className="cursor-pointer px-4 py-2 hover:bg-red-50 hover:rounded-md hover:mx-2"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {showOtherInput && (
        <div className="mt-4">
          <label className="block text-blue-800 text-md font-semibold mb-1 text-left" htmlFor="otherDetails">
            If others, please specify
          </label>
          <input
            id="otherDetails"
            type="text"
            value={newEvent.otherDetails}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border-b-2 border-gray-400 focus:outline-none focus:border-gray-500"
            placeholder="Specify event type"
          />
        </div>
      )}
    </div>
    
    {/*<div className="mb-4">
      <label className="block text-blue-800 text-md font-semibold mb-2" htmlFor="eventSummary">
        Event Summary
      </label>
      <textarea
        id="eventSummary"
        value={newEvent.eventSummary}
        onChange={(e) => setNewEvent({ ...newEvent, eventSummary: e.target.value })}
        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-gray-500"
        placeholder="Enter event summary"
        rows="4"
      />
    </div>*/}
    
    <div className="mb-4">
      <label className="block text-blue-800 text-md font-semibold mb-1 text-left" htmlFor="semester">
        Semester
      </label>
      <input
        id="semester"
        type="number"
        value={newEvent.semester}
        onChange={(e) => setNewEvent({ ...newEvent, semester: e.target.value })}
        className="w-full px-3 py-2 border-b-2 border-gray-400 focus:outline-none focus:border-gray-500"
        placeholder="Enter semester"
      />
    </div>
    
    <div className="mb-4 relative">
      <label className="block text-blue-800 text-md font-semibold mb-2 text-left" htmlFor="conductedOrAttended">
        Coordinated or Attended
      </label>
      <div className="relative">
        <div
          className="cursor-pointer appearance-none w-full px-3 py-2 border-b-2 border-gray-400 rounded-lg focus:outline-none focus:border-gray-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex justify-between items-center"
          onClick={() => CAsetIsOpen(!CAisOpen)}
        >
          <span>{CAselectedOption ? CAoptions.find(opt => opt.value === CAselectedOption)?.label : 'Select an option'}</span>
          <svg
            className={`h-4 w-4 ${CAisOpen ? 'transform rotate-180' : ''} text-gray-500 transition-transform`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        {CAisOpen && (
          <div className="absolute mt-1  w-full border border-gray-200 bg-white shadow-lg rounded-lg py-1 text-left ">
            {CAoptions.map((option) => (
              <div
                key={option.value}
                className="cursor-pointer px-4 py-2 hover:bg-red-50 hover:rounded-md hover:mx-2"
                onClick={() => CAhandleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>




    <div className="mb-4">
        <label className="block text-blue-800 text-md font-semibold mb-2 text-left" htmlFor="brouchure">
          Brochure
        </label>
        <div className="flex items-center justify-between border-2 border-gray-400 rounded-lg p-2">
          <input
            id="brouchure"
            type="file"
            onChange={(e) => handleFileChange(e, 'brouchure')}
            className="w-full px-3 py-2 border-none focus:outline-none"
          />
        </div>
        {errorMessages.brouchure && <p style={{ color: 'red' }}>{errorMessages.brouchure}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-blue-800 text-md font-semibold mb-2 text-left" htmlFor="certificate">
          Certificate
        </label>
        <div className="flex items-center justify-between border-2 border-gray-400 rounded-lg p-2">
          <input
            id="certificate"
            type="file"
            onChange={(e) => handleFileChange(e, 'certificate')}
            className="w-full px-3 py-2 border-none focus:outline-none"
          />
        </div>
        {errorMessages.certificate && <p style={{ color: 'red' }}>{errorMessages.certificate}</p>}
      </div>

    
    
    
    <div className="flex items-center justify-center">
      <button
        type="submit"
        className="bg-[#6694b4] hover:bg-[#5589ae] text-black font-semibold py-3 px-6 rounded-lg"
      >
        Submit
      </button>
    </div>
  </form>
)}

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
