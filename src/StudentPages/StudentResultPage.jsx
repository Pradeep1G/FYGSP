// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import EventCard from '../CardComponents/EventCard';
// import { useEffect } from 'react';
// import {RiArrowDropDownFill} from "react-icons/ri";
import StaffNormalNavbar from '../NavBarComponents/StaffNormalNavbar';

// export default function StudentResultPage() {
//   const [selectedSemester, setSelectedSemester] = useState('');
//   const [showResults, setShowResults] = useState(false);
//   const [results, setResults] = useState([]);
//   const [resultsDrpDwn, setResultsDrpDwn] = useState(false);



//   const handleDownloadFile = () => {
//     // Check if a semester is selected
//     if (!selectedSemester) {
//       alert('Please select a semester');
//       return;
//     }

//     // Get the URL of the selected semester's image
//     const imageUrl = results[0][selectedSemester];

//     // Create a temporary anchor element to trigger download
//     const downloadLink = document.createElement('a');
//     downloadLink.href = imageUrl;
//     downloadLink.download = `${selectedSemester}.jpg`; // Customize the filename as needed
//     downloadLink.target = '_blank';
//     downloadLink.click();
//   };

//   const handleSelectChange = (event) => {
//     setSelectedSemester(event.target.value);
//     setShowResults(true);
//   };

  
//   // const resultDataArray = [
//   //   {"Semester 1": 'src/images/sem1.jpg'},
//   //   {"Semester 2": 'src/images/sem2.jpg'},
//   //   {"Semester 3": 'src/images/sem3.jpg'},
//   //   {"Semester 4": 'src/images/sem4.jpg'},
//   //   {"Semester 5": 'src/images/sem5.jpg'},
//   //   {"Semester 6": 'src/images/sem6.jpg'},
//   //   {"Semester 7": 'src/images/sem7.jpg'},
//   //   {"Semester 8": 'src/images/sem8.jpg'},
 
//   //  ];


//    const serverPath1 = "https://fgspserver.onrender.com";
//    //  const serverPath1 = "http://127.0.0.1:5000"

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
  
//   const navigate = useNavigate();

//   useEffect(()=>{
//     const func = async() => {
//       const regNo = studentId;
//       const data = {
//         "collection":"results",
//         "regNo": regNo
//     }
//         const response = await axios.post(serverPath1+"/resultDetail", data)
//         console.warn(response.data)
//         setResults(response.data.results);
//     }
//     func();
//   },[])




//   return (
// <>  
//     <StaffNormalNavbar GuideName={GuideName} GuideImage={GuideImage} />
//     <div className='sm:flex '>
//     <div className="p-4 sm:h-screen ml-2 mr-2 m-2 lg:ml-6  bg-[#e9d8de] mx-auto lg:w-96 rounded-md shadow-md relative" style={{ maxWidth: '600px' }}>
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
//             <div className="mb-10 text-center max-w-xs">
//               <h2 className="text-2xl font-bold break-words" >{StudentData.name}</h2>
//             </div>
//           </div>


//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex flex-col p-0 text-left ">
//               <p className="mb-4 text-sm font-semibold whitespace-nowrap" style={{ color: 'rgba(0,0,0)' }}>Register Number</p>
//               <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Section</p>
//             </div>
//             <div className="flex flex-col p-0 text-left">
//               <p className="mb-4 text-sm text-gray-600">{StudentData.regNo}</p>
//               <p className="text-sm text-gray-600" >E3</p>
//             </div>
//             <div className="flex flex-col text-left">
//               <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Email</p>
//             </div>
//             <div className="flex flex-col p-0 text-left">
//               <p className=" text-sm text-gray-600" style={{ wordBreak: 'break-all' }}>{StudentData.mailId}</p>
//             </div>
//             <div className="flex flex-col p-0 text-left">
//               <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Phone</p>
//             </div>
//             <div className="flex flex-col p-0 text-left">
//               <p className="text-sm text-gray-600">{StudentData.phoneNo}</p>
//             </div>
//           </div>
//           <div className="flex justify-center mt-4">
//             <button className="bg-[#811338] text-white px-4 py-2 rounded-md" onClick={() => {
//               navigate(`/staffdashboard/studentprofile/${studentId}`);
//             }}>
//               BACK
//             </button>
//           </div>
//         </div>

