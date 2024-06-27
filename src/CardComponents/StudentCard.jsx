// import React from 'react';
// import { useNavigate } from 'react-router-dom';


// const pastelColors = [
//     "#FED0EE", "#FEAEAE", "#DBAEFF", "#9A89FF", "#E3B4BA",
//     "#B6708D", "#F3CCF3", "#EF6363", "#ACDCFF", "#ACCDFF",
//     "#FFC0CB", "#FFDAB9", "#FAF0E6", "#FFF5EE", "#F0FFF0",
//     "#F5FFFA", "#FFFACD", "#F0F8FF", "#E6E6FA", "#F5F5DC"
// ];

// export default function StudentCard (props){
//     const randomColorIndex = Math.floor(Math.random() * pastelColors.length);
//     const randomColor = pastelColors[randomColorIndex];
//     const navigate = useNavigate();

//     function getDirectLinkFromShareableLink(shareableLink) {
//         try {
//           const fileIdMatch = shareableLink.match(/\/file\/d\/(.*?)\//);
//           if (fileIdMatch && fileIdMatch[1]) {
//             const fileId = fileIdMatch[1];
//             return `https://drive.google.com/thumbnail?id=${fileId}`;
//           } else {
//             throw new Error("Invalid shareable link format");
//           }
//         } catch (error) {
//         //   console.error("Error processing shareable link:", error.message);
//           return null;
//         }
//       }

//       const handleOpenProfile=()=>{
//         localStorage.setItem("GuideName", props.guideName)
//         localStorage.setItem("GuideImage", props.guideImage)
        

//         navigate(`/staffdashboard/studentprofile/${props.regNo}`)

//       }



//     return (
//         <div className="bg-white rounded-md shadow-xl" style={{ maxWidth: '16rem', height:"25rem", position:"relative" }}>
//             {/* Top child container */}
//             <div className={"h-20 flex-col items-center justify-center rounded-t-md b-0"} style={{ backgroundColor: randomColor }}>
//                 {/* You can place any content here */}
//             </div>
            
//             {/* Profile Picture container */}
//             <div className="relative h-12 flex items-start justify-center rounded-t-sm mb-0 -mt-6">
//                 {/* Profile picture */}
//                 <img className="rounded-full w-20 h-20 absolute top-0 border-2 border-white shadow-lg -mt-4" src={getDirectLinkFromShareableLink(props.img)} alt={props.name} />
//             </div>

//             {/* Middle child container */}
//             <div className="bg-white p-3 flex flex-col mt-2 font-serif">
//                 <h2 className="text-base font-bold text-center mb-4">{props.name}</h2>
//                 <div className="grid grid-cols-2 gap-4">
//                     <div className="flex flex-col p-0 text-left ">
//                         <p className="mb-4 text-xs font-semibold whitespace-nowrap" style={{ color: 'rgba(0,0,0)' }}>Register Number:</p>
//                         <p className=" text-xs font-semibold" style={{ color: 'rgba(0,0,0)' }}>Section:</p>
//                     </div>
//                     <div className="flex flex-col p-0 text-left">
//                         <p className="mb-4 text-xs" style={{ color: 'rgba(132,38,70)' }}>{props.regNo}</p>
//                         <p className="text-xs" style={{ color: 'rgba(132,38,70)' }}>{props.section}</p>
//                     </div>
//                     <div className="flex flex-col text-left">
//                         <p className="text-xs font-semibold" style={{ color: 'rgba(0,0,0)' }}>Email:</p>
//                     </div>
//                     <div className="flex flex-col p-0 text-left">
//                         <p className=" text-xs" style={{ color: 'rgba(132,38,70)', wordBreak: 'break-all' }}>{props.mailId}</p>
//                     </div>
//                     <div className="flex flex-col p-0 text-left">
//                         <p className=" text-xs font-semibold" style={{ color: 'rgba(0,0,0)' }}>Phone:</p>
//                     </div>
//                     <div className="flex flex-col p-0 text-left">
//                         <p className="text-xs" style={{ color: 'rgba(132,38,70)' }}>{props.phoneNo}</p>
//                     </div>
//                 </div>
//             </div>
//             {/* Bottom child container */}
//             <div className="absolute bg-white p-4 flex justify-center rounded-md bottom-0 left-0 right-0 ">
//                 <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-2 rounded mr-1.5 text-xs"> {/* Adjusted padding */}
//                     Send Comment
//                 </button>
//                 <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-2 rounded ml-1.5 text-xs" onClick={handleOpenProfile}> {/* Adjusted padding */}
//                     View Profile
//                 </button>
//             </div>
//         </div>  
//     );
// }




