
import sistlogologin from "../assets/sistlogologin.png";
import { FiMenu, FiSearch } from "react-icons/fi"; // Assuming you want to use the Feather icon pack
import adeepA from "./adeepA.jpg";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";



export default function StaffNormalNavbar({GuideName, GuideImage}) {

   
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
              
            </div>

            <div className="font-semibold text-lg">
              <p>{GuideName}</p>
            </div>
            <div className=" w-20 h-18 flex items-center">
              <img
                className="rounded-full border-2  h-16 w-16"
                src={getDirectLinkFromShareableLink(GuideImage)}
              ></img>
            </div>
          </div>

          
        </nav>
        {Toggle && (
            <div className="lg:hidden flex justify-center bg-[#9e1c3f] pb-6">
            <div className="flex-col space-y-4 items-center">
              

              <div className=" flex space-x-4 justify-center items-center font-semibold text-lg">
                <div className="flex-col items-center justify-center">
                <p>{GuideName}</p>
                </div>
                <div className=" w-20 h-14 flex items-center">
                <img
                  className="rounded-full border-2  h-16 w-16"
                  src={getDirectLinkFromShareableLink(GuideImage)}

                ></img>
              </div>
              </div>
              
            </div>
            </div>
          )}
      </div>
    </>
  );
}
