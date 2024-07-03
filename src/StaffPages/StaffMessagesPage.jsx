import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StaffDashboardNavbar from '../NavBarComponents/StaffDashboardNavbar';
import { format } from 'date-fns';
import StaffNormalNavbar from '../NavBarComponents/StaffNormalNavbar';
import LoadingScreen from '../shared/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StaffMessages = () => {
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [IsLoading,setIsLoading]=useState();
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
    
    //const serverPath1 = "http://127.0.0.1:5000";
     const serverPath1 = "https://fgspserver.onrender.com";

    const { studentId } = useParams();
    const GuideName = localStorage.getItem("GuideName");
    const GuideImage = localStorage.getItem("GuideImage");
    const [comment, setComment] = useState('');
    const [isSending, setisSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showStudentMessages, setShowStudentMessages] = useState(true);
    const [error1, setError1] = useState('');
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
        
        const token = localStorage.getItem("jwt_token");
        if (!token) {
        navigate("/stafflogin");
        return;
        }
        try{
        const data = {
            regNo: studentId,
            guideMail: guideMailId
        };
        setIsLoading(true);
        const response = await axios.post(serverPath1 + "/getStudentProfileData", data,
        { headers: { Authorization: `Bearer ${token}` }}
        );
        console.warn(response.data);
        setStudentData(response.data.StudentData);
        }catch(error){
            console.error('Error:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 422)) {
            localStorage.removeItem("jwt_token");
            navigate("/stafflogin");
            return;
        }
        }
        finally{
            setIsLoading(false);
        }
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

    const [messages, setMessages] = useState([]);
    const [parentMessages, setParentMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const dataa = {
                "mailId": StudentData.mailId
            };
            console.log(StudentData.mailId);
            const response = await axios.post(`${serverPath1}/getMessages`, dataa);
            console.log(response.data); // Verify data structure in console
            if (response.data && response.data.messages) {
                setMessages(response.data.messages);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchParentMessages = async () => {
        try {
            const dataa = {
                "mailId": StudentData.mailId
            };
            const response = await axios.post(`${serverPath1}/getParentMessages`, dataa);
            if (response.data && response.data.messages) {
                setParentMessages(response.data.messages);
            }
        } catch (error) {
            console.error('Error fetching parent messages:', error);
        }
    };

    useEffect(() => {
        if (showStudentMessages) {
            fetchMessages();
        } else {
            fetchParentMessages();
        }
    }, [StudentData.mailId, showStudentMessages]);

    const navigate = useNavigate();
    const handleBackView = () => {
        navigate(`/staffdashboard/StudentProfile/${studentId}`);
    };

    const handleToggle = () => {
        setShowStudentMessages((prev) => !prev); // Toggle between student and parent messages
    };

   
    const sendComment = async (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd');

        try {
            const data = {
                message: comment,
                "mailId": StudentData.mailId,
                "date": formattedDate
            };

            setisSending(true);

            // Determine the correct URL based on whether student or parent messages are being displayed
            const url = showStudentMessages
                ? `${serverPath1}/sendMessage/${StudentData.mailId}`
                : `${serverPath1}/sendParentMessage/${StudentData.mailId}`;
            setIsLoading(true);
            const response = await axios.post(url, data);
            console.log(response.data);
            if (response.data.message === "SENT") {
                toast.success("Message sent successfully!");
                setisSending(false);
                setComment("");
            
                if (!showStudentMessages) {
                    // Fetch updated parent messages
                    fetchParentMessages();
                } else {
                    // Fetch updated student messages
                    fetchMessages();
                }
                
            } else {
                toast.error("Message not sent, please try again.");
                setisSending(false);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setError1("Message not sent, please try again.");
            setisSending(false);
        }
        finally{
            setIsLoading(false);
        }
    };


    const renderMessages = (messagesList) => {
        const sortedMessages = messagesList.sort((a, b) => {
            const datetimeA = new Date(`${a.date}T${a.time}`);
            const datetimeB = new Date(`${b.date}T${b.time}`);
            return datetimeB - datetimeA;
        });

        return (
            <>
                 {/* <StaffNormalNavbar GuideName={GuideName} GuideImage={GuideImage} /> */}

                <div className='lg:px-10'>
                    <form onSubmit={sendComment} className="mb-4 mt-4">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Type your message..."
                            className="px-3 py-2 border  border-gray-300 rounded-md mr-2"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-[#811338]  text-white px-4 py-2 rounded-md"
                            disabled={isSending}
                        >
                            {isSending ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                </div>
                {successMessage && (
                    <div className="text-green-600">{successMessage}</div>
                )}
                {error1 && (
                    <div className="text-red-600">{error1}</div>
                )}
                <div className="overflow-x-auto lg:px-10">
                    <table className="min-w-full bg-white divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Message</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
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
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{showStudentMessages ? message.message : message.Parentmessages}</td>
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
        {IsLoading && <LoadingScreen/>}
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
                        <button className="bg-[#811338] text-white px-4 py-2 rounded-md" onClick={handleBackView}>
                            BACK
                        </button>
                    </div>
                </div>
                <div className='flex w-full justify-center overflow-y-scroll items-center my-2 mx-0 h-auto'>
                    <div className="flex-col bg-[#edeef2] space-y-10shadow-md rounded-lg  m-2 ml-4 mr-4 w-full h-full">
                        <div className='w-full rounded-t-md bg-[#811338] h-20 flex items-center justify-between px-4'>
                        <h1 className="text-3xl text-white font-code mb-4 pt-8 md:pt-5 md:pb-4 pb-8 px-2">Messages</h1>
                            <button 
    className="bg-white text-[#811338] px-4 py-2 rounded-md"
    onClick={handleToggle}
>
    {showStudentMessages ? (
        <span className="hidden sm:inline font-bold ">Send Message to Parent</span>
    ) : (
        <span className="hidden sm:inline font-bold">Send Message to Student</span>
    )}
    <span className="sm:hidden">
        {showStudentMessages ? 'Parent' : 'Student'}
    </span>
</button>
                        </div>
                        {renderMessages(showStudentMessages ? messages : parentMessages)}
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
};

export default StaffMessages;
