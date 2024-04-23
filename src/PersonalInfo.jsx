// YourComponent.jsx
// YourComponent.jsx

import React from 'react';
import { RiArrowDropDownFill } from "react-icons/ri";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StaffNormalNavbar from './components/StaffNormalNavbar';
import StudentNormalNavbar from './components/StudentNormalNavbar';
import TextareaAutosize from 'react-textarea-autosize';


function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function capitalizeString(string) {
  // Capitalize the entire string
  return string.toUpperCase();
}

function capitalizeEachWord(string) {
  // Check if the input is a string
  if (typeof string !== 'string') {
    return '';
  }

  // Check if the input contains a comma
  if (string.includes(',')) {
    // Split the string into individual words using commas
    const words = string.split(',');
    // Capitalize each word
    const capitalizedWords = words.map(word => capitalizeFirstLetter(word.trim()));
    // Join the capitalized words back together with commas
    return capitalizedWords.join(', ');
  } else {
    // Split the string into individual words using spaces
    const words = string.split(/\s+/); // Updated to split on one or more spaces
    // Capitalize each word
    const capitalizedWords = words.map(word => capitalizeFirstLetter(word.trim()));
    // Join the capitalized words back together with spaces
    return capitalizedWords.join(' ');
  }
}

function capitalizeWord(array) {
  // Check if the input is an array
  if (!Array.isArray(array)) {
    return [];
  }

  // Capitalize each word in the array
  const capitalizedWords = array.map(word => capitalizeFirstLetter(word));

  return capitalizedWords;
}

function isValidPhoneNumber(input) {
  const digitsOnly = input.replace(/\D/g, '');
  return digitsOnly.length === 10;
}

