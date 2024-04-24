import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StaffDashboardNavbar from './components/StaffDashboardNavbar';
import { useNavigate } from 'react-router-dom';

const Remarks = () => {
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [formData, setFormData] = useState({
        serialNumber: '',
        semester: '',
        remarks: '',
        mentorName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleAddData = async () => {
        if (formData.semester && formData.remarks && formData.mentorName) {
            const regNo = studentId;
            const data = {
                "regNo": regNo,
                "remarksInfo": [
                    {
                        "sNo": dataCount + 1,
                        "semester": formData.semester,
                        "remarks": formData.remarks,
                        "mentorName": formData.mentorName
                    }
                ]
            };
    
            // Check if all necessary data is present before sending the request
            if (data.regNo && data.remarksInfo && data.remarksInfo.length > 0) {
                try {
                    const response = await axios.post(serverPath1+'/insert_remarks', data);
                    console.warn(response.data);
                    alert('Remarks data inserted successfully!');
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to insert remarks data. Please try again.');
                }
            } else {
                console.error("Missing data. Please enter all required information.");
            }
    
            // Optionally, update local state after successful submission
            setData((prevData) => [...prevData, { ...formData }]);
            setFormData({
                serialNumber: '',
                semester: '',
                remarks: '',
                mentorName: '',
            });
            setDataCount(dataCount + 1);
        } else {
            console.error("Missing data. Please enter all required information.");
        }
    };
    
    

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
    const navigate=useNavigate()
    const handleBackView=()=>{
      navigate(`/staffdashboard/StudentProfile/${studentId}`);
    }
  
    
    // const dataStudent = [
    //     { label: 'Name', value: 'John Doe' },
    //     { label: 'Age', value: 25 },
    //     { label: 'Location', value: 'City, Country' },
    //     // Add more data as needed
    // ];

    return (
<>
<StaffDashboardNavbar GuideImage={GuideImage} GuideName={GuideName} />
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
                                className="rounded-full absolute  border-white shadow-lg border-2 overflow-hidden h-20 w-20 flex-shrink-0 mr-4 object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Header Design */}
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-bold" style={{ wordBreak: 'break-all' }}>{StudentData.name}</h2>
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
                    <button className="bg-[#811338] text-white px-4 py-2 rounded-md" onClick={handleBackView}>
                        BACK
                    </button>
                </div>
            </div>


            {/* Largest Table */}
          <div className='flex w-full justify-center h-screen overflow-y-scrol items-center my-2 mx-0'>
            <div className="flex-col bg-[#edeef2] space-y-10 border-b-slate-50 shadow-md rounded-lg border-2 m-2 ml-4 mr-4 w-full h-full">
              {/* First Box */}
              <div className='w-full rounded-t-md bg-[#811338] h-20'>
                <h1 className="text-3xl text-white font-mono italic font-thin  mb-4 pt-8 pb-8 px-2">Remarks</h1>
              </div>

                    <div className='flex bg-[#edeef2]  justify-center items-center'>

                        <div className='sm:max-h-full overflow-auto max-h-[calc(100vh-8rem)]'>

                            <div className=" p-4 rounded-md w-full">
                                {/* Buttons arranged in 4 rows and 2 columns */}
                                <div className="flex-col space-y-8">
                                    {/* add the code here  */}
                                    <div className={`p-4 w-full max-w-screen-lg mx-auto rounded-md overflow-hidden ${(dataCount < 1) ? 'space-y-28' : ''}`}>
                                        <div className='overflow-auto max-h-[calc(100vh-8rem)] sm:max-h-full'>
                                            <table className="w-full border-collapse border border-gray-400 whitespace-normal text-center border-opacity-100 border-none">
                                                <thead>
                                                    <tr className='bg-[#811338]'>
                                                        <th className="p-1 rounded-tl-2xl text-white">S.no</th>
                                                        <th className="p-2 text-white">Semester</th>
                                                        <th className="p-2 text-white">Remarks</th>
                                                        <th className="p-2  text-white rounded-tr-xl">Mentor Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((item, index) => (
                                                        <tr key={index} className={index % 2 === 0 ? 'rounded-lg' : 'bg-[#f9afb0] rounded-lg'}>
                                                            <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{index + 1}</p></td>
                                                            <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{item.semester}</p></td>
                                                            <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{item.remarks}</p></td>
                                                            <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{item.mentorName}</p></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-4">
                                            <h2 className="text-lg font-bold mb-2">Add Data </h2>
                                            <form className="flex flex-wrap m-8">
                                                <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
                                                    {/* <label className="block text-sm font-semibold text-gray-600 mb-1">Semester</label> */}
                                                    <input
                                                        type="text"
                                                        name="semester"
                                                        placeholder='Semester'
                                                        value={formData.semester}
                                                        onChange={handleInputChange}
                                                        className="w-full border rounded-md px-3 py-2"
                                                    />
                                                </div>

                                                <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
                                                    {/* <label className="block text-sm font-semibold text-gray-600 mb-1">Remarks</label> */}
                                                    <input
                                                        type="text"
                                                        name="remarks"
                                                        placeholder='Remarks'
                                                        value={formData.remarks}
                                                        onChange={handleInputChange}
                                                        className="w-full border rounded-md px-3 py-2"
                                                    />
                                                </div>

                                                <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
                                                    {/* <label className="block text-sm font-semibold text-gray-600 mb-1">Mentor Name</label> */}
                                                    <input
                                                        type="text"
                                                        name="mentorName"
                                                        placeholder='Mentor Name'
                                                        value={formData.mentorName}
                                                        onChange={handleInputChange}
                                                        className="w-full border rounded-md px-3 py-2"
                                                    />
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={handleAddData}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto "
                                                >
                                                    Add
                                                </button>
                                            </form>
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
        </>
    );
};

export default Remarks;