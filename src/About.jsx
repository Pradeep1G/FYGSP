


import Loginnavbar from "./shared/Loginnavbar";
import Footer from "./shared/Footer";
import { useNavigate } from "react-router-dom";


export default function About(){

    const navigate = useNavigate()

    const SelectGuide=(e)=>{
        e.preventDefault()
        navigate('/selectguide')
    }


    return(
        <>
            <Loginnavbar />



            <div className="loginbg md:px-0">
    <div className=' border p-6 bg-white md:bg-opacity-80 bg-opacity-70 backdrop-filter rounded-lg shadow-lg font-semibold'>
            

        <p className="font-bold flex items-center justify-center text-xl">Welcome to the Mentor Mentee Portal for First-Year Students!</p><br></br>            
        
        <p className="font-semibold text-base">This website is designed to help first-year students choose a mentor who will support them throughout the academic year. Here's a step-by-step guide:</p>

        <ol className=" pt-2 text-base pl-4 list-decimal">
            <li>Select a faculty member as your mentor. Each mentor has 20 vacancies available.</li>
            <li>After selecting your mentor, provide the following information:</li>
            <ul className="pt-2 pl-8 list-disc">
                <li>Name</li>
                <li>Registration number</li>
                <li>Email</li>
                <li>Phone number</li>
                <li>Section</li>
                <li>Address</li>

            </ul>
            <li>No duplicates are allowed, so ensure the information is unique.</li>
            <li>Upload a passport-size photo, which must be less than 100KB in size.</li>
            <li>After entering the details, submit your information.</li>
            <li>Your login credentials will be sent to the provided mail.</li>

        </ol>

        <p className="flex pt-4 justify-center">That's all for the student registration process!</p>
        <br></br><br></br>

          <div className=' flex justify-center'>


            <button onClick={SelectGuide} className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-base">Select Mentor</button>
            </div>
        
            </div>
            </div>


            
            <Footer />
        </>
    );
}