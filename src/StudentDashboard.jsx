import axios from "axios";
import { useEffect,useState } from "react";
import './Navbar.css'; 
import { FiMenu } from 'react-icons/fi'; // Assuming you want to use the Feather icon pack
import { useNavigate } from "react-router-dom";
import sistlogologin from './assets/sistlogologin.png';
import LoadingScreen from "./shared/Loader";
// import DisplayStudentDetails from "./DisplayStudentDetails";
// import Footer from "./shared/Footer";
import { format } from "date-fns";

export default function StudentDashboard()
{

    // const serverPath1 = "http://127.0.0.1:5000"
      const serverPath1 = "https://fgspserver.onrender.com"
    
    const [isLoading, setIsLoading] = useState();

    const StudentMailId = localStorage.getItem("StudentMailId");
    const [StudentData, setStudentData] = useState();
    const [img, setImg] = useState();
    const navigate = useNavigate();
    const [LatestMessage, setLatestMessage] = useState();
    const [OldMessages, setOldMessages] = useState();


    const [isSidebarOpen, setSidebarOpen] = useState(false);



    function getDirectLinkFromShareableLink(shareableLink) {
        try {
          const fileIdMatch = shareableLink.match(/\/file\/d\/(.*?)\//);
          if (fileIdMatch && fileIdMatch[1]) {
            const fileId = fileIdMatch[1];
            return `https://drive.google.com/uc?id=${fileId}`;
          } else {
            throw new Error("Invalid shareable link format");
          }
        } catch (error) {
          console.error("Error processing shareable link:", error.message);
          return null;
        }
      }










    const handleMenuClick = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  
    const handleLogout = () => {
      // Implement your logout logic here
      console.log('Logout clicked!');
    };


    const getComments = async()=>{
    //   e.preventDefault();

     console.warn(StudentMailId)


      try{

         const data = {
            "mailId" : StudentMailId,    
         }


      const response = await axios.post(serverPath1+"/getStudentData", data)
      console.warn(response.data);
      if(response.data.message == "SUCCESS")
      {
        setStudentData(response.data.StudentData);
        setLatestMessage(response.data.LatestMessage);
        setOldMessages(response.data.OldMessages);
        
      }
      else{
      }
    }
    catch(error){
        navigate("/studentlogin")
    }
    }

    useEffect(()=>{

        if(!StudentMailId){
            navigate("/studentlogin")
        }

          // Function to close the sidebar initially
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Close the sidebar on component mount
  closeSidebar();

        getComments();
    },[]);




    // if(GuideMailId){

    return(


        <>
        {/* {true && <LoadingScreen />} */}

        
        <div className='flex flex-col min-h-screen'>
        
        {/* <div className=""> */}


            <nav className="flex items-center justify-between bg-[#9e1c3f] p-10 py-5">
                    <div className="flex items-center">
                    <a href="/">
                        <img
                        src={sistlogologin}
                        alt="Logo"
                        className="object-scale-down h-35 w-80 px-3 pt-3"
                        />
                    </a>
                    </div>
                    <div className={`lg:flex items-center space-x-10 text-white `}>
                    
                    </div>
                    <div className="flex items-center">
                    <button
                        onClick={handleMenuClick}
                        className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#9e1c3f] focus:ring-white"
                    >
                        <FiMenu size={36} />
                    </button>
                    </div>
            </nav>



                {StudentData && ( // Check if GuideDetails is not null or undefined
                <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                    <div className="sidebar-content pt-20">

                    <div className="w-40 h-40  overflow-hidden rounded-full">
                        {StudentData.image && <img 
                        src={getDirectLinkFromShareableLink(StudentData.image)} 
                        alt=""
                        className="" />}
                    </div>

                    <div className="pt-2 font-bold max-w-fit text-xl">
                        <p>{StudentData.name}</p>
                    </div>

                    <div className="pt-6 p text-base font-semibold">
                        <p>{StudentData.regNo}&nbsp;-&nbsp;{StudentData.section}</p>
                    </div>

                    <div className="pt-2 text-sm font-semibold">
                        <p>{StudentMailId}</p>
                    </div>

                    <div className="pt-2 text-sm font-semibold">
                        <p>{StudentData.phoneNo}</p>
                    </div>


                    <div className="pt-6 pb-10 text-sm font-semibold">
                        <p>Your Mentor : {StudentData.MentorName}</p>
                    </div>

                    

                    




                    <button
                    className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-sm"
                     onClick={()=>{
                        localStorage.removeItem("StudentMailId")
                        navigate("/")
                    }}>Logout</button>
                    </div>
                </div>
                )}
        {/* </div> */}



        

        <div className={`flex-grow justify-center   pt-24 pb-10 px-10  bg-red-50 md:blur-0 ${isSidebarOpen ? "blur-sm md:pr-96":""}`}>


        <div className="flex flex-col items-center w-full">
        <p className="flex justify-center pb-4 text-xl font-bold">Recent Message</p>


            <div className="flex flex-col bg-white max-w-5xl w-full rounded-lg p-5">

    
            {LatestMessage &&
                Object.entries(LatestMessage).map(([date, message]) => (
                <div key={date} className="text-lg font-semibold">

                        <div className="flex space-x-8"><p>Date</p> <p className="font-bold">:</p><p>{date.slice(0, 10)}</p> </div>
                        <div className="flex space-x-8"><p>Time</p> <p className="font-bold">:</p><p>{date.slice(11, 16)}</p> </div>
                        <div className="flex space-x-8 pt-4"><p>Message</p> <p className="font-bold">:</p><p>{message}</p> </div>
                </div>
                ))}

            {!LatestMessage && <p>There are no messages yet.</p>}
  
            </div>

            </div>




            <div className="flex flex-col items-center w-full pt-5">
            <p className="flex justify-center pb-2 text-xl font-bold">Past Messages</p>

                {OldMessages &&
                Object.entries(OldMessages).map(([index, messagesObject]) => (
                    <div key={index} className=" flex flex-col max-w-5xl w-full rounded-lg py-4">
                    <div className="text-lg font-semibold bg-white p-5 rounded-lg">
                    {Object.entries(messagesObject).map(([date, message]) => (
                        
                        <div key={date}>
                        <div className="flex space-x-8"><p>Date</p> <p className="font-bold">:</p><p>{date.slice(0, 10)}</p> </div>
                        <div className="flex space-x-8"><p>Time</p> <p className="font-bold">:</p><p>{date.slice(11, 16)}</p> </div>
                        <div className="flex space-x-8 pt-4"><p>Message</p> <p className="font-bold">:</p><p>{message}</p> </div>
                        </div>
                    ))}
                    </div>
                    </div>
                ))}
            </div>

        </div>
        {/* <Footer /> */}
        </div>
        </>
    )
    // }
    // else{
    //     navigate("/stafflogin")
    // }
}