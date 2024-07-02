import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StaffDashboardNavbar from '../NavBarComponents/StaffDashboardNavbar';
import { useNavigate } from 'react-router-dom';


const Remarks = () => {
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [messages,setMessages] = useState();
    const [formData, setFormData] = useState({
        semester: '',
        remarks: '',
        mentorName: '',
    });

    const { studentId } = useParams();
    const serverPath2 = 'http://127.0.0.1:5000/'; // Adjust to your server address

    // Function to fetch remarks data
    const fetchRemarksData = async () => {
        let regnotesting = '43111024'
        try {
            const response = await axios.get(`${serverPath2}/get_remarks/${regnotesting}`);
            setData(response.data.remarksInfo);
            setDataCount(response.data.remarksInfo.length); // Update count
            
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessages("No remarks found for this registration number");
              } else {
                console.warn(error.response.data.message);
                setMessages(error.response.data.message);
              }
              console.error('Failed to fetch remarks:', error);
        }
    };

    
    useEffect(() => {
        fetchRemarksData(); // Initial fetch
    }, []); // Dependency array left empty to fetch once on component mount



    // const serverPath = "https://fgspserver.onrender.com";
    // const serverPath2 = 'http://127.0.0.1:5000/'
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
        const response = await axios.post(serverPath2 + "/getStudentProfileData", data)
        console.warn(response.data)
        setStudentData(response.data.StudentData)
    }


    useEffect(() => {
        getStudentData();
        fetchRemarksData();
    }, [])


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
    const navigate = useNavigate()
    const handleBackView = () => {
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
                                    {messages? (
                                        <div className="alert alert-warning shadow-lg rounded px-4 py-2 bg-slate-400">
                                     <h1 className="text-lg font-bold text-gray-700">{messages}</h1>
                                    </div>
                                    ) : (
                                    <div className={`p-4 w-full max-w-screen-lg mx-auto rounded-md overflow-hidden ${(dataCount < 1)? 'pace-y-28' : ''}`}>
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
                                                <tr key={index} className={index % 2 === 0? 'rounded-lg' : 'bg-[#f9afb0] rounded-lg'}>
                                                <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{index + 1}</p></td>
                                                <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{item.semester}</p></td>
                                                <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{item.remarks}</p></td>
                                                <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{item.mentorName}</p></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                    )}
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