import React, { useState } from 'react';
import ActivityCard from '../CardComponents/ActivityCard';
import AchievementCard from '../CardComponents/AchievementCard';
import { RiArrowDropDownFill } from "react-icons/ri";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import StaffDashboardNavbar from '../NavBarComponents/StaffDashboardNavbar';
import { useEffect } from 'react';
export default function Events() {
  const [cocurricular, setCoCurricular] = useState(0);
  const [curricular, setCurricular] = useState(0);
  const [ach, setAch] = useState(0);
  const [ex, setEx] = useState(0);
  const [selectedSemesterConducted, setselectedSemesterConducted] = useState('');
  const [selectedSemesterCurricular, setselectedSemesterCurricular] = useState('');
  const [CoCurricularDropdownOpen, setCoCurricularDropdownOpen] = useState(false);
  const [CoCurriculardrpDwn, setdrpDwnCoCurricular] = useState(false);
  const [CurricularDropdownOpen, setCurricularDropdownOpen] = useState(false);
  const [CurriculardrpDwn, setdrpDwnCurricular] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const serverPath1 = "https://fgspserver.onrender.com";
  const { studentId } = useParams();
  // console.warn(studentId)
  const GuideName = localStorage.getItem("GuideName");
  const GuideImage = localStorage.getItem("GuideImage");

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

  const getStudentData = async () => {
    const data = {
      regNo: studentId,
      guideMail: guideMailId
    }
    const response = await axios.post(serverPath1 + "/getStudentProfileData", data)
    console.warn(response.data)
    setStudentData(response.data.StudentData)
  }

  useEffect(() => {
    const fetchData = async (sdata) => { // Define data as a parameter
      const response = await axios.post(serverPath1+"/additionalCredDetail", sdata);
      console.warn(response.data);
      console.warn(response.data.cocurricular);
      console.warn(response.data.curricular);
      console.warn(response.data.achievements);
      console.warn(response.data.extracredits);

      // setEvents(response.data.events);
      setCoCurricular(response.data.cocurricular);
      setCurricular(response.data.curricular);
      setAch(response.data.achievements);
      setEx(response.data.extracredits);
    };

    const regNo = studentId; // Set the regNo value here
    const sdata = {
      "collection": "additionalCred",
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

  const handleSelectChange = (event) => {
    setselectedSemesterCurricular(event.target.value);
    setOpenEventsConducted(true)
  };

  const OpenEventsConductedCoordinatedSemBtn = () => {
    if (CoCurricularDropdownOpen) {
      setselectedSemesterConducted(''); // Reset selectedSemesterAttended when closing the dropdown
    }
    setCoCurricularDropdownOpen(!CoCurricularDropdownOpen);
  };
  const OpenEventsConductedAttendedSemBtn = () => {
    if (CurricularDropdownOpen) {
      setselectedSemesterCurricular(''); // Reset selectedSemesterAttended when closing the dropdown
    }
    setCurricularDropdownOpen(!CurricularDropdownOpen);
  };

  const navigate = useNavigate()
  const handleViewBack = () => {
    navigate(`/staffdashboard/StudentProfile/${studentId}`);
  }


  const handleSelectButtonClick = () => {
    if (selectedSemesterCurricular) {
      EventCards(true);
    } else {
      alert('Please select a semester');
    }
  };

  const handleDropdownClick = () => {
    setShowCards(!showCards);
  };

  const handleDropdownClickAdditional = () => {
    setShowTable(!showTable)
  };




  const [OpenEventsConducted, setOpenEventsConducted] = useState(false);
  const [OpenEventsAttended, setOpenEventsAttended] = useState(false);



  return (
    <>
      <StaffDashboardNavbar GuideName={GuideName} GuideImage={GuideImage} />
      <div className='sm:flex'>
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
              <p className=" text-sm text-gray-600" style={{ wordBreak: 'break-all' }}>{StudentData.mailId}</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Phone</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm text-gray-600">{StudentData.phoneNo}</p>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="bg-[#811338] text-white px-4 py-2 rounded-md" onClick={handleViewBack}>
              BACK
            </button>
          </div>
        </div>
        {/*Right container*/}
        <div className='w-full'>
          <div className='flex w-full h-full justify-center items-center lg:h-screen overflow-y-scroll my-2 mx-0 '>
            <div className="flex-col bg-[#edeef2] space-y-3 border-b-slate-50 shadow-md rounded-lg border-2 m-2 ml-4 mr-4 w-full h-full">
              <div className='w-full rounded-t-md bg-[#811338] h-20'>
                <h1 className="text-3xl text-white font-mono italic font-thin  mb-4 pt-8 pb-8 px-2">Extra Credits </h1>
              </div>
              <div className='flex bg-[#edeef2] justify-center items-center'>
                <div className="flex flex-col py-2 px-2 w-full">
                  <div className='w-full mt-4 bg-[#EFBDBD] py-2 px-4 rounded-md shad relative' style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>
                    <div className='text-lg font-semibold text-gray-800 flex justify-between ' ><p className='flex justify-start mt-1'>Additional Credentials</p> <div className='flex justify-end shadow-md' onClick={handleDropdownClickAdditional}> <RiArrowDropDownFill size={40} /></div></div>
                  </div>
                  {showTable && (
                    <table className="w-full my-4 border-collapse border border-gray-400 shadow-lg whitespace-normal text-center border-opacity-100 border-none">
                      <thead>
                        <tr className='bg-[#811338]'>
                          <th className="p-0 rounded-tl-2xl text-white">S.no</th>
                          <th className="p-2 text-white">Organization Name</th>
                          <th className="p-2 text-white">Course Name</th>
                          <th className="p-2 text-white">Year of Study</th>
                          <th className="p-2 text-white">Duration</th>
                          <th className="p-2 text-white rounded-tr-xl">Certificate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ex.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'rounded-lg' : 'bg-[#f9afb0] rounded-lg'}>
                            <td><p className="px-5 py-2 lg:max-w-md lg:break-all">{index + 1}</p></td>
                            <td><p className="px-5 py-2 lg:max-w-md lg:break-all">{item.orgName}</p></td>
                            <td><p className="px-5 py-2 lg:max-w-md lg:break-all">{item.courseName}</p></td>
                            <td><p className="px-5 py-2 lg:max-w-md lg:break-all">{item.year}</p></td>
                            <td><p className="px-5 py-2 lg:max-w-md lg:break-all">{item.duration}</p></td>
                            <td><p className="px-5 py-2 lg:max-w-md lg:break-all">{item.certificate}</p></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

              </div>

              <div className='flex bg-[#edeef2] justify-center items-center'>
                <div className="flex flex-col py-2 px-2 w-full">
                  <div className='w-full mt-0 bg-[#EFBDBD] py-2 px-4 rounded-md shad relative' style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>
                    <div className='text-lg font-semibold text-gray-800 flex justify-between ' ><p className='flex justify-start mt-1'>Co-Curricular Activities</p> <div className='flex justify-end shadow-md' onClick={OpenEventsConductedCoordinatedSemBtn}> <RiArrowDropDownFill size={40} /></div></div>
                  </div>
                  {/* {CoCurricularDropdownOpen && ( */}
                  {/* <div className="absolute top-full left-0 flex flex-row items-center w-1/4  rounded-2xl mt-4" > */}

                  <div className={`${CoCurricularDropdownOpen ? "" : "hidden"} 'flex flex-col w-fit  justify-start `}>
                    <button onClick={() => { setdrpDwnCoCurricular(!CoCurriculardrpDwn); }} className='text-white shadow-md rounded-lg border bg-[#811338] border-gray-300 flex items-center justify-center'>Select Semester<RiArrowDropDownFill size={40} /></button>
                    <div className={` ${CoCurriculardrpDwn ? " " : "hidden"}`}>

                      <div className='flex flex-col rounded-lg shadow-lg border border-gray-300 mt-1' >
                        <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester1"); setdrpDwnCoCurricular(false) }} value="semester 1" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 1</button>
                        <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester2"); setdrpDwnCoCurricular(false) }} value="semester 2" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 2</button>
                        <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester3"); setdrpDwnCoCurricular(false) }} value="semester 3" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 3</button>
                        <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester4"); setdrpDwnCoCurricular(false) }} value="semester 4" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 4</button>
                        <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester5"); setdrpDwnCoCurricular(false) }} value="semester 5" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 5</button>
                        <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester6"); setdrpDwnCoCurricular(false) }} value="semester 6" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 6</button>
                        <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester7"); setdrpDwnCoCurricular(false) }} value="semester 7" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 7</button>
                        <button onClick={() => { setOpenEventsConducted(true); setselectedSemesterConducted("semester8"); setdrpDwnCoCurricular(false) }} value="semester 8" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 8</button>


                      </div>
                    </div>

                  </div>


                  {selectedSemesterConducted&& (
                    <div className="mt-2">
                      <h2 className="text-lg font-semibold text-gray-800 ">
                        CoCurricular Activities in {selectedSemesterConducted} :
                      </h2>
                    </div>
                  )}

                  <div className={`${OpenEventsConducted ? "" : "hidden"} `}>
                    {cocurricular[selectedSemesterConducted] && cocurricular[selectedSemesterConducted].map((event, index) => (
                      <ActivityCard
                        key={index}
                        activityName={event.activityName}
                        activityType={event.activityType}
                        ifOther={event.ifOther}
                        bfileURL={event.fileURL}
                        bfileName={event.fileName}
                        brouchureURL={event.brouchureURL}
                        fileURL={event.fileURL}
                        fileName={event.fileName}
                        certificateURL={event.certificateURL}
                      />
                    ))}

                  </div>
                </div>
              </div>
              <div className='flex bg-[#edeef2] justify-center items-center'>
                <div className="flex flex-col py-2 px-2 w-full">
                  <div className='w-full mt-0 bg-[#EFBDBD] py-2 px-4 rounded-md shad relative' style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>
                    <div className='text-lg font-semibold text-gray-800 flex justify-between ' ><p className='flex justify-start mt-1'>Curricular Activities</p> <div className='flex justify-end shadow-md' onClick={OpenEventsConductedAttendedSemBtn}> <RiArrowDropDownFill size={40} /></div></div>
                  </div>

                  <div className={`${CurricularDropdownOpen ? "" : "hidden"} 'flex flex-col w-fit  justify-start `}>
                    <button onClick={() => { setdrpDwnCurricular(!CurriculardrpDwn); }} className='text-white flex items-center justify-center bg-[#811338] border- border-2 rounded-md'>Select Semester<RiArrowDropDownFill size={40} /></button>
                    <div className={` ${CurriculardrpDwn ? " " : "hidden"}`}>

                      <div className='flex flex-col shadow-md rounded-lg border border-gray-300' >
                        <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterCurricular("semester1"); setdrpDwnCurricular(false) }} value="semester 1" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 1</button>
                        <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterCurricular("semester2"); setdrpDwnCurricular(false) }} value="semester 2" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 2</button>
                        <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterCurricular("semester3"); setdrpDwnCurricular(false) }} value="semester 3" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 3</button>
                        <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterCurricular("semester4"); setdrpDwnCurricular(false) }} value="semester 4" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 4</button>
                        <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterCurricular("semester5"); setdrpDwnCurricular(false) }} value="semester 5" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 5</button>
                        <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterCurricular("semester6"); setdrpDwnCurricular(false) }} value="semester 6" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 6</button>
                        <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterCurricular("semester7"); setdrpDwnCurricular(false) }} value="semester 7" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 7</button>
                        <button onClick={() => { setOpenEventsAttended(true); setselectedSemesterCurricular("semester8"); setdrpDwnCurricular(false) }} value="semester 8" className='p-0 ml-0 px-0 bg-white hover:bg-gray-400 mb-0 mt-0 text-left pl-2'> semester 8</button>


                      </div>
                    </div>

                  </div>
                  {selectedSemesterCurricular&& (
                    <div className="mt-2">
                      <h2 className="text-lg font-semibold text-gray-800 ">
                        Curricular Activities in {selectedSemesterCurricular} :
                      </h2>
                    </div>
                  )}

                  <div className={`${OpenEventsAttended ? "" : "hidden"} `}>
                    {curricular[selectedSemesterCurricular] && curricular[selectedSemesterCurricular].map((event, index) => (
                      <ActivityCard
                        key={index}
                        activityName={event.activityName}
                        activityType={event.activityType}
                        ifOther={event.ifOther}
                        bfileURL={event.fileURL}
                        bfileName={event.fileName}
                        brouchureURL={event.brouchureURL}
                        fileURL={event.fileURL}
                        fileName={event.fileName}
                        certificateURL={event.certificateURL}
                      />
                    ))}

                  </div>
                </div>



              </div>
              <div className='flex bg-[#edeef2] justify-center items-center'>
                <div className="flex flex-col py-2 px-2 w-full">
                  <div className='w-full mt-0 bg-[#EFBDBD] py-2 px-4 rounded-md shad relative' style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>
                    <div className='text-lg font-semibold text-gray-800 flex justify-between ' ><p className='flex justify-start mt-1'>Achievements</p> <div className='flex justify-end shadow-md' onClick={handleDropdownClick}> <RiArrowDropDownFill size={40} /></div></div>
                  </div>
                  {showCards && ach.map((event,index) => (
                    <AchievementCard
                       key = {index}
                       typeOfAch = {event.typeOfAch}
                       description = {event.description}
                       />
                  )


    )}
  </div>
</div>


            </div>



          </div>

        </div>
      </div>

    </>
  );
}