import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StaffDashboardNavbar from './components/StaffDashboardNavbar';
import { useNavigate } from 'react-router-dom';

const MentorMeetings = () => {


    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    // setDataCount(data[0]["serialNumber"])
    // console.log(dataCount);


    const [formData, setFormData] = useState({
        serialNumber: '',
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleAddData = async () => {
        if (
            formData.semester &&
            formData.menteeName &&
            formData.date &&
            formData.venue &&
            formData.natureOfCon &&
            formData.issues &&
            formData.pointsDiss &&
            formData.remarkOnMentee
        ) {
            const regNo = "41111131";
            const data = {
                "regNo": regNo,
                "Meeting": [
                    {
                        "sno": 1,
                        "semester": formData.semester,
                        "menteeName":formData.menteeName,
                        "date": formData.date,
                        "venue": formData.venue,
                        "natureOfCounseling": formData.natureOfCon,
                        "issuesDiscussed": formData.issues,
                        "pointsDiscussed": formData.pointsDis,
                        "remarks": formData.remarkOnMentee
                    }
                ]
            };
    
            try {
                const response = await axios.post('http://127.0.0.1:5000/insert_meeting', data);
                console.warn(response.data);
                alert('meeting data inserted successfully!');
                
                // Optionally, update local state after successful submission
                setData((prevData) => [...prevData, { ...formData }]);
                setFormData({
                    serialNumber: '',
                    semester: '',
                    remarks: '',
                    mentorName: '',
                    date: '',
                    venue: '',
                    natureOfCounseling: '',
                    issuesDiscussed: '',
                    pointsDiscussed: '',
                    menteeName: '',
                });
                setDataCount(dataCount + 1);
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to insert remarks data. Please try again.');
            }
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
            <div className='flex w-full justify-center h-screen overflow-y-scroll items-center  my-2 mr-0'>
            <div className="flex-col bg-[#edeef2] space-y-4 border-b-slate-50 shadow-md rounded-lg border-2 m-2 ml-4 mr-4 w-full h-full">
              {/* First Box */}
              <div className='w-full rounded-t-md bg-[#811338] h-20'>
                <h1 className="text-3xl text-white font-mono italic font-thin  mb-4 pt-8 pb-8 px-2">Mentor Meetings</h1>
              </div>
                    <div className='flex bg-[#edeef2]  justify-center items-center'>

                        <div className='sm:max-h-full overflow-auto max-h-[calc(100vh-8rem)]'>

                            <div className=" p-4 rounded-md w-full">
                                {/* Buttons arranged in 4 rows and 2 columns */}
                                <div className="flex-col space-y-8">
                                    {/* add the code here  */}
                                    <div className={`p-4 w-full max-w-screen-lg mx-auto rounded-md overflow-hidden flex-col ${dataCount <= 1 ? 'space-y-28' : ''}`}>
                                        <div>
                                            <div className='overflow-auto max-h-[calc(100vh-8rem)] sm:max-h-full'>
                                                <table className="w-full border-collapse border border-gray-400 whitespace-normal text-center border-opacity-100 border-none">
                                                    <thead>
                                                        <tr className='bg-[#811338]'>
                                                            <th className="p-0 rounded-tl-2xl text-white">S.no</th>
                                                            <th className="p-2 text-white">Mentee Name</th>
                                                            <th className="p-2 text-white">Semester</th>
                                                            <th className="p-2 text-white">Date</th>
                                                            <th className="p-2 text-white rounded-tr-xl">Venue</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody >
                                                        {data.map((item, index) => (
                                                            <tr key={index} className={index % 2 === 0 ? 'rounded-lg' : 'bg-[#f9afb0] rounded-lg'}>
                                                                <td className='lg:max-w-md'><p className="p-4 lg:break-all">{index + 1}</p></td>
                                                                <td className='lg:max-w-md'><p className="p-4 lg:break-all">{item.mentorName}</p></td>
                                                                <td className='lg:max-w-md'><p className="p-4 lg:break-all">{item.semester}</p></td>
                                                                <td className='lg:max-w-md'><p className="p-4 lg:break-all">{item.date}</p></td>
                                                                <td className='lg:max-w-md'><p className="p-4 lg:break-all">{item.venue}</p></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='overflow-auto max-h-[calc(100vh-8rem)] sm:max-h-full'>
                                                <table className="w-full border-collapse border border-gray-400 whitespace-normal text-center border-opacity-100 border-none mt-8">
                                                    <thead>
                                                        <tr className='bg-[#811338]'>
                                                            <th className='p-2 rounded-tl-xl text-white'>Nature of Counselling Given</th>
                                                            <th className='p-2 text-white'>Issues</th>
                                                            <th className='px-0 text-white'>Points Discussed</th>
                                                            <th className='p-2 rounded-tr-xl text-white'>Remarks</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.map((item, index) => (
                                                            <tr key={index} className={index % 2 === 0 ? 'rounded-lg' : 'bg-[#f9afb0] rounded-lg'}>
                                                                <td className='lg:max-w-md'><p className="p-4 lg:break-all">{item.natureOfCon}</p></td>
                                                                <td className='lg:max-w-md'><p className="p-4 lg:break-all">{item.issues}</p></td>
                                                                <td className='lg:max-w-md'><p className="p-4 lg:break-all">{item.pointsDiss}</p></td>
                                                                <td className='lg:max-w-md'><p className="p-4 lg:break-all">{item.remarkOnMentee}</p></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h2 className="text-xl font-bold mb-2">Add Data </h2>
                                            <form className="flex flex-wrap m-6 ">
                                                <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
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

                                                <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                                    {/* <label className="block text-sm font-semibold text-gray-600 mb-1">Remarks</label> */}
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
                                                    {/* <label className="block text-sm font-semibold text-gray-600 mb-1">Mentor Name</label> */}
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
                                                    {/* <label className="block text-sm font-semibold text-gray-600 mb-1">Mentor Name</label> */}
                                                    <input
                                                        type="Address"
                                                        name="venue"
                                                        placeholder='Venue'
                                                        value={formData.venue}
                                                        onChange={handleInputChange}
                                                        className="w-full border rounded-md px-3 py-2"
                                                    />
                                                </div>

                                                <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                                    {/* <label className="block text-sm font-semibold text-gray-600 mb-1">Mentor Name</label> */}
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
                                                    {/* <label className="block text-sm font-semibold text-gray-600 mb-1">Mentor Name</label> */}
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
                                                    {/* <label className="block text-sm font-semibold text-gray-600 mb-1">Mentor Name</label> */}
                                                    <input
                                                        type="text"
                                                        name="pointsDiss"
                                                        placeholder='Points Dissussed'
                                                        value={formData.pointsDiss}
                                                        onChange={handleInputChange}
                                                        className="w-full border rounded-md px-3 py-2"
                                                    />
                                                </div>
                                                <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                                                    {/* <label className="block text-sm font-semibold text-gray-600 mb-1">Mentor Name</label> */}
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
                                                    className="bg-[#811338] w-1/4 text-white px-5 py-2 rounded-md ml-auto justify-start items-start "
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

export default MentorMeetings;