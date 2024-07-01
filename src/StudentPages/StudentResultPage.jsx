import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { RiArrowDropDownFill } from "react-icons/ri";
import StaffNormalNavbar from '../NavBarComponents/StaffNormalNavbar';

export default function StudentResultPage() {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [resultsDrpDwn, setResultsDrpDwn] = useState(false);
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const serverPath1 = "http://127.0.0.1:5000/";
  const { studentId } = useParams();
  const GuideName = localStorage.getItem("GuideName");
  const GuideImage = localStorage.getItem("GuideImage");
  const guideMailId = localStorage.getItem("GuideMailIdToLogin");

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
    let studentIdTest = '43110021';
    let guideMailIdTest = 'albert.cse@sathyabama.ac.in'
    const dataTest = { regNo: studentIdTest, guideMail:guideMailIdTest };
    // const data = { regNo: studentId, guideMail: guideMailId };
    const response = await axios.post(serverPath1 + "/getStudentProfileData", dataTest);
    setStudentData(response.data.StudentData);
  };

  useEffect(() => {
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
      return null;
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      let studentIdTest = '43110021';
      let guideMailIdTest = 'albert.cse@sathyabama.ac.in'
      const dataTest = { regNo: studentIdTest, guideMail:guideMailIdTest };
      const data = { regNo: studentId, guideMail: guideMailId };
      const response = await axios.post(serverPath1 + "/resultDetail", dataTest);
      setResults(response.data.results);
    };
    fetchResults();
  }, [studentId]);

  const handleSelectChange = (semester) => {
    setSelectedSemester(semester);
    setShowResults(true);
  };

  const handleDownloadFile = () => {
    if (!selectedSemester) {
      alert('Please select a semester');
      return;
    }
    const imageUrl = results[0][selectedSemester];
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = `${selectedSemester}.jpg`;
    downloadLink.target = '_blank';
    downloadLink.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !selectedSemester) {
      setError('All fields are required');
      return;
    }
    let studentIdTest = '43110021';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('regNo', studentIdTest);
    formData.append('semester', selectedSemester);

    try {
      const response = await axios.post('http://127.0.0.1:5000/student/insertSemResult', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        setSuccessMessage('File uploaded successfully!');
        setFile(null);
      } else {
        setError('Failed to upload file');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <StaffNormalNavbar GuideName={GuideName} GuideImage={GuideImage} />
      <div className='sm:flex '>
        <div className="p-4 sm:h-screen ml-2 mr-2 m-2 lg:ml-6 bg-[#e9d8de] mx-auto lg:w-96 rounded-md shadow-md relative" style={{ maxWidth: '600px' }}>
          <div className='w-full rounded-t-md bg-[#811338] h-20 absolute top-0 left-0 right-0'></div>
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
          <div className="flex justify-center">
            <div className="mb-10 text-center max-w-xs">
              <h2 className="text-2xl font-bold break-words">{StudentData.name}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col p-0 text-left ">
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
              navigate(`/staffdashboard/studentprofile/${studentId}`);
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
                    <button onClick={() => { setResultsDrpDwn(!resultsDrpDwn); }} className='text-white flex items-center justify-center bg-[#811338]' style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', boxShadow: 'inset 0px 2px 2px -2px rgba(0, 0, 0, 0.5)' }}>
                      <h1 className="text-center lg:mr-20 lg:ml-20 ml-10 mr-10 px-1 py-2">Select Semester</h1>
                      <RiArrowDropDownFill className="relative lg:left-0 lg:ml-0 lg:right-0 right-0 left-0 ml-0" size={30} />
                    </button>
                    {resultsDrpDwn &&
                      <div className="bg-[#ffffff] px-2 border border-[#811338]" style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', boxShadow: 'inset 0px -2px 2px -2px rgba(0, 0, 0, 0.5)' }}>
                        {['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'].map((sem) => (
                          <button
                            key={sem}
                            className='lg:w-72 w-full'
                            style={{ padding: '0.5rem', border: 'none', background: 'none' }}
                            onClick={() => { handleSelectChange(sem); setResultsDrpDwn(!resultsDrpDwn); }}
                          >
                            {sem.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    }
                  </div>
                  {showResults && (
                    <div className="flex flex-col px-4 mt-4">
                      {results[0] && results[0][selectedSemester] ? (
                        <>
                          <button
                            onClick={handleDownloadFile}
                            className="bg-[#811338] text-white px-4 py-2 rounded-md"
                          >
                            Download {selectedSemester.toUpperCase()} Result
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="mb-4">
                            <input type="file" onChange={handleFileChange} />
                          </div>
                          <button onClick={handleUpload} className="bg-[#811338] text-white px-4 py-2 rounded-md">
                            Upload Result for {selectedSemester.toUpperCase()}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  {successMessage && <p className="text-green-500">{successMessage}</p>}
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
