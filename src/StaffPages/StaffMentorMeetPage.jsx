import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StaffDashboardNavbar from '../NavBarComponents/StaffDashboardNavbar';

const MentorMeetings = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState([]);
    const [formData, setFormData] = useState({
        semester: '',
        remarks: '',
        menteeName: '',
        date: '',
        venue: '',
        natureOfCon: '',
        issues: '',
        pointsDiss: '',
        remarkOnMentee: '',
    });

    const GuideName = localStorage.getItem("GuideName");
    const GuideImage = localStorage.getItem("GuideImage");
    const guideMailId = localStorage.getItem("GuideMailIdToLogin");
    const serverPath = "https://fgspserver.onrender.com";
    const serverPath1 = "http://127.0.0.1:5000/"
    const [studentData, setStudentData] = useState({
        image: "",
        regNo: "",
        mailId: "",
        phoneNo: "",
        name: "",
    });

    const getStudentData = async () => {
        try {
            const response = await axios.post(`${serverPath1}/getStudentProfileData`, {
                regNo: studentId,
                guideMail: guideMailId,
            });
            setStudentData(response.data.StudentData);
        } catch (error) {
            console.error('Failed to fetch student data:', error);
        }
    };

    const getMeetings = async () => {
        try {
            const response = await axios.get(`${serverPath1}/get_meetings/${studentId}`);
    
            // Check if the response contains the 'meetings' array
            if (response.data && Array.isArray(response.data.meetings)) {
                // The meetings are already in the correct format, no need to map or flatten
                setMeetings(response.data.meetings);
                console.log('Meetings:', response.data.meetings);
            } else {
                console.error('No meetings found in the response.');
            }
        } catch (error) {
            console.error('Failed to fetch meetings:', error);
        }
    };
    

    useEffect(() => {
        getStudentData();
        getMeetings();
    }, []); // Fetch data when component mounts

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleAddData = async () => {
        try {
            const newMeeting = {
                regNo: studentId,
                Meeting: {
                    sno: meetings.length + 1, // increment sno based on length of existing data
                    semester: formData.semester,
                    menteeName: formData.menteeName,
                    date: formData.date,
                    venue: formData.venue,
                    natureOfCounseling: formData.natureOfCon,
                    issuesDiscussed: formData.issues,
                    pointsDiscussed: formData.pointsDiss,
                    remarks: formData.remarkOnMentee,
                },
            };
    
            const response = await axios.post(`${serverPath1}/insert_meeting`, newMeeting);
            console.log(response.data);
    
            setMeetings([...meetings, newMeeting.Meeting]); // Update the state to reflect the added data
            setFormData({
                semester: '',
                remarks: '',
                menteeName: '',
                date: '',
                venue: '',
                natureOfCon: '',
                issues: '',
                pointsDiss: '',
                remarkOnMentee: '',
            });
    
            // Refetch the data to ensure accuracy
            getMeetings();
        } catch (error) {
            console.error('Failed to add meeting:', error);
            alert('Failed to add meeting. Please try again.');
        }
    };
    

    const handleBackView = () => {
        navigate(`/staffdashboard/StudentProfile/${studentId}`);
    };

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

    return (
        <>
            <StaffDashboardNavbar GuideImage={GuideImage} GuideName={GuideName} />
            <div className='sm:flex'>
                <div className="p-4 sm:h-screen ml-2 mr-2 m-2 lg:ml-6 bg-[#e9d8de] mx-auto lg:w-96 rounded-md shadow-md relative">
                    <div className='w-full rounded-t-md bg-[#811338] h-20 absolute top-0 left-0 right-0'></div>
                    <div className="flex flex-col ">
                        <div className="flex justify-center py-4 px-20">
                            <div className="rounded-full overflow-hidden h-20 w-20 flex-shrink-0 mr-4">
                                <img
                                    src={getDirectLinkFromShareableLink(studentData.image)}
                                    alt="User Avatar"
                                    className="rounded-full absolute border-white shadow-lg border-2 overflow-hidden h-20 w-20 flex-shrink-0 mr-4 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-bold" style={{ wordBreak: 'break-all' }}>{studentData.name}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col text-left ">
                            <p className="mb-4 text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Register Number</p>
                            <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Section</p>
                        </div>
                        <div className="flex flex-col text-left">
                            <p className="mb-4 text-sm text-gray-600">{studentData.regNo}</p>
                            <p className="text-sm text-gray-600">E3</p>
                        </div>
                        <div className="flex flex-col text-left">
                            <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Email</p>
                        </div>
                        <div className="flex flex-col text-left">
                            <p className=" text-sm text-gray-600" style={{ wordBreak: 'break-all' }}>{studentData.mailId}</p>
                        </div>
                        <div className="flex flex-col text-left">
                            <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Phone</p>
                        </div>
                        <div className="flex flex-col text-left">
                            <p className="text-sm text-gray-600">{studentData.phoneNo}</p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-[#811338] text-white px-4 py-2 rounded-md"
                            onClick={handleBackView}
                        >
                            BACK
                        </button>
                    </div>
                </div>

                <div className='flex w-full justify-center h-screen overflow-y-scroll items-center my-2 mr-0'>
                    <div className="flex-col bg-[#edeef2] space-y-4 border-b-slate-50 shadow-md rounded-lg border-2 m-2 ml-4 mr-4 w-full h-full">
                        <div className='w-full rounded-t-md bg-[#811338] h-20'>
                            <h1 className="text-3xl text-white font-mono italic font-thin mb-4 pt-8 pb-8 px-2">Mentor Meetings</h1>
                        </div>

                        <div className='flex bg-[#edeef2] justify-center items-center'>
                            <div className='sm:max-h-full overflow-auto max-h-[calc(100vh-8rem)]'>
                                <div className="p-4 rounded-md w-full">
                                    <div className="flex-col space-y-8">
                                        <div className={`p-4 w-full max-w-screen-lg mx-auto rounded-md overflow-hidden flex-col ${meetings.length <= 1 ? 'space-y-28' : ''}`}>
                                            <div>
                                                <div className='overflow-auto max-h-[calc(100vh-8rem)] sm:max-h-full'>
                                                    <table className="w-full border-collapse border border-gray-400 whitespace-normal text-center">
                                                        <thead>
                                                            <tr className='bg-[#811338]'>
                                                                <th className="p-2 text-white">S.no</th>
                                                                <th className="p-2 text-white">Mentee Name</th>
                                                                <th className="p-2 text-white">Semester</th>
                                                                <th className="p-2 text-white">Date</th>
                                                                <th className="p-2 text-white">Venue</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {meetings.map((item, index) => (
                                                                <tr key={index} className={index % 2 === 0 ? 'rounded-lg' : 'bg-[#f9afb0] rounded-lg'}>
                                                                    <td><p className="p-4 lg:break-all">{index + 1}</p></td>
                                                                    <td><p className="p-4 lg:break-all">{item.menteeName}</p></td>
                                                                    <td><p className="p-4 lg:break-all">{item.semester}</p></td>
                                                                    <td><p className="p-4 lg:break-all">{item.date}</p></td>
                                                                    <td><p className="p-4 lg:break-all">{item.venue}</p></td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className='overflow-auto max-h-[calc(100vh-8rem)] sm:max-h-full'>
                                                    <table className="w-full border-collapse border border-gray-400 whitespace-normal text-center mt-8">
                                                        <thead>
                                                            <tr className='bg-[#811338]'>
                                                                <th className='p-2 rounded-tl-xl text-white'>Nature of Counselling Given</th>
                                                                <th className='p-2 text-white'>Issues</th>
                                                                <th className='px-0 text-white'>Points Discussed</th>
                                                                <th className='p-2 rounded-tr-xl text-white'>Remarks</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {meetings.map((item, index) => (
                                                                <tr key={index} className={index % 2 === 0 ? 'rounded-lg' : 'bg-[#f9afb0] rounded-lg'}>
                                                                    <td><p className="p-4 lg:break-all">{item.natureOfCounseling}</p></td>
                                                                    <td><p className="p-4 lg:break-all">{item.issuesDiscussed}</p></td>
                                                                    <td><p className="p-4 lg:break-all">{item.pointsDiscussed}</p></td>
                                                                    <td><p className="p-4 lg:break-all">{item.remarks}</p></td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <h2 className="text-xl font-bold mb-2">Add Data</h2>
                                                <form className="flex flex-wrap m-6">
                                                    <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                                        <input
                                                            type="text"
                                                            name="semester"
                                                            placeholder='Semester'
                                                            value={formData.semester}
                                                            onChange={handleInputChange}
                                                            className="w-full border rounded-md px-3 py-2"
                                                        />
                                                    </div>

                                                    <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                                        <input
                                                            type="text"
                                                            name="remarkOnMentee"
                                                            placeholder='Remarks'
                                                            value={formData.remarkOnMentee}
                                                            onChange={handleInputChange}
                                                            className="w-full border rounded-md px-3 py-2"
                                                        />
                                                    </div>

                                                    <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                                        <input
                                                            type="text"
                                                            name="menteeName"
                                                            placeholder='Mentee Name'
                                                            value={formData.menteeName}
                                                            onChange={handleInputChange}
                                                            className="w-full border rounded-md px-3 py-2"
                                                        />
                                                    </div>

                                                    <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                                        <input
                                                            type="text"
                                                            name="venue"
                                                            placeholder='Venue'
                                                            value={formData.venue}
                                                            onChange={handleInputChange}
                                                            className="w-full border rounded-md px-3 py-2"
                                                        />
                                                    </div>

                                                    <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                                        <input
                                                            type="text"
                                                            name="natureOfCon"
                                                            placeholder='Nature of Counselling given'
                                                            value={formData.natureOfCon}
                                                            onChange={handleInputChange}
                                                            className="w-full border rounded-md px-3 py-2"
                                                        />
                                                    </div>

                                                    <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                                        <input
                                                            type="text"
                                                            name="issues"
                                                            placeholder='Issues'
                                                            value={formData.issues}
                                                            onChange={handleInputChange}
                                                            className="w-full border rounded-md px-3 py-2"
                                                        />
                                                    </div>

                                                    <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                                        <input
                                                            type="text"
                                                            name="pointsDiss"
                                                            placeholder='Points Discussed'
                                                            value={formData.pointsDiss}
                                                            onChange={handleInputChange}
                                                            className="w-full border rounded-md px-3 py-2"
                                                        />
                                                    </div>

                                                    <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                                        <input
                                                            type="date"
                                                            name="date"
                                                            placeholder='Date'
                                                            value={formData.date}
                                                            onChange={handleInputChange}
                                                            className="w-full border rounded-md px-3 py-2"
                                                        />
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={handleAddData}
                                                        className="bg-[#811338] w-1/4 text-white px-5 py-2 rounded-md ml-auto"
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

                    </div>
                </div>
            </div>
        </>
    );
};

export default MentorMeetings;
