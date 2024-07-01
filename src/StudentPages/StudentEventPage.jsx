import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EventCard from '../CardComponents/EventCard';
import { RiArrowDropDownFill } from "react-icons/ri";
import StaffNormalNavbar from '../NavBarComponents/StaffNormalNavbar';

export default function Events() {
  const [eventsConducted, setEventsConducted] = useState({});
  const [eventsAttended, setEventsAttended] = useState({});
  const [selectedSemester, setSelectedSemester] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState({
    conducted: false,
    attended: false,
  });
  const [newEvent, setNewEvent] = useState({
    eventName: '',
    eventType: '',
    eventSummary: '',
    brouchure: null,
    certificate: null,
    semester: '',
    conductedOrAttended: 'conducted',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const serverPath1 = "http://127.0.0.1:5000/";
  const { studentId } = useParams();
  const GuideName = localStorage.getItem("GuideName");
  const GuideImage = localStorage.getItem("GuideImage");
  const guideMailId = localStorage.getItem("GuideMailIdToLogin");
  const [StudentData, setStudentData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const dataTest = { regNo: '43110021', guideMail: 'albert.cse@sathyabama.ac.in' };
      try {
        const response = await axios.post(`${serverPath1}/eventsData`, dataTest);
        setEventsConducted(response.data.eventsconducted);
        setEventsAttended(response.data.eventsattended);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getStudentData = async () => {
      const dataTest = { regNo: '43110021', guideMail: 'albert.cse@sathyabama.ac.in' };
      try {
        const response = await axios.post(`${serverPath1}/getStudentProfileData`, dataTest);
        setStudentData(response.data.StudentData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
    getStudentData();
  }, []);

  const getDirectLinkFromShareableLink = (shareableLink) => {
    try {
      const fileIdMatch = shareableLink.match(/\/file\/d\/(.*?)\//);
      return fileIdMatch ? `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}` : null;
    } catch (error) {
      return null;
    }
  };

  const navigate = useNavigate();

  const toggleDropdown = (type) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const handleSemesterSelect = (semester, type) => {
    setSelectedSemester(semester);
    toggleDropdown(type);
  };

  const renderEventCards = (events) => (
    events[selectedSemester]?.length > 0 ? (
      events[selectedSemester].map((event, index) => (
        <EventCard
          key={index}
          eventName={event.eventName}
          eventType={event.eventType}
          eventSummary={event.eventSummary}
          bfileURL={event.fileURL}
          bfileName={event.fileName}
          brouchureURL={event.brouchureURL}
          fileURL={event.fileURL}
          fileName={event.fileName}
          certificateURL={event.certificateURL}
        />
      ))
    ) : (
      <p className="text-black font-bold text-center mt-2">No data available</p>
    )
  );

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const endpoint = newEvent.conductedOrAttended === 'conducted' ? 'addConductedEvent' : 'addAttendedEvent';
    const formData = new FormData();
    formData.append('eventName', newEvent.eventName);
    formData.append('eventType', newEvent.eventType);
    formData.append('eventSummary', newEvent.eventSummary);
    formData.append('brouchure', newEvent.brouchure);
    formData.append('certificate', newEvent.certificate);
    formData.append('semester', newEvent.semester);
    formData.append('conductedOrAttended', newEvent.conductedOrAttended);
    formData.append('studentName',StudentData.name)
  
    try {
       let regNo = '43110021';
      const response = await axios.post(`${serverPath1}/studentdashboard/${regNo}/Events`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        const updatedEvents = { ...eventsConducted };
        if (newEvent.conductedOrAttended === 'events_conducted') {
          updatedEvents[newEvent.semester] = [...(updatedEvents[newEvent.semester] || []), newEvent];
          setEventsConducted(updatedEvents);
        } else {
          const updatedAttendedEvents = { ...eventsAttended };
          updatedAttendedEvents[newEvent.semester] = [...(updatedAttendedEvents[newEvent.semester] || []), newEvent];
          setEventsAttended(updatedAttendedEvents);
        }
        setNewEvent({
          eventName: '',
          eventType: '',
          eventSummary: '',
          brouchure: null,
          certificate: null,
          semester: '',
          conductedOrAttended: 'events_conducted',
        });
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <>
      <StaffNormalNavbar GuideName={GuideName} GuideImage={GuideImage} />
      <div className='sm:flex'>
        <div className="p-4 sm:h-screen ml-2 mr-2 m-2 lg:ml-6 bg-[#e9d8de] mx-auto lg:w-96 rounded-md shadow-md relative" style={{ maxWidth: '600px' }}>
          <div className='w-full rounded-t-md bg-[#811338] h-20 absolute top-0 left-0 right-0'></div>
          <div className="flex flex-col">
            <div className="flex justify-center py-4 px-20">
              <div className="rounded-full overflow-hidden h-20 w-20 flex-shrink-0 mr-4">
                <img
                  src={getDirectLinkFromShareableLink(StudentData.image)}
                  alt="User Avatar"
                  className="rounded-full border-2 absolute overflow-hidden h-20 w-20 flex-shrink-0 mr-4 object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="mb-10 text-center max-w-xs">
              <h2 className="text-2xl font-bold break-words">{StudentData.name}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col p-0 text-left">
              <p className="mb-4 text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Register Number</p>
              <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Section</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="mb-4 text-sm text-gray-600">{StudentData.regNo}</p>
              <p className="text-sm text-gray-600">E3</p>
            </div>
            <div className="flex flex-col text-left">
              <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Email</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm text-gray-600" style={{ wordBreak: 'break-all' }}>{StudentData.mailId}</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Phone</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm text-gray-600">{StudentData.phoneNo}</p>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="bg-[#811338] text-white px-4 py-2 rounded-md" onClick={() => navigate(`/staffdashboard/studentprofile/${studentId}`)}>
              BACK
            </button>
          </div>
        </div>

        {/* Right container */}
        <div className='flex flex-grow w-full'>
          <div className='flex w-full flex-grow justify-center h-screen items-center my-2 mr-0'>
            <div className="flex-col bg-[#edeef2] space-y-4 shadow-md rounded-lg m-2 ml-4 mr-4 w-full h-full overflow-y-scroll">
              <div className='w-full rounded-t-md bg-[#811338] h-20'></div>
              <div className="text-center text-3xl font-bold pt-4">Events</div>
              <div className="text-center flex flex-col items-center">
                <button
                  className="bg-[#811338] text-white font-bold py-2 px-4 rounded my-2 mx-2"
                  onClick={() => setIsFormOpen(!isFormOpen)}
                >
                  Add New Event
                </button>
                {isFormOpen && (
                  <form onSubmit={handleAddEvent} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
                        Event Name
                      </label>
                      <input
                        id="eventName"
                        type="text"
                        value={newEvent.eventName}
                        onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter event name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventType">
                        Event Type
                      </label>
                      <input
                        id="eventType"
                        type="text"
                        value={newEvent.eventType}
                        onChange={(e) => setNewEvent({ ...newEvent, eventType: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter event type"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventSummary">
                        Event Summary
                      </label>
                      <textarea
                        id="eventSummary"
                        value={newEvent.eventSummary}
                        onChange={(e) => setNewEvent({ ...newEvent, eventSummary: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter event summary"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brouchure">
                        Brouchure
                      </label>
                      <input
                        id="brouchure"
                        type="file"
                        onChange={(e) => setNewEvent({ ...newEvent, brouchure: e.target.files[0] })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="certificate">
                        Certificate
                      </label>
                      <input
                        id="certificate"
                        type="file"
                        onChange={(e) => setNewEvent({ ...newEvent, certificate: e.target.files[0] })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester">
                        Semester
                      </label>
                      <input
                        id="semester"
                        type="text"
                        value={newEvent.semester}
                        onChange={(e) => setNewEvent({ ...newEvent, semester: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter semester"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="conductedOrAttended">
                        Conducted or Attended
                      </label>
                      <select
                        id="conductedOrAttended"
                        value={newEvent.conductedOrAttended}
                        onChange={(e) => setNewEvent({ ...newEvent, conductedOrAttended: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="events_conducted">Conducted</option>
                        <option value="events_attended">Attended</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Add Event
                      </button>
                    </div>
                  </form>
                )}
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="w-full max-w-lg">
                  <h3 className="text-xl font-bold">Events Conducted</h3>
                  <div className="relative">
                    <button
                      className="bg-gray-300 text-black font-bold py-2 px-4 rounded w-full"
                      onClick={() => toggleDropdown('conducted')}
                    >
                      Select Semester
                      <RiArrowDropDownFill size={24} className="inline-block" />
                    </button>
                    {dropdownOpen.conducted && (
                      <div className="absolute z-10 bg-white rounded shadow-lg mt-2 w-full">
                        {Object.keys(eventsConducted).map((semester, index) => (
                          <button
                            key={index}
                            onClick={() => handleSemesterSelect(semester, 'conducted')}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                          >
                            {semester}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">{renderEventCards(eventsConducted)}</div>
                </div>
                <div className="w-full max-w-lg">
                  <h3 className="text-xl font-bold">Events Attended</h3>
                  <div className="relative">
                    <button
                      className="bg-gray-300 text-black font-bold py-2 px-4 rounded w-full"
                      onClick={() => toggleDropdown('attended')}
                    >
                      Select Semester
                      <RiArrowDropDownFill size={24} className="inline-block" />
                    </button>
                    {dropdownOpen.attended && (
                      <div className="absolute z-10 bg-white rounded shadow-lg mt-2 w-full">
                        {Object.keys(eventsAttended).map((semester, index) => (
                          <button
                            key={index}
                            onClick={() => handleSemesterSelect(semester, 'attended')}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                          >
                            {semester}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">{renderEventCards(eventsAttended)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
