import React from 'react';
import { useNavigate } from 'react-router-dom';


const pastelColors = [
    "#FED0EE", "#FEAEAE", "#DBAEFF", "#9A89FF", "#E3B4BA",
    "#B6708D", "#F3CCF3", "#EF6363", "#ACDCFF", "#ACCDFF",
    "#FFC0CB", "#FFDAB9", "#FAF0E6", "#FFF5EE", "#F0FFF0",
    "#F5FFFA", "#FFFACD", "#F0F8FF", "#E6E6FA", "#F5F5DC"
];

export default function StudentCard (props){
    const randomColorIndex = Math.floor(Math.random() * pastelColors.length);
    const randomColor = pastelColors[randomColorIndex];
    const navigate = useNavigate();

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
          console.error("Error processing shareable link:", error.message);
          return null;
        }
      }

      const handleOpenProfile=()=>{
        navigate("/staffdashboard/studentprofile")

      }



    return (
        <div className="bg-white rounded-md shadow-xl" style={{ maxWidth: '16rem', height:"25rem", position:"relative" }}>
            {/* Top child container */}
            <div className={"h-20 flex-col items-center justify-center rounded-t-md b-0"} style={{ backgroundColor: randomColor }}>
                {/* You can place any content here */}
            </div>
            
            {/* Profile Picture container */}
            <div className="relative h-12 flex items-start justify-center rounded-t-sm mb-0 -mt-6">
                {/* Profile picture */}
                <img className="rounded-full w-20 h-20 absolute top-0 border-2 border-white shadow-lg -mt-4" src={getDirectLinkFromShareableLink(props.img)} alt={props.name} />
            </div>

            {/* Middle child container */}
            <div className="bg-white p-3 flex flex-col mt-2 font-serif">
                <h2 className="text-base font-bold text-center mb-4">{props.name}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col p-0 text-left ">
                        <p className="mb-4 text-xs font-semibold whitespace-nowrap" style={{ color: 'rgba(0,0,0)' }}>Register Number:</p>
                        <p className=" text-xs font-semibold" style={{ color: 'rgba(0,0,0)' }}>Section:</p>
                    </div>
                    <div className="flex flex-col p-0 text-left">
                        <p className="mb-4 text-xs" style={{ color: 'rgba(132,38,70)' }}>{props.regNo}</p>
                        <p className="text-xs" style={{ color: 'rgba(132,38,70)' }}>{props.section}</p>
                    </div>
                    <div className="flex flex-col text-left">
                        <p className="text-xs font-semibold" style={{ color: 'rgba(0,0,0)' }}>Email:</p>
                    </div>
                    <div className="flex flex-col p-0 text-left">
                        <p className=" text-xs" style={{ color: 'rgba(132,38,70)', wordBreak: 'break-all' }}>{props.mailId}</p>
                    </div>
                    <div className="flex flex-col p-0 text-left">
                        <p className=" text-xs font-semibold" style={{ color: 'rgba(0,0,0)' }}>Phone:</p>
                    </div>
                    <div className="flex flex-col p-0 text-left">
                        <p className="text-xs" style={{ color: 'rgba(132,38,70)' }}>{props.phoneNo}</p>
                    </div>
                </div>
            </div>
            {/* Bottom child container */}
            <div className="absolute bg-white p-4 flex justify-center rounded-md bottom-0 left-0 right-0 ">
                <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-2 rounded mr-1.5 text-xs"> {/* Adjusted padding */}
                    Send Comment
                </button>
                <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-2 rounded ml-1.5 text-xs" onClick={handleOpenProfile}> {/* Adjusted padding */}
                    View Profile
                </button>
            </div>
        </div>  
    );
}