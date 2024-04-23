// import { useState } from 'react'
// import './App.css'
// import SelectGuide from './SelectGuide'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import StaffLogin from './StaffLogin';
// import About from './About';
// import SingleRegisterForm from './SingleRegisterForm';
// import Success from './Success';
// import StaffDashboard from './StaffDashboard';
// import StudentLogin from './StudentLogin';
// import StudentDashboard from './StudentDashboard';
// import StudentCard from './components/StudentCard';
// import StudentProfileTemplate from './components/StudentProfileTemplate';

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <Router>
//         <Routes>

//           <Route path="/" element={<About />} ></Route>
//           <Route path="/selectguide" element={<SelectGuide />} ></Route>
//           <Route path="/stafflogin" element={<StaffLogin />} ></Route>


//           <Route path='/selectguide/:id' element={<SingleRegisterForm />}></Route>
//           <Route path='/selectguide/:id/success' element={<Success />}></Route>

          
//           <Route path="/staffdashboard" element={<StaffDashboard />} ></Route>
//           <Route path="/staffdashboard/studentprofile/:studentId" element={<StudentProfileTemplate />} ></Route>


//           <Route path="/studentlogin" element={<StudentLogin />} ></Route>
//           <Route path="/studentdashboard" element={<StudentDashboard />} ></Route>


//           <Route path="/StudentCard" element={<StudentCard />} ></Route>

//         </Routes>
//       </Router> 
//     </>
//   )
// }

// export default App




import { useState } from 'react'
import './App.css'
import SelectGuide from './SelectGuide'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StaffLogin from './StaffLogin';
import About from './About';
import SingleRegisterForm from './SingleRegisterForm';
import Success from './Success';
import StaffDashboard from './StaffDashboard';
import StudentLogin from './StudentLogin';
import StudentDashboard from './StudentDashboard';
import StudentCard from './components/StudentCard';
import StudentProfileTemplate from './components/StudentProfileTemplate';
import EventCards from './components/EventCards';
import ActivityCard from './components/ActivityCard';
import AchievementCard from './components/AchievementCard';
import Events from './Events';
import PersonalInfo from './PersonalInfo';
import ResultPage from './ResultPage';
import MentorMeetings from './MentorMeetings';
import ExtraCredits from './ExtraCredits';
import Remarks from './Remarks';
import Permission from './Permission';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<About />} ></Route>
          <Route path="/selectguide" element={<SelectGuide />} ></Route>
          <Route path="/stafflogin" element={<StaffLogin />} ></Route>


          <Route path='/selectguide/:id' element={<SingleRegisterForm />}></Route>
          <Route path='/selectguide/:id/success' element={<Success />}></Route>

          
          <Route path="/staffdashboard" element={<StaffDashboard />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId" element={<StudentProfileTemplate />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/PersonalInfo" element={<PersonalInfo />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/Events" element={<Events />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/ResultPage" element={<ResultPage />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/Remarks" element={<Remarks />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/MentorMeetings" element={<MentorMeetings />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/ExtraCredits" element={<ExtraCredits />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/Permission" element={<Permission />} ></Route>







          <Route path="/studentlogin" element={<StudentLogin />} ></Route>
          <Route path="/studentdashboard" element={<StudentDashboard />} ></Route>
          <Route path="/studentdashboard/studentMailId" element={<StudentProfileTemplate />} ></Route>
          <Route path="/studentdashboard/studentMailId/PersonalInfo" element={<PersonalInfo />} ></Route>
          <Route path="/studentdashboard/studentMailId/Events" element={<Events />} ></Route>
          <Route path="/studentdashboard/studentMailId/ResultPage" element={<ResultPage />} ></Route>
          <Route path="/studentdashboard/studentMailId/Remarks" element={<Remarks />} ></Route>
          <Route path="/studentdashboard/studentMailId/MentorMeetings" element={<MentorMeetings />} ></Route>
          <Route path="/studentdashboard/studentMailId/ExtraCredits" element={<ExtraCredits />} ></Route>
          <Route path="/studentdashboard/studentMailId/Permission" element={<Permission />} ></Route>    

  
          <Route path="/StudentCard" element={<StudentCard />} ></Route>
          <Route path="/EventCards" element={<EventCards />} ></Route>
          <Route path="/AchievementCard" element={<AchievementCard />} ></Route>
          <Route path="/ActivityCard" element={<ActivityCard />} ></Route>





        </Routes>
      </Router> 
    </>
  )
}

export default App