import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import { useState } from 'react';


const pastelColors = [
    "#FED0EE", "#FEAEAE", "#DBAEFF", "#9A89FF", "#E3B4BA",
    "#B6708D", "#F3CCF3", "#EF6363", "#ACDCFF", "#ACCDFF",
    "#FFC0CB", "#FFDAB9", "#FAF0E6", "#FFF5EE", "#F0FFF0",
    "#F5FFFA", "#FFFACD", "#F0F8FF", "#E6E6FA", "#F5F5DC"
];

export default function StudentCard (props){




            // const serverPath1 = "http://127.0.0.1:5000"
  const serverPath1 = "https://fgspserver.onrender.com"



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
        //   console.error("Error processing shareable link:", error.message);
          return null;
        }
      }

      const handleOpenProfile=()=>{
        localStorage.setItem("GuideName", props.guideName)
        localStorage.setItem("GuideImage", props.guideImage)
        

        navigate(`/staffdashboard/studentprofile/${props.regNo}`)

      }





      const [OpenCommentBox , setOpenCommentBox] = useState(false);
      const [comment, setComment] = useState("");
      const [Error1, setError1] = useState("");
      const [isSending, setisSending] = useState(false);
      const [successMessage, setSuccessMessage] = useState("");


      const sendComment = async(e)=>{
        e.preventDefault();

        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
        console.warn(formattedDate);

        try{

           const data = {
            "message" : comment,
            "date" : formattedDate
           }

        setisSending(true);

        const response = await axios.post(serverPath1+"/sendMessage/"+props.mailId, data)
        console.warn(response.data);
        if(response.data.message == "SENT")
        {
          setSuccessMessage("Message sent successfully!");
          setOpenCommentBox(false);
          setisSending(false);
          setComment("");

          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        }
        else{
          setError1("Not sent try again.")
          setTimeout(() => {
            setError1("");
          }, 2000);
        }
      }
      catch(error){
        setError1("Not sent try agin.")
        setTimeout(() => {
            setError1("");
          }, 2000);
      }
      }




    return (
        <div className="bg-white rounded-md shadow-xl" style={{ maxWidth: '16rem' }}>
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
            <div className="] bg-white p-4 flex justify-center rounded-md  ">
                <button 
                className={`bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-2 rounded mr-1.5 text-xs ${isSending ? 'cursor-none':'cursor-pointer'} `}
                // className={`bg-red-900 flex justify-around text-white px-6 py-2 rounded-md my-2 text-sm ${isSending ? 'cursor-none':'cursor-pointer'} `}
                onClick={()=>{
                setOpenCommentBox(true);
                }}
                >
                { isSending ? "Sending..." : "Send Comment"}

                </button>


                <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-2 rounded ml-1.5 text-xs" onClick={handleOpenProfile}> {/* Adjusted padding */}
                    View Profile
                </button>
            </div>

            
            {OpenCommentBox && 
        <div >
        <div className='flex justify-around'>
        <textarea
            className="border-2 h-16 px-4 w-fit flex justify-around bg-gray-200"
            type="text"
            rows={2}
            placeholder="Message"
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
          <div className="flex justify-around">
          <button 
          onClick={sendComment}
          className="bg-red-900 flex justify-around text-white px-6 py-2 rounded-md my-2 text-sm"
          >Send</button>

          <button 
          onClick={()=>{
            setOpenCommentBox(false);
            setisSending(false);
            setComment("")
          }}
          className="bg-red-900 flex justify-around text-white px-6 py-2 rounded-md my-2 text-sm"
          >Cancel</button>
          </div>
          </div>
          }

          {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

          {Error1 && <p className="text-red-600 text-center">{Error1}</p>}

            

            
        </div> 
         
    );
}


