
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { RiArrowDropDownFill } from "react-icons/ri";
import StaffNormalNavbar from '../NavBarComponents/StaffNormalNavbar';
import LoadingScreen from '../shared/Loader';


export default function StaffResultPage() {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [resultsDrpDwn, setResultsDrpDwn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const GuideName = localStorage.getItem("GuideName");
  const GuideImage = localStorage.getItem("GuideImage");

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

  const { studentId } = useParams();
  const guideMailId = localStorage.getItem("GuideMailIdToLogin");

//  const serverPath1 = "http://127.0.0.1:5000";
   const serverPath1 = "https://fgspserver.onrender.com";


  const getStudentData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      navigate("/stafflogin");
      return;
    }

    try {
      const data = {
        regNo: studentId,
        guideMail: guideMailId
      };
      const response = await axios.post(`${serverPath1}/getStudentProfileData`, data,
        {headers: { Authorization: `Bearer ${token}` }}

      );
      setStudentData(response.data.StudentData);
    } catch (error) {
      console.error("Error fetching student data:", error);
      console.error('Error:', error);
      if (error.response && (error.response.status === 401 || error.response.status === 422)) {
        localStorage.removeItem("jwt_token");
        navigate("/stafflogin");
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);

  const getDirectLinkFromShareableLink = (shareableLink) => {
    try {
      const fileIdMatch = shareableLink.match(/\/file\/d\/(.*?)\//);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/thumbnail?id=${fileId}`;
      } else {
        throw new Error("Invalid shareable link format");
      }
    } catch (error) {
      console.error("Error processing shareable link:", error.message);
      return null;
    }
  };

  const handleDownloadFile = () => {
    if (!selectedSemester) {
      alert('Please select a semester');
      return;
    }
    const imageUrl = results[0][selectedSemester];
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = `${selectedSemester}.pdf`;
    downloadLink.target = '_blank';
    downloadLink.click();
  };

  const handleSelectChange = (semester) => {
    setSelectedSemester(semester);
    setShowResults(true);
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = {
          collection: "results",
          regNo: studentId
        };
        setIsLoading(true);
        const response = await axios.post(`${serverPath1}/resultDetail`, data);
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
      setIsLoading(false);
    };
    fetchResults();
  }, [studentId]);

  const navigate = useNavigate();

  return (
    <>
      {isLoading && <LoadingScreen />} {/* Placeholder for a loading screen component */}
      <StaffNormalNavbar GuideName={GuideName} GuideImage={GuideImage} />
      <div className='sm:flex'>
        <div className="p-4 sm:h-screen ml-2 mr-2 m-2 lg:ml-6 bg-[#e9d8de] mx-auto lg:w-96 rounded-md shadow-md relative" style={{ maxWidth: '600px' }}>
          {/* Student Information */}
          <div className='w-full rounded-t-md bg-[#811338] h-20 absolute top-0 left-0 right-0'></div>
          <div className="flex flex-col">
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
              <h2 className="text-2xl font-bold break-words">{StudentData.name}</h2>
            </div>
          </div>
  
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col p-0 text-left">
              <p className="mb-4 text-sm font-semibold whitespace-nowrap" style={{ color: 'rgba(0,0,0)' }}>Register Number</p>
              <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Section</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="mb-4 text-sm text-gray-600">{StudentData.regNo}</p>
              <p className="text-sm text-gray-600">E3</p>
            </div>
            <div className="flex flex-col text-left">
              <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Email</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm text-gray-600" style={{ wordBreak: 'break-all' }}>{StudentData.mailId}</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Phone</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm text-gray-600">{StudentData.phoneNo}</p>
            </div>
          </div>
          <div className="flex justify-center mt-4">
          <button className="bg-[#811338] text-white px-4 py-2 rounded-md" onClick={() => {
  setIsLoading(true);
  navigate(`/staffdashboard/studentprofile/${studentId}`);
  setTimeout(() => {
    setIsLoading(false);
  }, 1000); // Adjust the timeout duration as needed
}}>
  BACK
</button>
          </div>
        </div>
  
        <div className='flex w-full flex-grow justify-center h-screen items-center my-2 mr-0'>
          <div className="flex-col bg-[#edeef2] space-y-4 shadow-md rounded-lg m-2 ml-4 mr-4 w-full h-full overflow-y-scroll">
            <div className='w-full rounded-t-md bg-[#811338] h-auto lg:h-20 md:h-20'>
              <h1 className="text-3xl text-white font-code mb-4 pt-8 md:pt-5 md:pb-4 pb-8 px-2">Results Page</h1>
            </div>
  
            <div className='flex bg-[#edeef2] justify-center items-center'>
              <div className="flex flex-col py-2 px-2 w-full">
                <div className="flex-col space-y-2 flex-grow">
                  <div className='h-full rounded-xl lg:px-4 px-2'>
                    <h1 className="text-lg rounded-md font-bold shadow-md h-12 justify-items-center mb-4 mt-4 bg-[#EFBDBD] px-2 py-2" style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>Semester Results</h1>
                  </div>
  
                  <div className="flex flex-col w-fit justify-start px-4">
                    <button
                      onClick={() => setResultsDrpDwn(!resultsDrpDwn)}
                      className='text-white px-4 w-200 flex items-center justify-center bg-[#811338]'
                      style={{ borderRadius: '10px', width: '200px' }} // Fixed width style added here
                    >
                      Select Semester<RiArrowDropDownFill size={40} />
                    </button>
                    <div className={`${resultsDrpDwn ? "" : "hidden"} relative`} style={{ paddingLeft: '5px', paddingRight: '5px', width: '200px' }}>
                      <div className='flex flex-col bg-red-400 rounded-lg justify-center' style={{ boxShadow: '0px 0px 6px -3px rgba(0.5,0.5,0.5, 0)' }}>
                        {["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"].map((semester) => (
                          <button
                            key={semester}
                            onClick={() => { handleSelectChange(semester); setResultsDrpDwn(false); }}
                            className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'
                            style={{ width: '100%', boxSizing: 'border-box' }} // Full width for dropdown items
                          >
                            {semester}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
  
                  {selectedSemester && (
                    <div className="flex justify-center mt-4">
                      <h2 className="text-lg font-semibold text-gray-800">{selectedSemester} Results</h2>
                    </div>
                  )}
  
                  {selectedSemester && showResults && results[0] && results[0][selectedSemester] ? (
                    <div className="flex justify-center items-center mt-4">
                      <div className="p-4 border-black border w-7/12 h-3/4">
                        {/* Placeholder for displaying PDF or image */}
                        <div
                          // src={results[0][selectedSemester]}
                          // src={getDirectLinkFromShareableLink(results[0][selectedSemester])}     
  
                          alt="Semester Results"
                          className="rounded-md shadow-lg"
                          style={{ width: '100%', height: '100%' }}
                        />
                        <p>{StudentData.regNo}-{StudentData.name}-{selectedSemester}.pdf</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center mt-4">
                      {selectedSemester && <p>No results available for {selectedSemester}.</p>}
                    </div>
                  )}
  
                  {selectedSemester && showResults && results[0][selectedSemester] && (
                    <div className="flex justify-center mt-4">
                      <button
                        className="flex justify-center items-center bg-[#811338] w-1/4 text-white px-4 py-2 rounded-md mt-0"
                        onClick={handleDownloadFile}
                      >
                        Download
                      </button>
                    </div>
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
