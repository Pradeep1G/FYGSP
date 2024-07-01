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
import About from './About';
import SingleRegisterForm from './SingleRegisterForm';
import Success from './Success';

import StaffDashboard from './DashboardPages/StaffDashboard';
//import StudentDashboard from './StudentDashboard';

import StudentCard from './CardComponents/StudentCard';
import EventCard from './CardComponents/EventCard';
import ActivityCard from './CardComponents/ActivityCard';
import AchievementCard from './CardComponents/AchievementCard';

import StaffEventPage from './StaffPages/StaffEventPage';
import StaffPersonalInfoPage from './StaffPages/StaffPersonalInfoPage';
import StaffResultPage from './StaffPages/StaffResultPage';
import StaffMentorMeetPage from './StaffPages/StaffMentorMeetPage';
import StaffExtraCreditsPage from './StaffPages/StaffExtraCreditsPage';
import StaffRemarksPage from './StaffPages/StaffRemarksPage';
import StaffPermissionPage from './StaffPages/StaffPermissionPage';

import StudentEventPage from './StudentPages/StudentEventPage';
import StudentPersonalInfoPage from './StudentPages/StudentPersonalInfoPage';
import StudentResultPage from './StudentPages/StudentResultPage';
import StudentMentorMeetPage from './StudentPages/StudentMentorMeetPage';
import StudentExtraCreditsPage from './StudentPages/StudentExtraCreditsPage';
import StudentRemarksPage from './StudentPages/StudentRemarksPage';

import StaffLoginPage from './LoginPages/StaffLoginPage';
import StudentLoginPage from './LoginPages/StudentLoginPage';


import StaffMenuPage from './StaffPages/StaffMenuPage';
import StudentMenuPage from './StudentPages/StudentMenuPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<About />} ></Route>
          <Route path="/selectguide" element={<SelectGuide />} ></Route>


          <Route path='/selectguide/:id' element={<SingleRegisterForm />}></Route>
          <Route path='/selectguide/:id/success' element={<Success />}></Route>

          <Route path="/stafflogin" element={<StaffLoginPage />} ></Route>
          <Route path="/staffdashboard" element={<StaffDashboard />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId" element={<StaffMenuPage />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/PersonalInfo" element={<StaffPersonalInfoPage />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/Events" element={<StaffEventPage />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/ResultPage" element={<StaffResultPage/>} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/Remarks" element={<StaffRemarksPage />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/MentorMeetings" element={<StaffMentorMeetPage />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/ExtraCredits" element={<StaffExtraCreditsPage />} ></Route>
          <Route path="/staffdashboard/studentprofile/:studentId/Permission" element={<StaffPermissionPage />} ></Route>







          <Route path="/studentlogin" element={<StudentLoginPage />} ></Route>
          <Route path="/studentdashboard" element={<StudentMenuPage />} ></Route>
          <Route path="/studentdashboard/studentMailId/PersonalInfo" element={<StudentPersonalInfoPage />} ></Route>
          <Route path="/studentdashboard/studentMailId/Events" element={<StudentEventPage />} ></Route>
          <Route path="/studentdashboard/studentId/ResultPage" element={<StudentResultPage />} ></Route>
          <Route path="/studentdashboard/studentMailId/Remarks" element={<StudentRemarksPage/>} ></Route>
          <Route path="/studentdashboard/studentMailId/MentorMeetings" element={<StudentMentorMeetPage />} ></Route>
          <Route path="/studentdashboard/studentMailId/ExtraCredits" element={<StudentExtraCreditsPage />} ></Route>

  
          <Route path="/StudentCard" element={<StudentCard />} ></Route>
          <Route path="/EventCard" element={<EventCard />} ></Route>
          <Route path="/AchievementCard" element={<AchievementCard />} ></Route>
          <Route path="/ActivityCard" element={<ActivityCard />} ></Route>





        </Routes>
      </Router> 
    </>
  )
}

export default App

