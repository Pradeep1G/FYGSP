import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StaffDashboardNavbar from '../NavBarComponents/StaffDashboardNavbar';
import { useNavigate } from 'react-router-dom';
import StudentLogin from '../LoginPages/StudentLoginPage';
import StudentNormalNavbar from '../NavBarComponents/StudentNormalNavbar';
import LoadingScreen from '../shared/Loader';

const Remarks = () => {
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [messages,setMessages] = useState();
    const [isLoading,setIsLoading] = useState();
    const [formData, setFormData] = useState({
        semester: '',
        remarks: '',
        date: '',
    });

    const { studentId } = localStorage.getItem("regNo")
    // const serverPath = 'http://127.0.0.1:5000/'; // Adjust to your server address
    const serverPath = "https://fgspserver.onrender.com";

    // Function to fetch remarks data
    const fetchRemarksData = async () => {
        try {
                
            const  studentId = localStorage.getItem("regNo")
            setIsLoading(true);
            const response = await axios.get(`${serverPath}/get_remarks/${studentId}`);
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
        finally{
            setIsLoading(false);
        }
    };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // };

    // const handleAddData = async () => {
    //     if (formData.semester && formData.remarks && formData.date) {
    //         const newRemark = {
    //             sNo: dataCount + 1,
    //             semester: formData.semester,
    //             remarks: formData.remarks,
    //             date: formData.date,
    //         };
    
    //         const data = {
    //             regNo: studentId,
    //             remarksInfo: [newRemark],
    //         };
    
    //         try {
    //             const response = await axios.post(`${serverPath2}/insert_remarks`, data);
    //             console.log('Success:', response.data);
    
    //             // After successfully adding data, fetch the updated remarks
    //             await fetchRemarksData(); // Fetch updated data
    
    //             // Reset the form
    //             setFormData({
    //                 semester: '',
    //                 remarks: '',
    //                 date: '',
    //             });
    
    //             // alert('Remarks data inserted successfully!');
    //         } catch (error) {
    //             console.error('Error:', error);
    //             alert('Failed to insert remarks data. Please try again.');
    //         }
    //     } else {
    //         console.error("Missing data. Please enter all required information.");
    //     }
    // };
    
    useEffect(() => {
        fetchRemarksData(); // Initial fetch
    }, []); // Dependency array left empty to fetch once on component mount



    // const serverPath = "https://fgspserver.onrender.com";
    // const serverPath2 = 'http://127.0.0.1:5000/'
    // const { studentId } = useParams();
    // console.warn(studentId)
    const GuideName = localStorage.getItem("GuideName");
    const GuideImage = localStorage.getItem("GuideImage");
    const studentMailId = localStorage.getItem("StudentMailId")

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


    const reverseDateString = (dateString) => {
        if (!dateString) return ''; // Handle empty or undefined case
        
        const parts = dateString.split('-');
        if (parts.length !== 3) return dateString; // Return original if format is incorrect
        
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    };
    

    useEffect(() => {


        const getStudentData = async () => {
            const studentId = localStorage.getItem("regNo")
            const studentMailId = localStorage.getItem("StudentMailId")
            const data = {
                regNo: studentId,
                mailId:studentMailId,
                guideMail: guideMailId
            }
            const token = localStorage.getItem("jwt_token_student");
          if (!token) {
            navigate("/studentlogin");
            return;
          }
            try{const response = await axios.post(serverPath + "/StudentMenuPage/getLeftSideBarData", data, { headers: { Authorization: `Bearer ${token}` }})
            console.warn(response.data)
            setStudentData((prev)=>response.data.StudentData)
            localStorage.setItem("regNo",response.data.StudentData.regNo)}
            catch(error){
              if (error.response && (error.response.status === 401 || error.response.status === 422)) {
                localStorage.removeItem("jwt_token");
                navigate("/studentlogin");
                return;
              } else {
                console.error("An error occurred:", error);
              }
            }
          }

        


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
            {/* <StaffDashboardNavbar GuideImage={GuideImage} GuideName={GuideName} /> */}
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


                {/* Largest Table */}
                <div className='flex w-full justify-center h-screen overflow-y-scroll items-center my-2 mx-0'>
                <div className="flex-col bg-[#edeef2] space-y-4 shadow-md rounded-lg m-2 ml-4 mr-4 w-full h-full overflow-y-scroll">
              <div className='w-full rounded-t-md bg-[#811338] h-auto lg:h-20 md:h-20'>
                <h1 className="text-3xl text-white font-code mb-4 pt-8 md:pt-5 md:pb-4 pb-8 px-2">Remarks</h1>
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
                                                <th className="p-2  text-white rounded-tr-xl">Date</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {data.map((item, index) => (
                                                <tr key={index} className={index % 2 === 0? 'rounded-lg' : 'bg-[#f9afb0] rounded-lg'}>
                                                <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{index + 1}</p></td>
                                                <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{item.semester}</p></td>
                                                <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{item.remarks}</p></td>
                                                {/* <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{item.date}</p></td> */}
                                                <td><p className="px-4 py-2 lg:max-w-md lg:break-all">{reverseDateString(item.date)}</p></td>
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