//         {/* Largest Table */}
//     <div className='flex w-full flex-grow justify-center h-screen items-center  my-2 mr-0'>
//             <div className="flex-col bg-[#edeef2] space-y-4  shadow-md rounded-lg m-2 ml-4 mr-4 w-full h-full overflow-y-scroll">
             
//             <div className='w-full rounded-t-md bg-[#811338] h-auto lg:h-20 md:h-20'>
//               <h1 class="text-3xl text-white font-code mb-4 pt-8 md:pt-5 md:pb-4 pb-8 px-2">Results Page</h1>
//             </div>
            

//             <div className='flex bg-[#edeef2]  justify-center items-center'>
//               <div className="flex flex-col py-2 px-2 w-full">
//                {/* Semester Results Heading */}
//                <div className="flex-col space-y-2 flex-grow">
//                   <div className='h-full rounded-xl  lg:px-4 px-2 '>
//                     <h1 className="text-lg rounded-md font-bold shadow-md h-12 justify-items-center mb-4 mt-4 bg-[#EFBDBD] px-2 py-2" style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>Semester Results</h1></div>
//                     <div className="flex flex-col  w-fit justify-start px-4">

//   <button onClick={() => { setResultsDrpDwn(!resultsDrpDwn); }} className='text-white flex items-center justify-center bg-[#811338] ' style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px',
//     borderBottomRightRadius: '10px' }}>Select Semester<RiArrowDropDownFill size={40} /></button>
//   <div className={`${resultsDrpDwn ? "" : "hidden"} relative`} style={{ paddingLeft: '5px', paddingRight: '5px', width: '200px' }}>
//   <div className='flex flex-col bg-red-400 rounded-md justify-center ' style={{ boxShadow: '0px 0px 6px -3px rgba(0.5,0.5,0.5, 0)' }}>
//     <button onClick={() => { setSelectedSemester("Semester 1"); setResultsDrpDwn(false);setShowResults(true); }} value="Semester 1" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 1</button>
//     <button onClick={() => { setSelectedSemester("Semester 2"); setResultsDrpDwn(false);setShowResults(true); }} value="Semester 2" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 2</button>
//     <button onClick={() => { setSelectedSemester("Semester 3"); setResultsDrpDwn(false);setShowResults(true); }} value="Semester 3" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 3</button>
//     <button onClick={() => { setSelectedSemester("Semester 4"); setResultsDrpDwn(false);setShowResults(true); }} value="Semester 4" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 4</button>
//     <button onClick={() => { setSelectedSemester("Semester 5"); setResultsDrpDwn(false);setShowResults(true); }} value="Semester 5" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 5</button>
//     <button onClick={() => { setSelectedSemester("Semester 6"); setResultsDrpDwn(false);setShowResults(true); }} value="Semester 6" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 6</button>
//     <button onClick={() => { setSelectedSemester("Semester 7"); setResultsDrpDwn(false);setShowResults(true); }} value="Semester 7" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'> Semester 7</button>
//     <button onClick={() => { setSelectedSemester("Semester 8"); setResultsDrpDwn(false);setShowResults(true); }} value="Semester 8" className='p-0 ml-0 px-0 bg-pink-200 hover:bg-pink-300 mb-0 mt-0 text-left pl-2'>Semester 8</button>
//     </div>
//     </div>
//     <div className="relative " style={{ paddingLeft: '5px', paddingRight: '5px',display: 'flex', flexDirection: 'column-reverse' }}>
//   <button
//     onClick={() => { 
//       setSelectedSemester("semester9"); 
//       setResultsDrpDwn(false); 
//     }}
//     value="semester 9"
//     className='p-0 ml-0 px-0 bg-pink-200 mb-0 mt-0 text-left pl-2 shadow-2xl relative' // Add relative positioning
//     disabled
//     style={{
//       width: '190px',
//       height: '10px', 
//       paddingTop: '0px',// Set the height of the button
//       borderBottomLeftRadius: '100px',
//       borderBottomRightRadius: '100px'
//     }}
//   >    
//     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#811338] w-2 h-1 rounded-full" style={{ borderColor: 'white' }}></div>
//   </button>
// </div>



//   {/* Select Button */}
  
