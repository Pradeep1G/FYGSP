import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingScreen from '../shared/Loader';
import { useNavigate } from 'react-router-dom';
import StudentNormalNavbar from './../NavBarComponents/StudentNormalNavbar';

const StudentMessages = () => {
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [formData, setFormData] = useState({
        serialNumber: '',
        semester: '',
        remarks: '',
        mentorName: '',
    });
    const [isLoading, setIsLoading] = useState();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
const serverPath1 = "http://127.0.0.1:5000";
  
    // const serverPath1 = "https://fgspserver.onrender.com";
    const { studentId } = useParams();
    // console.warn(studentId)
    // const GuideName = localStorage.getItem("GuideName");
    // const GuideImage = localStorage.getItem("GuideImage");
    
    // const guideMailId = localStorage.getItem("GuideMailIdToLogin")
  const studentMailId = localStorage.getItem("StudentMailId")


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
          mailId:studentMailId
        }
        try{
            setIsLoading(true);
            const response = await axios.post(serverPath1+"/StudentMenuPage/getLeftSideBarData", data)
            setStudentData(response.data.StudentData)
          }
          catch{

          }
      finally{
        
        setIsLoading(false);
      }
      }
    
      useEffect(()=>{
        getStudentData();
       
      },[])
    

      useEffect(() => {
        // const fetchData = async () => {
        //   try {
        //     // Check for the presence of GuideMailIdToLogin in local storage to determine user type
        //     const guideMailId = localStorage.getItem("GuideMailIdToLogin");
        //     if (!guideMailId) {
        //       setUserType("student");
    
        //       const data = { mailId: studentMailId };
        //       const response = await axios.post(serverPath1 + "/getStudentData", data);
        //       console.warn(response.data.StudentData);
        //       setStudentData(response.data.StudentData);
        //     } else {
        //       setUserType("staff");
        //       getStudentProfileData();
        //     }
        //   } catch (error) {
        //     console.error("Error fetching student data:", error);
        //   }
        // };
    
        const getStudentProfileData = async () => {
            const data = {
              mailId: studentMailId,
              // guideMail: guideMailId
            }
            const token = localStorage.getItem("jwt_token_student");
          if (!token) {
            navigate("/studentlogin");
            return;
          }
            try{const response = await axios.post(serverPath1 + "/StudentMenuPage/getLeftSideBarData", data, { headers: { Authorization: `Bearer ${token}` }})
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
    
        getStudentProfileData();
      }, [studentId, studentMailId]);

      
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
    const [messages, setMessages] = useState([]);
    const fetchMessages = async () => {
      try {
        const dataa = {
          "mailId":StudentData.mailId
        };
        console.log(StudentData.mailId)
        setIsLoading(true);
          const response = await axios.post(`${serverPath1}/getMessages`, dataa);
          console.warn(response.data); // Verify data structure in console
          if (response.data && response.data.messages) {
              setMessages(response.data.messages);
          }
          setIsLoading(false);
      } catch (error) {
          console.error('Error fetching messages:', error);
      }
  };

  useEffect(() => {
      fetchMessages();
  }, [StudentData.mailId]); // Fetch messages data on component mount

  const navigate = useNavigate();
  const handleBackView = () => {
      navigate(`/staffdashboard/StudentProfile/${studentId}`);
  };




    const renderMessages = () => {
        const sortedMessages = messages.sort((a, b) => {
            // Combine date and time into a single datetime for comparison
            const datetimeA = new Date(`${a.date}T${a.time}`);
            const datetimeB = new Date(`${b.date}T${b.time}`);
            
            // Sort in descending order (latest datetime first)
            return datetimeB - datetimeA;
        });
    
      return (
        <>
        <div className="overflow-x-auto lg:px-10">
            <table className="min-w-full bg-white divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Message</th>
                    </tr>
                </thead><tbody className="bg-white divide-y divide-gray-200">
                        {sortedMessages.map((message, index) => (
                            <tr key={index}>
                                {index === 0 || sortedMessages[index - 1].date !== message.date ? (
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        {formatDate(message.date)}
                                    </td>
                                ) : (
                                    <td className="border-b-0"></td> // Empty cell for rowspan effect
                                )}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{message.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{message.message}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    </>
);
};

const formatDate = (dateString) => {
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
return new Date(dateString).toLocaleDateString('en-IN', options).replace(/\//g, '-');
};

    return (
        <>
         {isLoading && <LoadingScreen/>}
            <StudentNormalNavbar  />
            <div className='sm:flex '>
                <div className="p-4 sm:h-screen ml-2 mr-2 m-2 lg:ml-6 bg-[#e9d8de] mx-auto lg:w-96 rounded-md shadow-md relative" style={{ maxWidth: '600px' }}>
                    <div className='w-full rounded-t-md bg-[#811338] h-20 absolute top-0 left-0 right-0'></div>
                    <div className="flex flex-col ">
                        <div className="flex justify-center py-4 px-20">
                            <div className="rounded-full overflow-hidden h-20 w-20 flex-shrink-0 mr-4">
                                <img
                                    src={getDirectLinkFromShareableLink(StudentData.image)}
                                    alt="User Avatar"
                                    className="rounded-full absolute border-white shadow-lg border-2 overflow-hidden h-20 w-20 flex-shrink-0 mr-4 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-bold" style={{ wordBreak: 'break-all' }}>{StudentData.name}</h2>
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
                    <button
                className="bg-[#811338] text-white px-4 py-2 rounded-md ml-0 mr-2"
                onClick={() => {+
                    navigate("/studentdashboard");
                }}
              >
                Back
              </button>
                    </div>
                </div>
                <div className='flex w-full  justify-center h-screen overflow-y-scroll items-center my-2 mx-0'>
                    <div className="flex-col bg-[#edeef2] space-y-10 border-b-slate-50 shadow-md rounded-lg border-2 m-2 ml-4 mr-4 w-full h-full overflow-y-scroll">
                        <div className='w-full rounded-t-md bg-[#811338] h-20'>
                        <h1 className="text-3xl text-white font-code mb-4 pt-8 md:pt-5 md:pb-4 pb-8 px-2">Messages</h1>
                        </div>
                        {renderMessages()}
                        <div>
                          {/* display table and show messages 
                          of date and time */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentMessages;
