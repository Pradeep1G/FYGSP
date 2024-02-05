import axios from "axios";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { FiMenu, FiSearch } from "react-icons/fi"; // Assuming you want to use the Feather icon pack
import { useNavigate } from "react-router-dom";
import sistlogologin from "./assets/sistlogologin.png";
import LoadingScreen from "./shared/Loader";
import DisplayStudentDetails from "./DisplayStudentDetails";
import StaffDashboardNavbar from "./components/StaffDashboardNavbar";
import Footer from "./shared/Footer";
import { format } from "date-fns";
import adeepA from "./components/adeepA.jpg";
import StudentCard from "./components/StudentCard";

export default function StaffDashboard() {
  // const serverPath1 = "http://127.0.0.1:5000"
  const serverPath1 = "https://fgspserver.onrender.com";

  const [isLoading, setIsLoading] = useState();

  const GuideMailId = localStorage.getItem("GuideMailIdToLogin");
  const [AllStudents, setAllStudents] = useState([]);
const [filteredStudents, setFilteredStudents] = useState([]);

  const [GuideDetails, setGuideDetails] = useState(
    {DESIGNATION:"", DOMAIN1:"", DOMAIN2:"",  DOMAIN3:"", EMPID:"", IMAGE:"", NAME:"", UniversityEMAILID:"", VACANCIES:"", id:" ", });
  const [img, setImg] = useState();
  const navigate = useNavigate();

  const getGuideData = async (e) => {
    setIsLoading(true);
    const response = await axios.post(serverPath1 + "/getGuideData", {
      GuideMailId: GuideMailId,
    });
    console.warn(response.data);
    setGuideDetails(response.data.GuideDetails);
    setAllStudents(response.data.AllStudents);
    setFilteredStudents(response.data.AllStudents);
    console.warn(filteredStudents)
    localStorage.setItem("GuideName", GuideDetails.NAME)
    // setImg(GuideDetails.IMAGE);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!GuideMailId) {
      navigate("/stafflogin");
    }
    getGuideData();
  }, []);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked!");
  };

  const [OpenCommentBox, setOpenCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [Error1, setError1] = useState("");
  const [isSending, setisSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const sendComment = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");
    console.warn(formattedDate);

    try {
      const data = {
        message: comment,
        mailIds: AllStudents,
        date: formattedDate,
      };

      setisSending(true);

      const response = await axios.post(
        serverPath1 + "/sendMessageToAll",
        data
      );
      console.warn(response.data);
      if (response.data.message == "SENT") {
        setSuccessMessage("Message sent successfully!");
        setOpenCommentBox(false);
        setisSending(false);
        setComment("");

        setTimeout(() => {
          setSuccessMessage("");
          setError1("");
        }, 2000);
      } else {
        setError1("Not sent try again.");
      }
    } catch (error) {
      setError1("Not sent try agin.");
    }
  };

  function getDirectLinkFromShareableLink(shareableLink) {
    try {
      const fileIdMatch = shareableLink.match(/\/uc\?id=(.*?)(&|$)/);
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

  // if(GuideMailId){
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Filter guides based on the search query
    const filteredStudents = AllStudents.filter((student) =>
      student["name"].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filteredStudents);
  }, [searchQuery]);

  const handleSearch=(searchItem) => {
    setSearchQuery(searchItem);
  }
  const [StaffSidebar, setStaffSidebar] = useState(false);
  const OpenStaffSidebar=()=>{
    setStaffSidebar(!StaffSidebar)
  }

  return (
    <>
      {true ? (
        <>
          {/* <LoadingScreen /> */}
          <StaffDashboardNavbar OpenStaffSidebar={OpenStaffSidebar} GuideName={GuideDetails.NAME} handleSearch={handleSearch}/>




    <div className='sm:flex flex-row-reverse'>





      <div className={`p-4 sm:h-screen h-auto border-b-slate-50  border-2 m-2 lg:mr-6 bg-[#e9d8de] lg:max-w-xl rounded-md shadow-md relative ${StaffSidebar ? "hidden":"block" }`}>
      <div className='w-full rounded-t-md bg-[#811338] h-20 absolute top-0 left-0 right-0'></div>
        {/* Large Box */}
        <div className="flex flex-col ">
          <div className="flex justify-center py-4 px-20">
            <div className="rounded-full overflow-hidden h-24 w-24 flex-shrink-0 mr-4">
              <img
                src={getDirectLinkFromShareableLink(GuideDetails.IMAGE)}
                alt={GuideDetails.NAME}
                className="rounded-full absolute border-2 overflow-hidden h-24 w-24 flex-shrink-0 mr-4 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Header Design */}
        <div className="mb-4 text-center max-w-sm">
          <h2 className="text-2xl font-bold break-all">{GuideDetails.NAME}</h2>
        </div>

        <div className="mb-4 text-center max-w-xs">
          <p className="break-all">{GuideDetails.UniversityEMAILID}</p>
        </div>

        
        <div className="flex justify-center mt-4">
          <button className="bg-[#811338] text-white px-4 py-2 rounded-md"
          onClick={() => {
                    localStorage.removeItem("GuideMailIdToLogin");
                    navigate("/");
                  }}
                >
                  Logout
          </button>
        </div>
      </div>



        {/* Largest Table */}
        <div className='flex w-full min-h-screen justify-center  items-center my-2 mx-0 '>
        <div className="flex-col  bg-red-50 space-y-10 pt-5 border-b-slate-50 shadow-md rounded-lg border-2 m-2 lg:m-6 w-full h-full ">
          
          <div className='flex bg-red-50  justify-center items-center'>

            <div>







            <div
              className={`bg-red-50 flex  flex-wrap gap-8   ${
                isSidebarOpen ? "lg:px-52 justify-start" : "justify-center"
              }`}
            >
              {AllStudents &&
                filteredStudents.map((item, index) => {
                  return (
                    <>
                      <StudentCard
                        key={index}
                        img={item.image}
                        name={item.name}
                        regNo={item.regNo}
                        mailId={item.mailId}
                        phoneNo={item.phoneNo}
                        guideName={GuideDetails.NAME}
                        guideImage={GuideDetails.IMAGE}
                        // address={item.address}
                        // section={item.section}
                      />
                    </>
                  );
                })}
              {/* <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"></img> */}
              {/* <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"></img> */}
            </div>





            
              
            </div>

          </div>
          
        </div>
      </div>

      
    </div>


















        </>
      ) : (
        <div className="flex flex-col min-h-screen">
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
            <div
              className={`lg:flex items-center space-x-10 text-white `}
            ></div>
            <div className="flex items-center">
              <button
                onClick={handleMenuClick}
                className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#9e1c3f] focus:ring-white"
              >
                <FiMenu size={36} />
              </button>
            </div>
          </nav>

          {GuideDetails && ( // Check if GuideDetails is not null or undefined
            <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
              <div className="sidebar-content pt-20">
                <div className="w-40 h-40  overflow-hidden rounded-full">
                  {GuideDetails.IMAGE && (
                    <img
                      src={getDirectLinkFromShareableLink(GuideDetails.IMAGE)}
                      alt=""
                      className=""
                    />
                  )}
                </div>

                <div className="pt-10 font-bold text-2xl">
                  <p>{GuideDetails.NAME}</p>
                </div>

                <div className="pt-4 pb-10 font-semibold">
                  <p>{GuideDetails.UniversityEMAILID}</p>
                </div>

                {!OpenCommentBox && (
                  <button
                    className={`bg-red-900 flex justify-around text-white px-6 py-2 rounded-md my-2 text-sm ${
                      isSending ? "cursor-none" : "cursor-pointer"
                    } `}
                    onClick={() => {
                      setOpenCommentBox(true);
                    }}
                  >
                    Circulate A Message
                  </button>
                )}

                {OpenCommentBox && (
                  <div>
                    <textarea
                      className="border-2 h-16 px-4 w-full bg-gray-200 mb-4"
                      type="text"
                      rows={2}
                      placeholder="Message"
                      value={comment}
                      required
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex justify-around">
                      <button
                        onClick={sendComment}
                        className={`bg-red-900 flex justify-around text-white px-6 py-2 rounded-md my-2 text-sm ${
                          isSending ? "cursor-not-allowed" : ""
                        }`}
                      >
                        {isSending ? "Sending..." : "send"}
                      </button>

                      <button
                        onClick={() => {
                          setOpenCommentBox(false);
                          setisSending(false);
                          setComment("");
                        }}
                        className="bg-red-900 flex justify-around text-white px-6 py-2 rounded-md my-2 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {successMessage && (
                  <p className="text-green-600">{successMessage}</p>
                )}

                {Error1 && <p className="text-red-600">{Error1}</p>}

                <button
                  className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-sm"
                  onClick={() => {
                    localStorage.removeItem("GuideMailIdToLogin");
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          {/* </div> */}

          <div
            className={`flex-grow  pt-24 pb-10 px-10  bg-red-50 md:blur-0 ${
              isSidebarOpen ? "blur-sm" : ""
            }`}
          >
            <div
              className={`bg-red-50 flex  flex-wrap gap-8   ${
                isSidebarOpen ? "lg:px-52 justify-start" : "justify-center"
              }`}
            >
              {AllStudents &&
                AllStudents.map((item) => {
                  return (
                    <>
                      <DisplayStudentDetails
                        key={item.mailId}
                        img={item.image}
                        name={item.name}
                        regNo={item.regNo}
                        mailId={item.mailId}
                        phoneNo={item.phoneNo}
                        // address={item.address}
                        // section={item.section}
                      />
                    </>
                  );
                })}
              {/* <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"></img> */}
              {/* <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"></img> */}
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      )}
    </>
  );
  // }
  // else{
  //     navigate("/stafflogin")
  // }
}