// </div>


//  {/* Semester Text */}
//  {selectedSemester && showResults && (
//         <div className="flex justify-center mt-4">
//           <h2 className="text-lg font-semibold text-gray-800">{selectedSemester} Results</h2>
//         </div>

        
//       )}

// {/* Image Container */}
// {selectedSemester && showResults && (
//   <div className="flex justify-center items-center mt-4">
//     <div className="p-4 border-black border w-7/12 h-3/4">
//       <img 
//         src={getDirectLinkFromShareableLink(results[0][selectedSemester])}     
//         alt="Semester Results"
//         className="rounded-md shadow-lg"
//         style={{ width: '100%', height: '100%' }}
//       />
//     </div>
//   </div>
// )}


// {/* Download Button */}
//  {selectedSemester && showResults && (
//         <div className="flex justify-center mt-4">
//           <button 
//             className="flex justify-center items-center bg-[#811338] w-1/4 text-white px-4 py-2 rounded-md mt-0"
//             onClick={handleDownloadFile}
//           >
//             Download
//           </button>
//         </div>
//       )}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Second Box */}
//       </div>
//       </div>


     
//     </>
//   );
// }




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { RiArrowDropDownFill } from 'react-icons/ri';
// import StaffNormalNavbar from './components/StaffNormalNavbar';
import LoadingScreen from '../shared/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const serverPath1 = "https://fgspserver.onrender.com";
const serverPath1 = "http://127.0.0.1:5000";

