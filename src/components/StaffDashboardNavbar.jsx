import sistlogologin from "../assets/sistlogologin.png";
import { FiMenu, FiSearch } from "react-icons/fi"; // Assuming you want to use the Feather icon pack
import adeepA from "./adeepA.jpg";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";



export default function StaffDashboardNavbar({OpenStaffSidebar, GuideName, handleSearch}) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleDropDownClick=()=>{
        OpenStaffSidebar()
    }

    // const handleOnchange =(e)=>{
    //     e.preventDefault();
    //     setSearchTerm(e.target.value)
    //     handleSearch(searchTerm)
    // }

//   const GuideName = localStorage.getItem("GuideName")

  const [Toggle, setToggle] = useState(false);

  return (
    <>
      <div>
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
            className="lg:hidden"
            onClick={() => {
                // console.warn(Toggle)
              setToggle(!Toggle);
            }}
          >
            <FiMenu color="white" size={36} />
          </div>

          <div className="lg:flex space-x-4 items-center hidden">
            <div className="flex">
              <input
                className="p-2 pl-2 rounded-l-full outline-none"
                name="studentName"
                value={searchTerm}
                placeholder="Search Mentee"
                onChange={(e)=>{
                    setSearchTerm(e.target.value)
                    console.warn(searchTerm)
                    handleSearch(e.target.value)
                }}
              />
              <div className="flex-col bg-white pr-4 justify-center items-center rounded-r-full">
                <FiSearch className=" h-full " />
              </div>
            </div>

            <div className="font-semibold text-lg">
              <p>{GuideName}</p>
            </div>
            <div className=" w-20 h-18 flex items-center">
              {/* <img
                className="rounded-full border-2  h-16 w-16"
                src={adeepA}
              ></img> */}
              <button className="shadow-md pt-0 mt-0" onClick={handleDropDownClick}><IoMdArrowDropdown size={40} /></button>
            </div>
          </div>

          
        </nav>
        {Toggle && (
            <div className="lg:hidden flex justify-center bg-[#9e1c3f] pb-6">
            <div className="flex-col space-y-4 items-center">
              <div className="flex">
              <input
                className="p-2 rounded-l-full outline-none"
                name="studentName"
                value={searchTerm}
                placeholder="Search Mentee"
                onChange={(e)=>{
                    setSearchTerm(e.target.value)
                    console.warn(searchTerm)
                    handleSearch(e.target.value)
                }}
              />
                <div className="flex-col bg-white pr-4 justify-center items-center rounded-r-full">
                  <FiSearch className=" h-full " />
                </div>
              </div>

              <div className=" flex space-x-4 justify-center items-center font-semibold text-lg">
                <div className="flex-col items-center justify-center">
                <p>{GuideName}</p>
                </div>
                <div className=" w-20 h-14 flex items-center">
                {/* <img
                  className="rounded-full border-2  h-16 w-16"
                  src={adeepA}
                ></img> */}
                <button className="shadow-md pt-0 mt-0" onClick={handleDropDownClick}><IoMdArrowDropdown size={40} /></button>
              </div>
              </div>
              
            </div>
            </div>
          )}
      </div>
    </>
  );
}