export default function PersonalInfo() {
  const [personaldetails, setPersonalDetails] = useState({
    name: '',
    regNo: '',
    section: '',
    bloodGrp: '',
    community: '',
    dep: '',
    languages: [],
    lifeGoal: '',
    religion: ''
  });
  const [parentdetails, setParentDetails] = useState({
    fatherName: '',
    fatherMail: '',
    fatherNo: '',
    fatherOcc: '',
    motherName: '',
    motherMail: '',
    motherNo: '',
    motherOcc: '',
    guardianName: '',
    guardianMail: '',
    guardianNo: '',
    guardianOcc: ''

  });
  const [address, setAddress] = useState({
    permanentAdd: '',
    communicationAdd: '',
    phoneNo: '',
    alterNo: '',
  });
  const [academicdetails, setAcademicDetails] = useState({
    previousInst: '',
    tenthper: '',
    twelfthper: '',
  });
  const [userType, setUserType] = useState("");
  const [editablePersonal, setEditablePersonal] = useState(false);
  const [editableParent, setEditableParent] = useState(false);
  const [editableAddress, setEditableAddress] = useState(false);
  const [editableAcademic, setEditableAcademic] = useState(false);





  // const serverPath1 = "http://127.0.0.1:5000"
  const serverPath1 = "https://fgspserver.onrender.com";
  const { studentId } = useParams();
  // console.warn(studentId)
  const GuideName = localStorage.getItem("GuideName");
  const GuideImage = localStorage.getItem("GuideImage");
  const guideMailId = localStorage.getItem("GuideMailIdToLogin")
  const studentMailId = localStorage.getItem("StudentMailId")
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



  const getStudentProfileData = async () => {
    console.log("Fetching student data...");
    const data = {
      regNo: studentId,
      guideMail: guideMailId
    }
    const response = await axios.post(serverPath1 + "/getStudentProfileData", data)
    console.warn(response.data)
    setStudentData(response.data.StudentData)
  }

  const fetchData = async (sdata) => {
    const response = await axios.post("http://127.0.0.1:5000/personalDetail", sdata);
    console.warn(response.data.personaldetails);
    console.warn(response.data.parentdetails);
    console.warn(response.data.address);
    console.warn(response.data.academicdetails);
    setPersonalDetails(response.data.personaldetails);
    setParentDetails(response.data.parentdetails);
    setAddress(response.data.address);
    setAcademicDetails(response.data.academicdetails);
  };

  // const handleSave = async () => {
  //   try {
  //     const response = await axios.(`http://127.0.0.1:5000/personalDetail`, sdata);
  //     console.log(response.data);
  //     setEditablePersonal(false);
  //     // Reset other editable states similarly
  //   } catch (error) {
  //     console.error('Error updating data:', error);
  //   }
  // };

  const getStudentData = async () => {
    try {
      // Check for the presence of GuideMailIdToLogin in local storage to determine user type
      const guideMailId = localStorage.getItem("GuideMailIdToLogin");
      if (!guideMailId) {
        setUserType("student");

        const data = { mailId: studentMailId };
        const response = await axios.post(serverPath1 + "/getStudentData", data);
        console.warn(response.data);
        setStudentData(response.data.StudentData);
      } else {
        setUserType("staff");
        getStudentProfileData();
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };



  useEffect(() => {
    const regNo = "41111354"; // Set the regNo value here
    const sdata = {
      "collection": "personalinfo",
      "regNo": regNo
    };
    console.log("Request data:", sdata); // Log the data object before sending the request

    fetchData(sdata); // Pass data as an argument to the fetchData function
    getStudentData();
  }, []);


  const handleEdit = (section) => {
    switch (section) {
      case 'personal':
        setEditablePersonal(true);
        break;
      case 'parent':
        setEditableParent(true);
        break;
      case 'address':
        setEditableAddress(true);
        break;
      case 'academic':
        setEditableAcademic(true);
        break;
      default:
        break;
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

  const handleInputChange = (event, detailsType) => {
    const { name, value } = event.target;
    const phoneDet = ['fatherNo', 'motherNo', 'guardianNo'];
    if (phoneDet.includes(name)) {
      const digit = value.replace(/\D/g, '');
      if (digit.length === 10) {
        setParentDetails(prevState => ({
          ...prevState,
          [name]: digit
        }));
      }
    } else {
      switch (detailsType) {
        case 'personal':
          setPersonalDetails(prevState => ({
            ...prevState,
            [name]: value
          }));
          break;
        case 'address':
          setAddress(prevState => ({
            ...prevState,
            [name]: value
          }));
          break;
        case 'academic':
          setAcademicDetails(prevState => ({
            ...prevState,
            [name]: value
          }));
          break;
        default:
          setParentDetails(prevState => ({
            ...prevState,
            [name]: value
          }));
          break;
      }
    }
  };





  return (
    <>
      {userType === 'staff' ? (
        <StaffNormalNavbar GuideName={GuideName} GuideImage={GuideImage} />
      ) : (
        <StudentNormalNavbar />
      )}    <div className='sm:flex '>
        <div className="p-4 sm:h-screen ml-2 mr-2 m-2 lg:ml-6  bg-[#e9d8de] mx-auto lg:w-96 rounded-md shadow-md relative" style={{ maxWidth: '600px' }}>
          <div className='w-full rounded-t-md bg-[#811338] h-20 absolute top-0 left-0 right-0'></div>
          {/* Large Box */}
          <div className="flex flex-col " style={{ maxWidth: '600px' }}>
            <div className="flex justify-center py-4 px-20 ">
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
              <h2 className="text-2xl font-bold break-words" >{capitalizeFirstLetter(StudentData.name)}</h2>
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
            <button className="bg-[#811338] text-white px-4 py-2 rounded-md" onClick={() => {
              navigate(`/staffdashboard/studentprofile/${studentId}`);
            }}>
              BACK
            </button>
          </div>
        </div>

        {/* Largest Table */}
        <div className=' flex flex-grow w-full '>
    <div className='flex w-full flex-grow justify-center h-screen items-center  my-2 mr-0'>
            <div className="flex-col bg-[#edeef2] space-y-4  shadow-md rounded-lg m-2 ml-4 mr-4 w-full h-full overflow-y-scroll">
             
            <div className='w-full rounded-t-md bg-[#811338] h-auto lg:h-20 md:h-20'>
              <h1 class="text-3xl text-white font-code mb-4 pt-8 md:pt-4 md:pb-4 pb-8 px-2">Personal Information</h1>
            </div>

            <div className='flex bg-[#edeef2]  justify-center items-center'>

              <div className="flex-col space-y-2 flex-grow">
                <div className='h-full rounded-xl  lg:px-7 px-2 '>
                  <h1 className="text-lg rounded-md font-bold shadow-md h-12 justify-items-center mb-4 mt-4 bg-[#EFBDBD] px-2 py-2" style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>Personal Details</h1></div>

                <form>


                  {/* Flex layout with 4 rows, 2 columns */}
                  <div className="flex flex-wrap">
                    {/* First column */}

                    <div className="w-full sm:w-1/2 mb-4 ">

                      <label className="block text-sm font-semibold pr-1 text-gray-600 px-7">Name</label>
                      <TextareaAutosize name="name" readOnly={!editablePersonal || userType === 'staff'} type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" style={{ resize: 'none', overflow: 'hidden' }} value={personaldetails.length > 0 ? capitalizeEachWord(personaldetails[0].name) : ''} onChange={handleInputChange} />
                    </div>

                    {/* Second column */}
                    <div className="w-full sm:w-1/2 mb-4">
                      <label className="block text-sm font-semibold pr-1 text-gray-600 px-7">Department Name</label>
                      <input name="dep" readOnly={!editablePersonal || userType === 'staff'} type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" value={personaldetails.length > 0 ? capitalizeString(personaldetails[0].dep) : ''} onChange={handleInputChange} />
                    </div>

                    {/* Third column */}
                    <div className="w-full sm:w-1/2 mb-4">
                      <label className="block text-sm font-semibold  text-gray-600 px-7">Section</label>
                      <input name="section" readOnly type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" value={personaldetails.length > 0 ? capitalizeEachWord(personaldetails[0].section) : ''} onChange={handleInputChange} />
                    </div>

                    {/* Fourth column */}
                    <div className="w-full sm:w-1/2 mb-4">
                      <label className="block text-sm font-semibold  text-gray-600 px-7">Register Number</label>
                      <input name="regNo" readOnly type="text" className="lg:w-2/4 w-4/5 mx-6  border rounded-md px-3 py-2" value={personaldetails.length > 0 ? personaldetails[0].regNo : ''} onChange={handleInputChange} />
                    </div>

                    {/* Fifth column */}
                    <div className="w-full sm:w-1/2 mb-4">
                      <label className="block text-sm font-semibold  text-gray-600 px-7">Religion</label>
                      <input name="religion" readOnly={!editablePersonal || userType === 'staff'} type="text" className="lg:w-2/4 w-4/5  mx-7 border rounded-md px-3 py-2" value={personaldetails.length > 0 ? capitalizeEachWord(personaldetails[0].religion) : ''} onChange={handleInputChange} />
                    </div>

                    {/* Sixth column */}
                    <div className="w-full sm:w-1/2 mb-4">
                      <label className="block text-sm font-semibold text-gray-600 px-7">Community</label>
                      <input name="community" readOnly={!editablePersonal || userType === 'staff'} type="text" className="lg:w-2/4 w-4/5  border rounded-md  mx-6 px-3 py-2" value={personaldetails.length > 0 ? capitalizeString(personaldetails[0].community) : ''} onChange={handleInputChange} />
                    </div>

                    {/* Seventh column */}
                    <div className="w-full sm:w-1/2 mb-4">
                      <label className="block text-sm font-semibold text-gray-600 px-7">Life Goal</label>
                      <input name="lifeGoal" readOnly={!editablePersonal || userType === 'staff'} type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" value={personaldetails.length > 0 ? capitalizeEachWord(personaldetails[0].lifeGoal) : ''} onChange={handleInputChange} />
                    </div>

                    {/* Eighth column */}
                    <div className="w-full sm:w-1/2 mb-4">
                      <label className="block text-sm font-semibold  text-gray-600 px-7">Blood Group</label>
                      <input name="bloodGrp" readOnly={!editablePersonal || userType === 'staff'} type="text" className="lg:w-2/4 mx-6 w-4/5 border rounded-md px-3 py-2" value={personaldetails.length > 0 ? capitalizeEachWord(personaldetails[0].bloodGrp) : ''} onChange={handleInputChange} />
                    </div>
                    <div className="w-full sm:w-1/2 mb-4">
                      <label className="block text-sm font-semibold  text-gray-600 px-7">Languages Known</label>
                      <input name="languages" readOnly={!editablePersonal || userType === 'staff'} type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" value={personaldetails.length > 0 ? capitalizeWord(personaldetails[0].languages) : ''} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div>
                    {/* Your UI components */}
                    {userType === 'student' && (
                      <>
                        {!editablePersonal && (
                          <button type="button" className="w-24 h-10 border  my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2" onClick={() => handleEdit('personal')}>Edit</button>
                        )}
                        {editablePersonal && (
                          <>
                            <div style={{ display: 'flex' }}>
                              <button type="button" className="w-24 h-10 border  my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2" onClick={handleSave}>Save</button>
                              <button type="button" className="w-24 h-10 border  my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2" onClick={() => setEditablePersonal(false)}>Cancel</button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>



                </form>

                <form className='w-full'>
                  <div className="flex-col space-y-2 flex-grow">
                    <div className='h-full rounded-xl  lg:px-7 px-2 '>
                      <h1 className="text-lg rounded-md font-bold shadow-2xl h-12 justify-items-center mb-4 mt-4 bg-[#EFBDBD] px-2 py-2" style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>Parent Details</h1></div>
                  </div>


                  {/* Rounded rectangle around image and details */}
                  <div className="rounded-xl lg:w-3/4 md:w-full px-4 bg-gray-100 p-4 mx-auto mb-5">
                    <div className="flex flex-col lg:flex-row">
                      {/* Left column for image */}
                      <div className="w-full lg:w-1/2 mb-2 flex justify-center items-center">
                        <div className="w-3/4 h-3/4  overflow-hidden flex justify-center items-center">
                          <img src="/src/images/father.jpg" alt="Parent Image" className="w-40 h-40 rounded-full object-cover" />
                        </div>
                      </div>

                      {/* Right column for parent details */}
                      <div className="w-full lg:w-1/2 mb-4">
                        {/* First detail */}
                        <div className="w-full sm:w-3/4 mt-4 mb-2">
                          <label className="block text-sm font-semibold px-10 text-gray-600">Father's Name</label>
                          <TextareaAutosize name="fatherName" readOnly={!editableParent || userType === 'staff'} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" style={{ resize: 'none', overflow: 'hidden'}} value={parentdetails.length > 0 ? capitalizeEachWord(parentdetails[0].fatherName) : ''} onChange={handleInputChange} />
                        </div>

                        <div className="w-full sm:w-3/4 mb-2">
                          <label className="block text-sm font-semibold px-10 text-gray-600">Father's EmailId</label>
                          <input name="fatherMail" readOnly={!editableParent || userType === 'staff'} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" value={parentdetails.length > 0 ? parentdetails[0].fatherMail : ''} onChange={handleInputChange} />
                        </div>

                        {/* Second detail */}
                        <div className="w-full sm:w-3/4 mb-2">
                          <label className="block text-sm px-10 font-semibold text-gray-600">Phone Number</label>
                          <input name="fatherNo" readOnly={!editableParent || userType === 'staff'} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" value={parentdetails.length > 0 ? parentdetails[0].fatherNo : ''} onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue === '' || isValidPhoneNumber(inputValue)) {
                              handleInputChange(e);
                            }
                          }} />
                        </div>

                        {/* Third detail */}
                        <div className="w-full sm:w-3/4 mb-2">
                          <label className="block text-sm px-10 font-semibold text-gray-600">Occupation</label>
                          <input name="fatherOcc" readOnly={!editableParent || userType === 'staff'} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" value={parentdetails.length > 0 ? capitalizeEachWord(parentdetails[0].fatherOcc) : ''} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl lg:w-3/4 md:w-full px-4 bg-gray-100 p-4 mx-auto mb-5">
                    <div className="flex flex-col lg:flex-row">
                      {/* Left column for image */}
                      <div className="w-full lg:w-1/2 mb-2 flex justify-center items-center">
                        <div className="w-3/4 h-3/4  overflow-hidden flex justify-center items-center">
                          <img src="/src/images/mother.jpg" alt="Parent Image" className="w-40 h-40 rounded-full object-cover" />
                        </div>
                      </div>

                      {/* Right column for parent details */}
                      <div className="w-full lg:w-1/2 mb-2">
                        {/* First detail */}
                        <div className="w-full sm:w-3/4 mt-4 mb-4">
                          <label className="block text-sm font-semibold px-10 text-gray-600">Mother's Name</label>
                          <TextareaAutosize name="motherName" readOnly={!editableParent || userType === 'staff'} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" style={{ resize: 'none', overflow: 'hidden' }} value={parentdetails.length > 0 ? capitalizeEachWord(parentdetails[0].motherName) : ''} onChange={handleInputChange} />
                        </div>

                        <div className="w-full sm:w-3/4 mb-2">
                          <label className="block text-sm font-semibold px-10 text-gray-600">Mother's EmailId</label>
                          <input name="motherMail" readOnly={!editableParent || userType === 'staff'} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" value={parentdetails.length > 0 ? parentdetails[0].motherMail : ''} onChange={handleInputChange} />
                        </div>

                        {/* Second detail */}
                        <div className="w-full sm:w-3/4 mb-2">
                          <label className="block text-sm px-10 font-semibold text-gray-600">Phone Number</label>
                          <input name="motherNo" readOnly={!editableParent || userType === 'staff'} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" value={parentdetails.length > 0 ? parentdetails[0].motherNo : ''} onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue === '' || isValidPhoneNumber(inputValue)) {
                              // Update the input value only if it's empty or valid
                              handleInputChange(e);
                            }
                          }} />
                        </div>

                        {/* Third detail */}
                        <div className="w-full sm:w-3/4 mb-2">
                          <label className="block text-sm px-10 font-semibold text-gray-600">Occupation</label>
                          <input name="motherOcc" readOnly={!editableParent || userType === 'staff'} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" value={parentdetails.length > 0 ? capitalizeEachWord(parentdetails[0].motherOcc) : ''} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl lg:w-3/4 md:w-full px-4 bg-gray-100 p-4 mx-auto mb-5">
                    <div className="flex flex-col lg:flex-row">
                      {/* Left column for image */}
                      <div className="w-full lg:w-1/2 mb-2 flex justify-center items-center">
                        <div className="w-3/4 h-3/4  overflow-hidden flex justify-center items-center">
                          <img src="/src/images/guard.jpg" alt="Parent Image" className="w-40 h-40 rounded-full object-fit:cover" />
                        </div>
                      </div>

                      {/* Right column for parent details */}
                      <div className="w-full lg:w-1/2 mb-2">
                        {/* First detail */}
                        <div className="w-full sm:w-3/4 mt-4 mb-4">
                          <label className="block text-sm font-semibold px-10 text-gray-600">Guardian's Name</label>
                          <TextareaAutosize name="guardianName" readOnly={!editableParent || userType === 'staff'} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" style={{ resize: 'none', overflow: 'hidden' }} value={parentdetails.length > 0 ? capitalizeEachWord(parentdetails[0].guardianName) : ''} onChange={handleInputChange} />
                        </div>

                        <div className="w-full sm:w-3/4 mb-2">
                          <label className="block text-sm font-semibold px-10 text-gray-600">Guardian's EmailId</label>
                          <input name="guardianMail" readOnly={!editableParent || userType === 'staff'} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" value={parentdetails.length > 0 ? parentdetails[0].guardianMail : ''} onChange={handleInputChange} />
                        </div>

                        {/* Second detail */}
                        <div className="w-full sm:w-3/4 mb-2">
                          <label className="block text-sm px-10 font-semibold text-gray-600">Phone Number</label>
                          <input name="guardianNo" readOnly={!editableParent || userType === 'staff'} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" value={parentdetails.length > 0 ? parentdetails[0].guardianNo : ''} onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue === '' || isValidPhoneNumber(inputValue)) {
                              // Update the input value only if it's empty or valid
                              handleInputChange(e);
                            }
                          }} />
                        </div>
                        <div className="w-full sm:w-3/4 mb-2">
                          <label className="block text-sm px-10 font-semibold text-gray-600">Occupation</label>
                          <input name="guardianOcc" readOnly={!editableParent || userType === 'staff'} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" value={parentdetails.length > 0 ? capitalizeEachWord(parentdetails[0].guardianOcc) : ''} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* Your UI components */}
                    {userType === 'student' && (
                      <>
                        {!editableParent && (
                          <button type="text" className="w-24 h-10 border  my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2" onClick={() => handleEdit('parent')}>Edit</button>
                        )}
                        {editableParent && (
                          <>
                            <div style={{ display: 'flex' }}>
                              <button type="text" className="w-24 h-10 border  my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2" onClick={handleSave}>Save</button>
                              <button type="text" className="w-24 h-10 border  my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2" onClick={() => setEditableParent(false)}>Cancel</button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>


                </form>


                <form>
                  <div className='h-full rounded-xl lg:px-7 px-2'>
                    <h1 className="text-lg rounded-md font-bold shadow-md h-12 justify-items-center mb-4 mt-4 bg-[#EFBDBD] px-2 py-2" style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>Address</h1>
                  </div>

                  <div className="flex flex-col">
                    {/* First column */}
                    <div className="w-full sm:w-3/4 mb-4">
                      <label className="block text-sm font-semibold px-10 text-gray-600">Permanent Address</label>
                      <TextareaAutosize name="permanentAdd" readOnly={!editableAddress || userType === 'staff'} type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" style={{ resize: 'none', overflow: 'hidden' }} value={address.length > 0 ? capitalizeEachWord(address[0].permanentAdd) : ''} onChange={handleInputChange} />
                    </div>

                    {/* Second column */}
                    <div className="flex flex-row items-start justify-start flex-wrap sm:flex-col  sm:justify-start md:flex-row">
                      <div className="w-full sm:w-3/4 mb-4">
                        <label className="block text-sm font-semibold px-10 text-gray-600">Communication Address</label>
                        <TextareaAutosize name="communicationAdd" readOnly={!editableAddress || userType === 'staff'} type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" style={{ resize: 'none', overflow: 'hidden' }} value={address.length > 0 ? address[0].communicationAdd : ''} onChange={handleInputChange} />
                      </div>



                      {/* <div className="w-full sm:w-1/2 mb-4 ">
                        <label className="text-sm font-semibold px-10 text-gray-600 opacity-0 hidden md:block">Communication Address</label>

                        <button type="text" className="w-24 h-10 border  my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md  px-3 py-2"disabled >Hosteller</button>    </div> */}
                    </div>

                    {/* Third column */}
                    <div className="flex flex-row items-start justify-start flex-wrap sm:flex-col sm:justify-start md:flex-row">

                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold px-10 text-gray-600">Number</label>
                        <input name="phoneNo" readOnly={!editableAddress || userType === 'staff'} type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" value={address.length > 0 ? address[0].phoneNo : ''} onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue === '' || isValidPhoneNumber(inputValue)) {
                            // Update the input value only if it's empty or valid
                            handleInputChange(e);
                          }
                        }} />
                      </div>

                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold px-10 text-gray-600">Alternative Number</label>
                        <input name="alterNo" readOnly={!editableAddress || userType === 'staff'} type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" value={address.length > 0 ? address[0].alterNo : ''} onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue === '' || isValidPhoneNumber(inputValue)) {
                            // Update the input value only if it's empty or valid
                            handleInputChange(e);
                          }
                        }} />
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* Your UI components */}
                    {userType === 'student' && (
                      <>
                        {!editableAddress && (
                          <button type="text" className="w-24 h-10 border  my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2" onClick={() => handleEdit('address')}>Edit</button>
                        )}
                        {editableAddress && (
                          <>
                            <div style={{ display: 'flex' }}>
                              <button type="text" className="w-24 h-10 border my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2" onClick={handleSave}>Save</button>
                              <button type="text" className="w-24 h-10 border  my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2" onClick={() => setEditableAddress(false)}>Cancel</button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>

                </form>



                <form>
                  <div className='h-full rounded-xl lg:px-7 px-2'>
                    <h1 className="text-lg rounded-md font-bold shadow-md h-12 justify-items-center mb-4 mt-4 bg-[#EFBDBD] px-2 py-2" style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>Academic Details</h1>
                  </div>

                  {/* Flex layout with 2 rows, 2 columns for Address */}
                  <div className="">
                    {/* First column */}
                    {/* Second column */}
                    <div className="w-full sm:w-1/2 mb-4">
                      <label className="block text-sm font-semibold px-10 text-gray-600">12th Previous Institution Name</label>
                      <TextareaAutosize name="previousInst" readOnly={!editableAcademic || userType === 'staff'} y type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" style={{ resize: 'none', overflow: 'hidden' }} value={academicdetails.length > 0 ? academicdetails[0].previousInst : ''} onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-wrap'>
                      {/* Third column */}
                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold px-10 text-gray-600">10th Percentage</label>
                        <input name="tenthper" readOnly={!editableAcademic || userType === 'staff'} type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" value={academicdetails.length > 0 ? academicdetails[0].tenthper : ''} onChange={handleInputChange} />
                      </div>

                      {/* Fourth column */}
                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold px-10 text-gray-600">12th Percentage</label>
                        <input name="twelfthper" readOnly={!editableAcademic || userType === 'staff'} type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" value={academicdetails.length > 0 ? academicdetails[0].twelfthper : ''} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* Your UI components */}
                    {userType === 'student' && (
                      <>
                        {!editableAcademic && (
                          <button type="text" className="w-24 h-10 border  my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2" onClick={() => handleEdit('academic')}>Edit</button>
                        )}
                        {editableAcademic && (
                          <>
                            <div style={{ display: 'flex' }}>
                              <button type="text" className="w-24 h-10 border my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2" onClick={handleSave}>Save</button>
                              <button type="text" className="w-24 h-10 border  my-0 mx-10 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2" onClick={() => setEditableAcademic(false)}>Cancel</button>
                            </div>
                          </>

                        )}
                      </>
                    )}
                  </div>


                </form>


              </div>
            </div>
          </div>
          {/* Second Box */}
        </div>
      </div>
      </div>

    </>
  );
};