export default function ResultPage() {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [resultsDrpDwn, setResultsDrpDwn] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [isUploading, setisUploading] = useState(false);
  const [OpenUploading , setOpenUploading] = useState(false);

  // const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const { studentId } = localStorage.getItem("regNo")
  const navigate = useNavigate();
  const [uploadMessage, setUploadMessage] = useState(''); 
  const GuideName = localStorage.getItem("GuideName");
  const GuideImage = localStorage.getItem("GuideImage");
  const guideMailId = localStorage.getItem("GuideMailIdToLogin");
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');



  const fetchData = async () => {
    const  studentId = localStorage.getItem("regNo");

      const data = {
        collection: "results",
        regNo: studentId
      };
      setIsLoading(true);
      const response = await axios.post(`${serverPath1}/resultDetail`, data);
      setResults(response.data.results);
      console.warn(response.data)
      setIsLoading(false);
    };


  useEffect(() => {
    
    fetchData();
  }, [studentId]);

  useEffect(() => {
    // Check local storage for uploaded file URL on component mount
    const storedUploadedFileUrl = localStorage.getItem('uploadedFileUrl');
    if (storedUploadedFileUrl) {
      setUploadedFileUrl(storedUploadedFileUrl);
    }
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

    const token = localStorage.getItem("jwt_token_student");
    if (!token) {
      navigate("/studentlogin");
      return;
    }

    const StudentMailId = localStorage.getItem("StudentMailId")
    const studentId = localStorage.getItem("regNo")
    const data = {
      regNo:studentId,
      guideMail:guideMailId,
      mailId: StudentMailId
    }

    try{
      setIsLoading(true);
      const response = await axios.post(serverPath1+"/StudentMenuPage/getLeftSideBarData", data,  { headers: { Authorization: `Bearer ${token}` }})
      setStudentData(response.data.StudentData)
    }

    catch{
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

  useEffect(()=>{
    getStudentData();
  },[])
  const handleSelectChange = (semester) => {
    setSelectedSemester(semester); // #useState
    setShowResults(true); // #useState
    // Reset file state when changing semester
    setFile(null); // #useState
    setFileName(''); // #useState
    setUploadMessage(''); // #useState
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.type === 'application/pdf' && selectedFile.size <= 1000000) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setUploadMessage('');
    } else {
      setFile(null);
      setFileName('');
      setUploadMessage('Please select a PDF file less than 1MB');
      setTimeout(() => {
        setUploadMessage('');
      }, 2000);
    }
  };
  

  // Function to handle file upload
  const handleUploadFile = async () => {
    if (!file) {
      setUploadMessage('Please select a PDF file less than 1MB');
      setTimeout(() => {
        setUploadMessage('');
      }, 2000); // Clear message after 2 seconds
      return;
    }

    const studentId = localStorage.getItem("regNo");
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('semester', selectedSemester);
    formData.append('regNo', studentId);
    formData.append('name',StudentData.name);
  
    try {
      setIsLoading(true);
      const response = await axios.post(`${serverPath1}/student/insertSemResult`, formData);
      const fileUrl = response.data.fileUrl; // Assuming the server returns the file URL
      setUploadedFileUrl(fileUrl);
      localStorage.setItem('uploadedFileUrl', fileUrl); // Store in local storage
      // Clear message after 2 seconds
      setFile(null);
      setShowResults(false);
      setSelectedSemester(false);
      toast.success('File uploaded successfully');

      setTimeout(function() {
        window.location.reload();
    }, 2000); 
      

      fetchData(); // Assuming fetchData is defined to refresh data
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
       // Clear message after 2 seconds
    } finally {
      
      setIsLoading(false);

      
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


  return (
    <>
    {isLoading && <LoadingScreen/>}
      <StaffNormalNavbar GuideName={GuideName} GuideImage={GuideImage} />
      <div className='sm:flex '>
        <div className="p-4 sm:h-screen ml-2 mr-2 m-2 lg:ml-6 bg-[#e9d8de] mx-auto lg:w-96 rounded-md shadow-md relative" style={{ maxWidth: '600px' }}>
          {/* Student Information */}
          {/* ... existing code for student information ... */}
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
          <button
                className="bg-[#811338] text-white px-4 py-2 rounded-md ml-0 mr-2"
                onClick={() => {
                 
                    navigate("/studentdashboard");
                }}
              >
                Back
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
                    <div className='h-full rounded-xl lg:px-4 px-2 '>
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
    <div className='flex flex-col bg-red-400 rounded-md justify-center' style={{ boxShadow: '0px 0px 6px -3px rgba(0.5,0.5,0.5, 0)' }}>
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
                     {/* {selectedSemester && showResults (
                      <div className="flex justify-center mt-4">
                        <h2 className="text-lg font-semibold text-gray-800">Upload your {selectedSemester} Result</h2>
                      </div>
                    )} */}

                    {selectedSemester && showResults && results[0] && results[0][selectedSemester] ? (
                      <div>
                      <div className="flex justify-center items-center mt-4">
                        <div className="p-4 border-black border w-7/12 h-3/4">
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

                        
                <div className="flex justify-center mt-4">
                  <button 
                    className="flex justify-center items-center bg-[#811338] w-1/4 text-white px-4 py-2 rounded-md mt-0"
                    onClick={handleDownloadFile}
                  >
                    Download
                  </button>
                </div>
              </div>
                      
                      
                    ) : (
                      selectedSemester && showResults && (
                        <div className="flex items-center justify-center mt-4">
                          <div className="flex flex-col items-center justify-center w-full max-w-lg">
                          {uploadMessage && (
        <div className="text-center text-red-500 mt-2">{uploadMessage}</div>
      )}




      {/* {selectedSemester && showResults && (
                <div className="flex justify-center items-center mt-4">
                  <div className="p-4 border-black border w-7/12 h-3/4">
                    <img 
                      src={getDirectLinkFromShareableLink(results[0][selectedSemester])}     
                      alt="Semester Results"
                      className="rounded-md shadow-lg"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              )}
              {selectedSemester && showResults && (
                <div className="flex justify-center mt-4">
                  <button 
                    className="flex justify-center items-center bg-[#811338] w-1/4 text-white px-4 py-2 rounded-md mt-0"
                    onClick={handleDownloadFile}
                  >
                    Download
                  </button>
                </div>
              )} */}



          
















                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-200">
                            {fileName && (
          <p className="text-sm text-gray-500 dark:text-gray-900 mb-2">{fileName}</p>
        )}
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">

                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Only PDF format is Allowed (MAX 1MB)</p>
                              </div>
                              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                            </label>
                     
                            <button 
                className={`bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-2 mt-6 rounded mr-1.5 ${isUploading ? 'cursor-none':'cursor-pointer'} `}
                // className={`bg-red-900 flex justify-around text-white px-6 py-2 rounded-md my-2 text-sm ${isSending ? 'cursor-none':'cursor-pointer'} `}
                onClick={handleUploadFile}
                >
               Upload

                </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
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
