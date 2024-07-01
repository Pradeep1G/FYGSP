import React from 'react';
import { RiArrowDropDownFill } from "react-icons/ri";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StaffNormalNavbar from '../NavBarComponents/StaffNormalNavbar';
import StudentNormalNavbar from '../NavBarComponents/StudentNormalNavbar';
import TextareaAutosize from 'react-textarea-autosize';
import { BiImageAdd } from "react-icons/bi";

function capitalizeFirstLetter(word) {
  if (!word) {
    return '';
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function capitalizeString(string) {
  if (!string) {
    return '';
  }
  // Capitalize the entire string
  return string.toUpperCase();
}
function capitalizeEachWord(string) {
  // Check if the input is a string
  if (typeof string !== 'string') {
    return '';
  }

  // Check if the input contains a comma
  if (string.includes(',')) {
    // Split the string into individual words using commas
    const words = string.split(',');
    // Capitalize each word
    const capitalizedWords = words.map(word => capitalizeFirstLetter(word.trim()));
    // Join the capitalized words back together with commas
    return capitalizedWords.join(', ');
  } else {
    // Split the string into individual words using spaces
    const words = string.split(/\s+/); // Updated to split on one or more spaces
    // Capitalize each word
    const capitalizedWords = words.map(word => capitalizeFirstLetter(word.trim()));
    // Join the capitalized words back together with spaces
    return capitalizedWords.join(' ');
  }
}

function capitalizeWord(array) {
  // Check if the input is an array
  if (!Array.isArray(array)) {
    return [];
  }

  // Capitalize each word in the array
  const capitalizedWords = array.map(word => capitalizeFirstLetter(word));

  return capitalizedWords;
}

function isValidPhoneNumber(input) {
  const digitsOnly = input.replace(/\D/g, '');
  return digitsOnly.length === 10;
}

export default function PersonalInfo() {

  const serverPath1 = "http://127.0.0.1:5000";
  //const serverPath1 = "https://fgspserver.onrender.com";

  // console.warn(studentId)
  const [userType, setUserType] = useState("");
  const GuideName = localStorage.getItem("GuideName");
  const GuideImage = localStorage.getItem("GuideImage");
  const guideMailId = localStorage.getItem("GuideMailIdToLogin")
  const studentMailId = localStorage.getItem("StudentMailId")
  const studentId = localStorage.getItem("regNo")
  // const studentName = localStorage.get
  const [fileName, setFileName] = useState('');


  const [StudentData, setStudentData] = useState({
    image: "",
    regNo: "",
    mailId: "",
    phoneNo: "",
    name: "",
    fullAddress: "",
    gender: "",
    fatherName: "",
    motherName: "",
    dob: "",
    nationality: "",
    religion: "",
    community: "",
    aadhar: ""
  });



  //   const getStudentProfileData = async () => {
  //     console.log("Fetching student data...");
  //     const data = {
  //       regNo: studentId,
  //       guideMail: guideMailId
  //     }
  //     const response = await axios.post(serverPath1 + "/getStudentProfileData", data)
  //     console.warn(response.data)
  //     setStudentData(response.data.StudentData)
  //   }

  const [personaldetails, setPersonalDetails] = useState([{
    "section": null,     // this variable contains null because it shows null while it is loading
    "religion": null,
    "community": null,
    "lifeGoal": null,
    "bloodGrp": null,
    "languages": null

  }])

  const [parentdetails, setParentDetails] = useState([{
    "fatherPic":"https://drive.google.com/file/d/179DLKgs8SsFFAQNYkubmoWq-gfFclbMJ",
    "motherPic":"https://drive.google.com/file/d/179DLKgs8SsFFAQNYkubmoWq-gfFclbMJ",
    "guardianPic":"https://drive.google.com/file/d/179DLKgs8SsFFAQNYkubmoWq-gfFclbMJ",
    "fatherName": null,     // this variable contains null because it shows null while it is loading
    "fatherMail": null,
    "fatherNo": null,
    "fatherOcc": null,
    "motherName": null,
    "motherMail": null,
    "motherNo": null,
    "motherOcc": null,
    "guardianName": null,
    "guardianNo": null,
    "guardianOcc": null,

  }])

  const [address, setAddress] = useState([{
    "permanentAddress": null,     // this variable contains null because it shows null while it is loading
    "communicationAddres": null,
    "phoneNo": null,
    "alterNo": null,
    "hosteller": null,
    "hostelName": null,
    "hostelNo": null

  }])
  const [academicdetails, setAcademicDetails] = useState([{
    "perviousInst": null,     // this variable contains null because it shows null while it is loading
    "tenthper": null,
    "twelftper ": null
  }])


  const [isPersonalDetailEditable, setIsPersonalDetailEditable] = useState(false); // boolean variable to use when to toggle to tell true or false
  const [isParentDetailEditable, setIsParentDetailEditable] = useState(false);
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const [isAcademicDetailEditable, setIsAcademicDetailEditable] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');


  const [permissions, setPermissions] = useState(null);




  const [isPersonalDetailSubmitting, setIsPersonalDetailSubmitting] = useState(false);
  const [isParentDetailSubmitting, setIsParentDetailSubmitting] = useState(false);
  const [isAddressSubmitting, setIsAddressSubmitting] = useState(false);
  const [isAcademicDetailSubmitting, setIsAcademicDetailSubmitting] = useState(false);


  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [selectedFatherImage, setSelectedFatherImage] = useState(null);
  const [selectedMotherImage, setSelectedMotherImage] = useState(null);
  const [selectedGuardianImage, setSelectedGuardianImage] = useState(null);

  const [error, setError] = useState('');

  const [editedPersonalDetail, setEditedPersonalDetail] = useState({
    section: personaldetails[0]["sec"],          // this variable consits of the backend data that is coming to frontend
    religion: personaldetails[0]["religion"],
    community: personaldetails[0]["community"],
    lifeGoal: personaldetails[0]["lifeGoal"],
    bloodGrp: personaldetails[0]["bloodGrp"],
    languages: personaldetails[0]["languages"],
  });

  const [editedParentDetail, setEditedParentDetail] = useState({
    fatherName: parentdetails[0]["fatherName"],          // this variable consits of the backend data that is coming to frontend
    fatherMail: parentdetails[0]["fatherMail"],
    fatherNo: parentdetails[0]["fatherNo"],
    fatherOcc: parentdetails[0]["fatherOcc"],
    motherName: parentdetails[0]["motherName"],          // this variable consits of the backend data that is coming to frontend
    motherMail: parentdetails[0]["motherMail"],
    motherNo: parentdetails[0]["motherNo"],
    motherOcc: parentdetails[0]["motherOcc"],
    guardianName: parentdetails[0]["guardianName"],          // this variable consits of the backend data that is coming to frontend
    guardianMail: parentdetails[0]["guardianMail"],
    guardianNo: parentdetails[0]["guardianNo"],
    guardianOcc: parentdetails[0]["guardianOcc"],
  });

  const [editedAddress, setEditedAddress] = useState({
    permanentAdd: address[0]["permanentAdd"],          // this variable consits of the backend data that is coming to frontend
    communicationAdd: address[0]["communicationAdd"],
    phoneNo: address[0]["phoneNo"],
    alterNo: address[0]["alterNo"],
    hosteller: address[0]["hosteller"],
    hostelName: address[0]["hostelName"],
    hostelNo: address[0]["hostelNo"],

  });


  const [editedAcademicDetail, setEditedAcademicDetail] = useState({
    perviousInst: academicdetails[0]["perviousInst"],          // this variable consits of the backend data that is coming to frontend
    tenthper: academicdetails[0]["tenthper"],
    twelfthper: academicdetails[0]["twelfthper"],

  });

  const togglePersonalEdit = (e) => { // when we click on edit it should toogle
    e.preventDefault();
    if (!isPersonalDetailEditable) {  //initially it is false it will be true , true means they can edit
      setEditedPersonalDetail({    //After edited the data will be updated foe updation we use setEditedPersonalDetail
        section: personaldetails[0]["sec"],
        religion: personaldetails[0]["religion"],
        community: personaldetails[0]["community"],
        lifeGoal: personaldetails[0]["lifeGoal"],
        bloodGrp: personaldetails[0]["bloodGrp"],
        languages: personaldetails[0]["languages"],

      })
    }
    setIsPersonalDetailEditable(!isPersonalDetailEditable); // the isPersonalDetailEditable will be turned to false again
  }
  const toggleParentEdit = () => { // when we click on edit it should toogle
    if (!isParentDetailEditable) {  //initially it is false it will be true , true means they can edit
      setEditedParentDetail({    //After edited the data will be updated foe updation we use setEditedPersonalDetail
        fatherName: parentdetails[0]["fatherName"],
        fatherMail: parentdetails[0]["fatherMail"],
        fatherNo: parentdetails[0]["fatherNo"],
        fatherOcc: parentdetails[0]["fatherOcc"],
        motherName: parentdetails[0]["motherName"],
        motherMail: parentdetails[0]["motherMail"],
        motherNo: parentdetails[0]["motherNo"],
        motherOcc: parentdetails[0]["motherOcc"],
        guardianName: parentdetails[0]["guardianName"],
        guardianMail: parentdetails[0]["guardianMail"],
        guardianNo: parentdetails[0]["guardianNo"],
        guardianOcc: parentdetails[0]["guardianOcc"],

      })
    }
    setIsParentDetailEditable(!isParentDetailEditable); // the isPersonalDetailEditable will be turned to false again
  }
  const toggleAddressEdit = () => { // when we click on edit it should toogle
    if (!isAddressEditable) {  //initially it is false it will be true , true means they can edit
      setEditedAddress({    //After edited the data will be updated foe updation we use setEditedPersonalDetail
        permanentAdd: address[0]["permanentAdd"],          // this variable consits of the backend data that is coming to frontend
        communicationAdd: address[0]["communicationAdd"],
        phoneNo: address[0]["phoneNo"],
        alterNo: address[0]["alterNo"],
        hosteller: address[0]["hosteller"],
        hostelName: address[0]["hostelName"],
        hostelNo: address[0]["hostelNo"],


      })
    }
    setIsAddressEditable(!isAddressEditable); // the isPersonalDetailEditable will be turned to false again
  }

  const handleHostellerToggle = () => {
    setEditedAddress({
      ...editedAddress,
      hosteller: !editedAddress.hosteller,
      hostelName: '', // Reset hostel name when toggling hosteller
      hostelNo: '',   // Reset hostel number when toggling hosteller
    });
  };

  const toggleAcademicDetailEdit = () => { // when we click on edit it should toogle
    if (!isAcademicDetailEditable) {  //initially it is false it will be true , true means they can edit
      setEditedAcademicDetail({    //After edited the data will be updated foe updation we use setEditedPersonalDetail
        perviousInst: academicdetails[0]["perviousInst"],
        tenthper: academicdetails[0]["tenthper"],
        twelfthper: academicdetails[0]["twelfthper"],

      })
    }
    setIsAcademicDetailEditable(!isAcademicDetailEditable); // the isPersonalDetailEditable will be turned to false again
  }

  const handlePersonalDetailInputChange = (e) => {  //handles the change in input field for personal
    const { name, value } = e.target;
    setEditedPersonalDetail((prevDetails) => ({
      ...prevDetails, //previous details
      [name]: value, //updated details
    }));
  }

  const handleParentDetailInputChange = (e) => {  //handles the change in input field for parent
    const { name, value } = e.target;
    setEditedParentDetail((prevDetails) => ({
      ...prevDetails, //previous details
      [name]: value, //updated details
    }));
  }

  const handleAddressInputChange = (e) => {  //handles the change in input field for address
    const { name, value } = e.target;
    setEditedAddress((prevDetails) => ({
      ...prevDetails, //previous details
      [name]: value, //updated details
    }));
  }

  const handleAcademicDetailInputChange = (e) => {  //handles the change in input field for academic
    const { name, value } = e.target;
    setEditedAcademicDetail((prevDetails) => ({
      ...prevDetails, //previous details
      [name]: value, //updated details
    }));
  }

  const handleCancel = () => {
    window.location.reload(); // Reload the page on cancel
};


const handleFatherImageChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (file.size <= 100000) { // 20KB in bytes
      setSelectedFatherImage(file);
      setError('');
    } else {
      setSelectedFatherImage(null);
      setError('Image size must be less than 100KB.');
    }
    setTimeout(() => {
      setError("")
    }, 2000);
  }
};

const handleMotherImageChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (file.size <= 100000) { // 20KB in bytes
      setSelectedMotherImage(file);
      setError('');
    } else {
      setSelectedMotherImage(null);
      setError('Image size must be less than 100KB.');
    }
    setTimeout(() => {
      setError("")
    }, 2000);
  }
};

const handleGuardianImageChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (file.size <= 100000) { // 20KB in bytes
      setSelectedGuardianImage(file);
      setError('');
    } else {
      setSelectedGuardianImage(null);
      setError('Image size must be less than 100KB.');
    }
    setTimeout(() => {
      setError("")
    }, 2000);
  }
};


const [selectedImages, setSelectedImages] = useState({
  fatherImage: null,
  motherImage: null,
  guardianImage: null,
});



const handleImageChange = (event) => {
  const { name, files } = event.target;
  const file = files[0];

  if (file) {
    if (file.size <= 100000) { // 100KB in bytes
      setSelectedImages((prevImages) => ({
        ...prevImages,
        [name]: file,
      }));
      setError('');
    } else {
      setSelectedImages((prevImages) => ({
        ...prevImages,
        [name]: null,
      }));
      setError('Image size must be less than 100KB.');
    }
    setTimeout(() => {
      setError('');
    }, 2000);
  }
};







  const handleUpdatePersonalDetail = async () => {
    try {
      // Check for missing required fields
      if (
        !editedPersonalDetail.section ||
        !editedPersonalDetail.religion ||
        !editedPersonalDetail.lifeGoal ||
        !editedPersonalDetail.languages ||
        !editedPersonalDetail.community ||
        !editedPersonalDetail.bloodGrp
      ) {
        console.error('Some required fields are missing');
        return;
      }
  
      console.log('Handling update personal detail...');
      setIsPersonalDetailSubmitting(true);
  
      const updatedPersonalDetailData = {
        regNo: personaldetails[0].regNo,
        personalDetails: {
          name: personaldetails[0].name, 
          dep: personaldetails[0].dep,// Preserve existing details so that when updated they dont disappear
          section: editedPersonalDetail.section,
          religion: editedPersonalDetail.religion,
          lifeGoal: editedPersonalDetail.lifeGoal,
          languages: editedPersonalDetail.languages,
          community: editedPersonalDetail.community,
          bloodGrp: editedPersonalDetail.bloodGrp,
        },
      };
  
      const res = await axios.post(
        `${serverPath1}/studentDashboard/studentPersonalInfoPage/editPersonalDetails`,
        updatedPersonalDetailData
      );
  
      console.log('Update response:', res.data); // Log response data for verification
  
      setEditedPersonalDetail({});
      setIsPersonalDetailEditable(false); // Set edit mode to false
      setPersonalDetails([updatedPersonalDetailData]); // Assuming you update state correctly
  
      // Fetch updated permissions
      await fetchPermissions();
      window.location.reload();
    } catch (error) {
      console.error('Error updating personal detail:', error);
    } finally {
      setIsPersonalDetailSubmitting(false);
      console.log('Finished handling update personal detail.');
    }
  };
  


  const handleUpdateParentDetail = async () => {
    try {
      // Check if all fields are filled
      const { fatherImage, motherImage, guardianImage } = selectedImages;

      if (
        !selectedImages.fatherImage ||
        !editedParentDetail.fatherName ||
        !editedParentDetail.fatherMail ||
        !editedParentDetail.fatherNo ||
        !editedParentDetail.fatherOcc ||
        !selectedImages.motherImage ||
        !editedParentDetail.motherName ||
        !editedParentDetail.motherMail ||
        !editedParentDetail.motherNo ||
        !editedParentDetail.motherOcc ||
        !selectedImages.guardianImage ||
        !editedParentDetail.guardianName ||
        !editedParentDetail.guardianMail ||
        !editedParentDetail.guardianNo ||
        !editedParentDetail.guardianOcc
      ) {
        // setAlert(true);
        // setAlertMessage("Please fill all fields");
        // setAlertType("fail");
        // alertDelay();
        return;
      }
  
      setIsParentDetailSubmitting(true); // Indicate submission in progress
  
      
    
  
        const studentId = localStorage.getItem("regNo");
        const updatedParentDetailData = new FormData();
        updatedParentDetailData.append('regNo', studentId);
        updatedParentDetailData.append("name", StudentData.name);
        updatedParentDetailData.append('fatherImage', selectedImages.fatherImage);
        updatedParentDetailData.append('fatherName', editedParentDetail.fatherName);
        updatedParentDetailData.append('fatherMail', editedParentDetail.fatherMail);
        updatedParentDetailData.append('fatherNo', editedParentDetail.fatherNo);
        updatedParentDetailData.append('fatherOcc', editedParentDetail.fatherOcc);
        updatedParentDetailData.append('motherImage', selectedImages.motherImage);
        updatedParentDetailData.append('motherName', editedParentDetail.motherName);
        updatedParentDetailData.append('motherMail', editedParentDetail.motherMail);
        updatedParentDetailData.append('motherNo', editedParentDetail.motherNo);
        updatedParentDetailData.append('motherOcc', editedParentDetail.motherOcc);
        updatedParentDetailData.append('guardianImage', selectedImages.guardianImage);
        updatedParentDetailData.append('guardianName', editedParentDetail.guardianName);
        updatedParentDetailData.append('guardianMail', editedParentDetail.guardianMail);
        updatedParentDetailData.append('guardianNo', editedParentDetail.guardianNo);
        updatedParentDetailData.append('guardianOcc', editedParentDetail.guardianOcc);
  
        try {
          setIsLoading(true);
          const response = await axios.post(
            `${serverPath1}/studentDashboard/studentPersonalInfoPage/editParentDetails`,
            updatedParentDetailData
          );
          const fileUrl = response.data.fileUrl; // Assuming the server returns the file URL
  
          // setUploadedFileUrl(fileUrl);
          // localStorage.setItem('uploadedFileUrl', fileUrl); // Store in local storage
          // setUploadMessage('File uploaded successfully');
          // setTimeout(() => {
          //   setUploadMessage('');
          // }, 2000); 
  
          setFile(null);
          setEditedParentDetail({});
          setIsParentDetailEditable(false);
          setParentDetails([updatedParentDetailData]);
          
  
        } catch (error) {
          console.error('Error uploading file:', error);
          // setUploadMessage('Error uploading file');
          // setTimeout(() => {
          //   setUploadMessage('');
          // }, 2000); 
        } finally {
          setIsLoading(false);
          setIsParentDetailSubmitting(false);
        }
    
        await fetchPermissions();
        // Reload the page after successful update
        window.location.reload();
  
    } catch (error) {
      console.error('Error updating parent details:', error);
    }
  };
  


  const handleUpdateAddress = async () => {
    try {
      if (
        !editedAddress.permanentAdd ||
        !editedAddress.communicationAdd ||
        !editedAddress.phoneNo ||
        !editedAddress.alterNo ||
        (editedAddress.hosteller && (!editedAddress.hostelName || !editedAddress.hostelNo))
      ) {
        console.error('Some required fields are missing');
        return;
      }

      setIsAddressSubmitting(true);

      const updatedAddressData = {
        regNo: personaldetails[0].regNo,
        address: {
          permanentAdd: editedAddress.permanentAdd,
          communicationAdd: editedAddress.communicationAdd,
          phoneNo: editedAddress.phoneNo,
          alterNo: editedAddress.alterNo,
          hosteller: editedAddress.hosteller,
          hostelName: editedAddress.hostelName,
          hostelNo: editedAddress.hostelNo
        }
      };

      const res = await axios.post(
        `${serverPath1}/studentDashboard/studentPersonalInfoPage/editAddress`,
        updatedAddressData
      );

      console.log('Update response:', res.data); // Log response data for verification

      setEditedAddress({});
      setIsAddressEditable(false);
      setAddress([updatedAddressData]); // Assuming you update state correctly

      // Fetch updated permissions
      await fetchPermissions();
      
      // Reload the page after successful update
      window.location.reload();

    } catch (error) {
      console.error('Error updating address ', error);
    } finally {
      setIsAddressSubmitting(false);
      console.log('Finished handling update address.');
    }
  };




  const handleUpdateAcademicDetail = async () => {
    try {
      if (
        !editedAcademicDetail.previousInst ||
        !editedAcademicDetail.tenthper ||
        !editedAcademicDetail.twelfthper
      ) {
        // Handle case where required fields are missing
        console.error('Some required fields are missing');
        return;
      }
  
      setIsAcademicDetailSubmitting(true);
  
      const updatedAcademicDetailData = {
        regNo: personaldetails[0].regNo,  // Assuming you have regNo accessible here
        academicDetails: {
          previousInst: editedAcademicDetail.previousInst,
          tenthper: editedAcademicDetail.tenthper,
          twelfthper: editedAcademicDetail.twelfthper
        }
      };
  
      // Make the POST request to update academic details
      const res = await axios.post(
        `${serverPath1}/studentDashboard/studentPersonalInfoPage/editAcademicDetails`,
        updatedAcademicDetailData
      );
  
      console.warn('Update response:', res.data); // Log response data for verification
  
      setEditedAcademicDetail({});
      setIsAcademicDetailEditable(false);
      setAcademicDetails([updatedAcademicDetailData]); // Assuming you update state correctly
  
      // Fetch updated permissions
      await fetchPermissions();
  
      // Reload the page after successful update
      window.location.reload();
  
    } catch (error) {
      console.error('Error updating academic detail:', error);
    } finally {
      setIsAcademicDetailSubmitting(false);
      console.log('Finished handling update academic detail.');
    }
  };


  


  const fetchData = async (sdata) => {
    const response = await axios.post(serverPath1 + "/personalDetail", sdata);
    console.log("Received response:", response.data);
    console.warn(response.data.personaldetails);
    console.warn(response.data.parentdetails);
    console.warn(response.data.address);
    console.warn(response.data.academicdetails);
    setPersonalDetails(response.data.personaldetails);
    setParentDetails(response.data.parentdetails);
    setAddress(response.data.address);
    setAcademicDetails(response.data.academicdetails);
  };

  const getLeftSideBarData = async () => {
    const data = {
      mailId: studentMailId

    }
    const response = await axios.post(serverPath1 + "/StudentMenuPage/getLeftSideBarData", data)
    console.warn(response.data)
    setStudentData(response.data.StudentData)
  }

  const fetchPermissions = async () => {
    try {
      const res = await axios.post(serverPath1 + "/studentDashboard/studentPersonalInfoPage/getPermissionData", {
        regNo: studentId // Ensure studentId is defined and correct
      });
      setPermissions(res.data.permissions);
      console.warn(res.data.permissions);
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
    }
  };


  useEffect(() => {
    const regNo = studentId; // Set the regNo value here
    const sdata = {
      "regNo": regNo,
      "collection": "personalinfo",

    };
    console.log("Request data:", sdata); // Log the data object before sending the request

    fetchData(sdata); // Pass data as an argument to the fetchData function
    getLeftSideBarData();
    fetchPermissions();
  }, []);





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
      // console.error("Error processing shareable link:", error.message);
      return null;
    }
  }

  const getThumbnailLinkFromShareableLink = (shareableLink) => {
    try {
      const startIndex = shareableLink.indexOf("/d/") + 3; // Find index of '/d/' and add 3 to skip past it
      // const endIndex = shareableLink.indexOf("/", startIndex); // Find next '/' after '/d/' to determine end of file ID
      if (startIndex !== -1) {
        const fileId = shareableLink.slice(startIndex);
        console.warn(`https://drive.google.com/thumbnail?id=${fileId}`)
        return `https://drive.google.com/thumbnail?id=${fileId}`;
      } else {
        throw new Error("Invalid shareable link format");
      }
    } catch (error) {
      console.error("Error processing shareable link:", error.message);
      return null;
    }
  }

  const navigate = useNavigate();






  return (
    <>

      <StudentNormalNavbar />
      <div className='sm:flex '>
        <div className="p-4 sm:h-screen ml-2 mr-2 m-2 lg:ml-6  bg-[#e9d8de] mx-auto lg:w-96 rounded-md shadow-md relative" style={{ maxWidth: '600px' }}>
          <div className='w-full rounded-t-md bg-[#811338] h-20 absolute top-0 left-0 right-0'></div>
          {/* Large Box */}
          <div className="flex flex-col " style={{ maxWidth: '600px' }}>
            <div className="flex justify-center py-4 px-20 ">
              <div className="rounded-full overflow-hidden h-20 w-20 flex-shrink-0 mr-4">
                <img
                  src={getDirectLinkFromShareableLink(StudentData.image)}
                  alt="User Avatar"
                  className="rounded-full border-2 absolute overflow-hidden h-20 w-20 flex-shrink-0 mr-4 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Header Design */}
          <div className="flex justify-center">
            <div className="mb-10 text-center max-w-xs">
              <h2 className="text-2xl font-bold break-words" >{capitalizeFirstLetter(StudentData.name)}</h2>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col p-0 text-left ">
              <p className="mb-4 text-sm font-semibold whitespace-nowrap" style={{ color: 'rgba(0,0,0)' }}>Register Number</p>
              <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Section</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="mb-4 text-sm text-gray-600">{StudentData.regNo}</p>
              <p className="text-sm text-gray-600" >E3</p>
            </div>
            <div className="flex flex-col text-left">
              <p className="text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Email</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className=" text-sm text-gray-600" style={{ wordBreak: 'break-all' }}>{StudentData.mailId}</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className=" text-sm font-semibold" style={{ color: 'rgba(0,0,0)' }}>Phone</p>
            </div>
            <div className="flex flex-col p-0 text-left">
              <p className="text-sm text-gray-600">{StudentData.phoneNo}</p>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="bg-[#811338] text-white px-4 py-2 rounded-md" onClick={() => {
              navigate(`/studentdashboard`);
            }}>
              BACK
            </button>
          </div>
        </div>

        {/* Largest Table */}
        <div className=' flex flex-grow w-full '>
          <div className='flex w-full flex-grow justify-center h-screen items-center  my-2 mr-0'>
            <div className="flex-col bg-[#edeef2] space-y-4  shadow-md rounded-lg m-2 ml-4 mr-4 w-full h-full overflow-y-scroll">

              <div className='w-full rounded-t-md bg-[#811338] h-auto lg:h-20 md:h-20'>
                <h1 class="text-3xl text-white font-code mb-4 pt-8 md:pt-5 md:pb-4 pb-8 px-2">Personal Information</h1>
              </div>

              <div className='flex bg-[#edeef2]  justify-center items-center'>

                <div className="flex-col space-y-2 flex-grow">
                  <div className='h-full rounded-xl  lg:px-7 px-2 '>
                    <h1 className="text-lg rounded-md font-bold shadow-md h-12 justify-items-center mb-4 mt-4 bg-[#EFBDBD] px-2 py-2" style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>Personal Details</h1></div>

                  <form>


                    {/* Flex layout with 4 rows, 2 columns */}
                    <div className="flex flex-wrap">
                      {/* First column */}

                      <div className="w-full sm:w-1/2 mb-4 ">

                        <label className="block text-sm font-semibold pr-1 text-gray-600 px-7">Name</label>
                        <TextareaAutosize
                          name="name"
                          readOnly
                          type="text"
                          className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2"
                          style={{ resize: 'none', overflow: 'hidden' }}
                          value={personaldetails.length > 0 ? capitalizeEachWord(personaldetails[0].name) : ''}
                          onChange={handlePersonalDetailInputChange} />
                      </div>

                      {/* Second column */}
                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold pr-1 text-gray-600 px-7">Department Name</label>
                        <input
                          name="dep"
                          readOnly
                          type="text"
                          className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2"
                          value={personaldetails.length > 0 ? capitalizeString(personaldetails[0].dep) : ''}
                          onChange={handlePersonalDetailInputChange} />
                      </div>

                      {/* Third column */}
                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold  text-gray-600 px-7">Section</label>
                        <input name="section"
                          readOnly={!isPersonalDetailEditable} // readOnly = True means can only read , if false can also write
                          type="text"
                          className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2"
                          value={

                            (isPersonalDetailEditable ? editedPersonalDetail.section : personaldetails[0]['section'])
                          }
                          onChange={handlePersonalDetailInputChange} />
                      </div>

                      {/* Fourth column */}
                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold  text-gray-600 px-7">Register Number</label>
                        <input
                          name="regNo"
                          readOnly
                          type="text"
                          className="lg:w-2/4 w-4/5 mx-6  border rounded-md px-3 py-2"
                          value={personaldetails.length > 0 ? personaldetails[0].regNo : ''}
                          onChange={handlePersonalDetailInputChange} />
                      </div>

                      {/* Fifth column */}
                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold  text-gray-600 px-7">Religion</label>
                        <input
                          name="religion"
                          readOnly={!isPersonalDetailEditable}
                          type="text"
                          className="lg:w-2/4 w-4/5  mx-7 border rounded-md px-3 py-2"
                          value={

                            (isPersonalDetailEditable ? editedPersonalDetail.religion : personaldetails[0]['religion'])
                          }  // if is editable true the editedPersonalDetail
                          onChange={handlePersonalDetailInputChange} />
                      </div>

                      {/* Sixth column */}
                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold text-gray-600 px-7">Community</label>
                        <input
                          name="community"
                          readOnly={!isPersonalDetailEditable}
                          type="text"
                          className="lg:w-2/4 w-4/5  border rounded-md  mx-6 px-3 py-2"
                          value={
                            (isPersonalDetailEditable ? editedPersonalDetail.community : personaldetails[0]['community'])
                          }
                          onChange={handlePersonalDetailInputChange} />
                      </div>

                      {/* Seventh column */}
                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold text-gray-600 px-7">Life Goal</label>
                        <input
                          name="lifeGoal"
                          readOnly={!isPersonalDetailEditable}
                          type="text"
                          className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2"
                          value={
                            (isPersonalDetailEditable ? editedPersonalDetail.lifeGoal : personaldetails[0]['lifeGoal'])
                          }
                          onChange={handlePersonalDetailInputChange} />
                      </div>

                      {/* Eighth column */}
                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold  text-gray-600 px-7">Blood Group</label>
                        <input
                          name="bloodGrp"
                          readOnly={!isPersonalDetailEditable}
                          type="text"
                          className="lg:w-2/4 mx-6 w-4/5 border rounded-md px-3 py-2"
                          value={
                            (isPersonalDetailEditable ? editedPersonalDetail.bloodGrp : personaldetails[0]['bloodGrp'])
                          }
                          onChange={handlePersonalDetailInputChange} />
                      </div>
                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold  text-gray-600 px-7">Languages Known</label>
                        <input
                          name="languages"
                          readOnly={!isPersonalDetailEditable}
                          type="text"
                          className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2"
                          value={
                            (isPersonalDetailEditable ? editedPersonalDetail.languages : personaldetails[0]['languages'])
                          }
                          onChange={handlePersonalDetailInputChange} />
                      </div>
                    </div>
                    <div className="flex">
  {permissions && permissions.EditPersonalDetail && (
    <button
      type="button"
      className="w-24 h-10 border my-0 mx-2 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2"
      onClick={isPersonalDetailEditable ? handleCancel : togglePersonalEdit}
    >
      {isPersonalDetailEditable ? 'Cancel' : 'Edit'}
    </button>
  )}
  {isPersonalDetailEditable && !isPersonalDetailSubmitting && (
    <button
      type="button"
      className="w-24 h-10 border my-0 mx-2 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2"
      onClick={handleUpdatePersonalDetail}
    >
      Submit
    </button>
  )}
</div>  {/* isPersonalDetailEditable true it show the cancel , false edit  */}




                  </form>

                  <form className='w-full'>
                    <div className="flex-col space-y-2 flex-grow">
                      <div className='h-full rounded-xl  lg:px-7 px-2 '>
                        <h1 className="text-lg rounded-md font-bold shadow-2xl h-12 justify-items-center mb-4 mt-4 bg-[#EFBDBD] px-2 py-2" style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>Parent Details</h1></div>
                    </div>


                    {/* Rounded rectangle around image and details */}
                    <div className="rounded-xl lg:w-3/4 md:w-full px-4 bg-gray-100 p-4 mx-auto mb-5">
                      <div className="flex flex-col lg:flex-row">
                        {/* Left column for image */}
                        <div className="w-full lg:w-1/2 mb-2 flex justify-center items-center">
                          <div className="w-3/4 h-3/4  overflow-hidden flex justify-center items-center">
                            <img src={getThumbnailLinkFromShareableLink( "https://drive.google.com/file/d/179DLKgs8SsFFAQNYkubmoWq-gfFclbMJ")} alt="Parent Image" className="w-40 h-40 rounded-full object-cover" />
                          </div>
                        </div>

                        {/* Right column for parent details */}
                        <div className="w-full lg:w-1/2 mb-4">
                          {/* First detail */}
                          <div className="w-full sm:w-3/4 mt-4 mb-2">
                            <label className="block text-sm font-semibold px-10 text-gray-600">Father's Name</label>
                            <TextareaAutosize
                              name="fatherName"
                              readOnly={!isParentDetailEditable}
                              type="text"
                              className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2"
                              style={{ resize: 'none', overflow: 'hidden' }}
                              value={(isParentDetailEditable ? editedParentDetail.fatherName : parentdetails[0]['fatherName'])
                              }
                              onChange={handleParentDetailInputChange} />
                          </div>

                          <div className="w-full sm:w-3/4 mb-2">
                            <label className="block text-sm font-semibold px-10 text-gray-600">Father's EmailId</label>
                            <input name="fatherMail"
                              readOnly={!isParentDetailEditable}type="text"
                              className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2"
                              value={(isParentDetailEditable ? editedParentDetail.fatherMail : parentdetails[0]['fatherMail'])
                              }
                              onChange={handleParentDetailInputChange} />
                          </div>

                          {/* Second detail */}
                          <div className="w-full sm:w-3/4 mb-2">
                            <label className="block text-sm px-10 font-semibold text-gray-600">Phone Number</label>
                            <input
                              name="fatherNo"
                              readOnly={!isParentDetailEditable} type="text"
                              className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2"
                              value={(isParentDetailEditable ? editedParentDetail.fatherNo : parentdetails[0]['fatherNo'])}
                              onChange={handleParentDetailInputChange} />
                          </div>

                          {/* Third detail */}
                          <div className="w-full sm:w-3/4 mb-2">
                            <label className="block text-sm px-10 font-semibold text-gray-600">Occupation</label>
                            <input name="fatherOcc"
                             readOnly={!isParentDetailEditable}
                              type="text"
                              className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2"
                              value={(isParentDetailEditable ? editedParentDetail.fatherOcc : parentdetails[0]['fatherOcc'])}
                              onChange={handleParentDetailInputChange} />
                          </div>
                        </div>
                        <div className="custom-file-upload flex justify-center lg:block lg:pl-12 py-4">
        
            {!selectedImages.fatherImage && isParentDetailEditable && <div>
              <label htmlFor="father-photo-upload" className="custom-button">
              <div className="flex space-x-1"><span>Upload Father Photo</span><BiImageAdd  className="text-2xl flex justify-center items-center"/></div>
            </label>
            <input
            name="fatherImage"
            id="father-photo-upload"
          
            className="border-0 h-12  px-4 w-fit max-w-min"
            type="file" 
            onChange={handleImageChange} 
            accept="image/*" />
            </div>}
            {error && <p style={{ color: 'red' }} className="lg:pl-4">{error}</p>}
            {selectedImages.fatherImage&&isParentDetailEditable && (
                <div
                className="">
                <p>{selectedImages.fatherImage.name}</p>
                <p className="text-green-500 pb-2">Image Uploaded Successfully</p>
                {/* <p>Selected Image:</p>
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                <button  disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button> */}

                <label htmlFor="father-photo-upload" className="custom-button">
              <div className="flex space-x-1"><span>Change Father Photo</span><BiImageAdd  className="text-2xl flex justify-center items-center"/></div>
            </label>
            <input
             name="fatherImage"
            id="father-photo-upload"
            className="border-0 h-12  px-4 w-fit max-w-min"
            type="file" 
            onChange={handleImageChange} 
            accept="image/*" />
                </div>
            )}
            </div>
                      </div>
                    </div>

                    <div className="rounded-xl lg:w-3/4 md:w-full px-4 bg-gray-100 p-4 mx-auto mb-5">
                      <div className="flex flex-col lg:flex-row">
                        {/* Left column for image */}
                        <div className="w-full lg:w-1/2 mb-2 flex justify-center items-center">
                          <div className="w-3/4 h-3/4  overflow-hidden flex justify-center items-center">
                            <img src={getThumbnailLinkFromShareableLink(parentdetails[0].motherPic)} alt="Parent Image" className="w-40 h-40 rounded-full object-cover" />
                          </div>
                        </div>

                        {/* Right column for parent details */}
                        <div className="w-full lg:w-1/2 mb-2">
                          {/* First detail */}
                          <div className="w-full sm:w-3/4 mt-4 mb-2">
                            <label className="block text-sm font-semibold px-10 text-gray-600">Mother's Name</label>
                            <TextareaAutosize name="motherName"
                              readOnly={!isParentDetailEditable}
                              type="text"
                              className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2"
                              style={{ resize: 'none', overflow: 'hidden' }}
                              value={(isParentDetailEditable ? editedParentDetail.motherName : parentdetails[0]['motherName'])}
                              onChange={handleParentDetailInputChange} />
                          </div>

                          <div className="w-full sm:w-3/4 mb-2">
                            <label className="block text-sm font-semibold px-10 text-gray-600">Mother's EmailId</label>
                            <input name="motherMail"
                              readOnly={!isParentDetailEditable} type="text"
                              className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2"
                              value={(isParentDetailEditable ? editedParentDetail.motherMail : parentdetails[0]['motherMail'])}
                              onChange={handleParentDetailInputChange} />
                          </div>

                          {/* Second detail */}
                          <div className="w-full sm:w-3/4 mb-2">
                            <label className="block text-sm px-10 font-semibold text-gray-600">Phone Number</label>
                            <input
                              name="motherNo"
                              readOnly={!isParentDetailEditable} type="text"
                              className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2"
                              value={(isParentDetailEditable ? editedParentDetail.motherNo : parentdetails[0]['motherNo'])}
                              onChange={handleParentDetailInputChange} />
                          </div>

                          {/* Third detail */}
                          <div className="w-full sm:w-3/4 mb-2">
                            <label className="block text-sm px-10 font-semibold text-gray-600">Occupation</label>
                            <input name="motherOcc"
                              readOnly={!isParentDetailEditable}
                              type="text"
                              className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2"
                              value={(isParentDetailEditable ? editedParentDetail.motherOcc : parentdetails[0]['motherOcc'])}
                              onChange={handleParentDetailInputChange} />
                          </div>
                        </div>

                        <div className="custom-file-upload flex justify-center lg:block lg:pl-12 py-4">
        
            {!selectedImages.motherImage&& isParentDetailEditable && <div>
              <label htmlFor="mother-photo-upload" className="custom-button">
              <div className="flex space-x-1"><span>Upload Mother Photo</span><BiImageAdd  className="text-2xl flex justify-center items-center"/></div>
            </label>
            <input
            name="motherImage"
            id="mother-photo-upload"
          
            className="border-0 h-12  px-4 w-fit max-w-min"
            type="file" 
            onChange={handleImageChange} 
            accept="image/*" />
            </div>}
            {error && <p style={{ color: 'red' }} className="lg:pl-4">{error}</p>}
            {selectedImages.motherImage&&isParentDetailEditable && (
                <div
                className="">
                <p>{selectedImages.motherImage.name}</p>
                <p className="text-green-500 pb-2">Image Uploaded Successfully</p>
                {/* <p>Selected Image:</p>
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                <button  disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button> */}

                <label htmlFor="mother-photo-upload" className="custom-button">
              <div className="flex space-x-1"><span>Change Mother Photo</span><BiImageAdd  className="text-2xl flex justify-center items-center"/></div>
            </label>
            <input
            name="motherImage"
            id="mother-photo-upload"
            className="border-0 h-12  px-4 w-fit max-w-min"
            type="file" 
            onChange={handleImageChange} 
            accept="image/*" />
                </div>
            )}
            </div>
                      </div>
                    </div>

                    <div className="rounded-xl lg:w-3/4 md:w-full px-4 bg-gray-100 p-4 mx-auto mb-5">
                      <div className="flex flex-col lg:flex-row">
                        {/* Left column for image */}
                        <div className="w-full lg:w-1/2 mb-2 flex justify-center items-center">
                          <div className="w-3/4 h-3/4  overflow-hidden flex justify-center items-center">
                            <img src={getThumbnailLinkFromShareableLink(parentdetails[0].guardianPic)} alt="Parent Image" className="w-40 h-40 rounded-full object-fit:cover" />
                          </div>
                        </div>

                        {/* Right column for parent details */}
                        <div className="w-full lg:w-1/2 mb-2">
                          {/* First detail */}
                          <div className="w-full sm:w-3/4 mt-4 mb-4">
                            <label className="block text-sm font-semibold px-10 text-gray-600">Guardian's Name</label>
                            <TextareaAutosize name="guardianName" readOnly={!isParentDetailEditable} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2" style={{ resize: 'none', overflow: 'hidden' }}
                              value={(isParentDetailEditable ? editedParentDetail.guardianName : parentdetails[0]['guardianName'])}
                              onChange={handleParentDetailInputChange} />
                          </div>

                          <div className="w-full sm:w-3/4 mb-2">
                            <label className="block text-sm font-semibold px-10 text-gray-600">Guardian's EmailId</label>
                            <input name="guardianMail" readOnly={!isParentDetailEditable} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2"
                              value={(isParentDetailEditable ? editedParentDetail.guardianMail : parentdetails[0]['guardianMail'])}
                              onChange={handleParentDetailInputChange} />
                          </div>

                          {/* Second detail */}
                          <div className="w-full sm:w-3/4 mb-2">
                            <label className="block text-sm px-10 font-semibold text-gray-600">Phone Number</label>
                            <input name="guardianNo"readOnly={!isParentDetailEditable} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2"
                              value={(isParentDetailEditable ? editedParentDetail.guardianNo : parentdetails[0]['guardianNo'])}
                              onChange={handleParentDetailInputChange} />
                          </div>
                          <div className="w-full sm:w-3/4 mb-2">
                            <label className="block text-sm px-10 font-semibold text-gray-600">Occupation</label>
                            <input name="guardianOcc" readOnly={!isParentDetailEditable} type="text" className="lg:w-full mx-7 w-4/5 border rounded-md px-3 py-2"
                              value={(isParentDetailEditable ? editedParentDetail.guardianOcc : parentdetails[0]['guardianOcc'])}
                              onChange={handleParentDetailInputChange} />
                          </div>
                        </div>

                        <div className="custom-file-upload flex justify-center lg:block lg:pl-12 py-4">
        
            {!selectedImages.guardianImage&& isParentDetailEditable && <div>
              <label htmlFor="guardian-photo-upload" className="custom-button">
              <div className="flex space-x-1"><span>Upload Guardian Photo</span><BiImageAdd  className="text-2xl flex justify-center items-center"/></div>
            </label>
            <input
            name="guardianImage"
            id="guardian-photo-upload"
          
            className="border-0 h-12  px-4 w-fit max-w-min"
            type="file" 
            onChange={handleImageChange} 
            accept="image/*" />
            </div>}
            {error && <p style={{ color: 'red' }} className="lg:pl-4">{error}</p>}
            {selectedImages.guardianImage&&isParentDetailEditable && (
                <div
                className="">
                <p>{selectedImages.guardianImage.name}</p>
                <p className="text-green-500 pb-2">Image Uploaded Successfully</p>
                {/* <p>Selected Image:</p>
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                <button  disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button> */}

                <label htmlFor="guardian-photo-upload" className="custom-button">
              <div className="flex space-x-1"><span>Change Guardian Photo</span><BiImageAdd  className="text-2xl flex justify-center items-center"/></div>
            </label>
            <input
             name="guardianImage"
            id="guardian-photo-upload"
            className="border-0 h-12  px-4 w-fit max-w-min"
            type="file" 
            onChange={handleImageChange} 
            accept="image/*" />
                </div>
            )}
            </div>
                      </div>
                    </div>
                    <div className="flex">
  {permissions && permissions.EditParentDetail && (
    <button
      type="button"
      className="w-24 h-10 border my-0 mx-2 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2"
      onClick={isParentDetailEditable ? handleCancel : toggleParentEdit}
    >
      {isParentDetailEditable ? 'Cancel' : 'Edit'}
    </button>
  )}
  {isParentDetailEditable && !isParentDetailSubmitting && (
    <button
      type="button"
      className="w-24 h-10 border my-0 mx-2 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2"
      onClick={handleUpdateParentDetail}
    >
      Submit
    </button>
  )}
</div>
                  </form>


                  <form>
                    <div className='h-full rounded-xl lg:px-7 px-2'>
                      <h1 className="text-lg rounded-md font-bold shadow-md h-12 justify-items-center mb-4 mt-4 bg-[#EFBDBD] px-2 py-2" style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>Address</h1>
                    </div>

                    <div className="flex flex-col">
                      {/* First column */}
                      <div className="w-full sm:w-3/4 mb-4">
                        <label className="block text-sm font-semibold px-10 text-gray-600">Permanent Address</label>
                        <TextareaAutosize name="permanentAdd"  readOnly={!isAddressEditable}
                          type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" style={{ resize: 'none', overflow: 'hidden' }}
                          value={(isAddressEditable ? editedAddress.permanentAdd : address[0]['permanentAdd'])}
                          onChange={handleAddressInputChange} />
                      </div>

                      {/* Second column */}
                      <div className="flex flex-row items-start justify-start flex-wrap sm:flex-col  sm:justify-start md:flex-row">
                        <div className="w-full sm:w-3/4 mb-4">
                          <label className="block text-sm font-semibold px-10 text-gray-600">Communication Address</label>
                          <TextareaAutosize name="communicationAdd" readOnly={!isAddressEditable}
                            type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2" style={{ resize: 'none', overflow: 'hidden' }}
                            value={(isAddressEditable ? editedAddress.communicationAdd : address[0]['communicationAdd'])}
                            onChange={handleAddressInputChange} />

<button
    type="button"
    className="w-24 h-10 border my-0 mx-7 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2"
    onClick={handleHostellerToggle}
    disabled={!isAddressEditable}
  >
    {editedAddress.hosteller ? 'Cancel Hosteller' : 'Hosteller'}
  </button>

  {/* Hostel Name and Hostel Number fields */}
  {editedAddress.hosteller && (
    <div className="mt-4">
      <div className="mb-2">
        <label className="block text-sm font-semibold px-10 text-gray-600">Hostel Name</label>
        <input
          name="hostelName"
          readOnly={!isAddressEditable}
          type="text"
          className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2"
          value={editedAddress.hostelName}
          onChange={(e) => setEditedAddress({ ...editedAddress, hostelName: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-semibold px-10 text-gray-600">Hostel Number</label>
        <input
          name="hostelNo"
          readOnly={!isAddressEditable}
          type="text"
          className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2"
          value={editedAddress.hostelNo}
          onChange={(e) => setEditedAddress({ ...editedAddress, hostelNo: e.target.value })}
        />
      </div>
    </div>
  )}
</div>

                      </div>

                      {/* Third column */}
                      <div className="flex flex-row items-start justify-start flex-wrap sm:flex-col sm:justify-start md:flex-row">

                        <div className="w-full sm:w-1/2 mb-4">
                          <label className="block text-sm font-semibold px-10 text-gray-600">Number</label>
                          <input name="phoneNo" readOnly={!isAddressEditable}
                            type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2"
                            value={(isAddressEditable ? editedAddress.phoneNo : address[0]['phoneNo'])}
                            onChange={handleAddressInputChange} />
                        </div>

                        <div className="w-full sm:w-1/2 mb-4">
                          <label className="block text-sm font-semibold px-10 text-gray-600">Alternative Number</label>
                          <input name="alterNo" readOnly={!isAddressEditable} type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2"
                            value={(isAddressEditable ? editedAddress.alterNo : address[0]['alterNo'])}
                            onChange={handleAddressInputChange} />
                        </div>
                      </div>
                    </div>

                    <div className="flex">
  {permissions && permissions.EditAddress && (
    <button
      type="button"
      className="w-24 h-10 border my-0 mx-2 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2"
      onClick={isAddressEditable ? handleCancel : toggleAddressEdit}
    >
      {isAddressEditable ? 'Cancel' : 'Edit'}
    </button>
  )}
  {isAddressEditable && !isAddressSubmitting && (
    <button
      type="button"
      className="w-24 h-10 border my-0 mx-2 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2"
      onClick={handleUpdateAddress}
    >
      Submit
    </button>
  )}
</div>
                  </form>



                  <form>
                    <div className='h-full rounded-xl lg:px-7 px-2'>
                      <h1 className="text-lg rounded-md font-bold shadow-md h-12 justify-items-center mb-4 mt-4 bg-[#EFBDBD] px-2 py-2" style={{ boxShadow: 'inset 0px 6px 6px -6px rgba(0, 0, 0, 0.5)', borderTop: '2px solid rgba(0, 0, 0, 0.2)' }}>Academic Details</h1>
                    </div>

                    {/* Flex layout with 2 rows, 2 columns for Address */}
                    <div className="">
                      {/* First column */}
                      {/* Second column */}
                      <div className="w-full sm:w-1/2 mb-4">
                        <label className="block text-sm font-semibold px-10 text-gray-600">12th Previous Institution Name</label>
                        <TextareaAutosize name="previousInst"
                          readOnly={!isAcademicDetailEditable} type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2"
                          style={{ resize: 'none', overflow: 'hidden' }}
                          value={(isAcademicDetailEditable ? editedAcademicDetail.previousInst : academicdetails[0]['previousInst'])}
                          onChange={handleAcademicDetailInputChange} />
                      </div>
                      <div className='flex flex-wrap'>
                        {/* Third column */}
                        <div className="w-full sm:w-1/2 mb-4">
                          <label className="block text-sm font-semibold px-10 text-gray-600">10th Percentage</label>
                          <input name="tenthper"
                            readOnly={!isAcademicDetailEditable}
                            type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2"
                            value={(isAcademicDetailEditable ? editedAcademicDetail.tenthper : academicdetails[0]['tenthper'])}
                            onChange={handleAcademicDetailInputChange} />
                        </div>

                        {/* Fourth column */}
                        <div className="w-full sm:w-1/2 mb-4">
                          <label className="block text-sm font-semibold px-10 text-gray-600">12th Percentage</label>
                          <input name="twelfthper"
                            readOnly={!isAcademicDetailEditable}
                            type="text" className="lg:w-2/4 mx-7 w-4/5 border rounded-md px-3 py-2"
                            value={(isAcademicDetailEditable ? editedAcademicDetail.twelfthper : academicdetails[0]['twelfthper'])}
                            onChange={handleAcademicDetailInputChange} />
                        </div>
                      </div>
                    </div>
                    <div className="flex">
  {permissions && permissions.EditAcademicDetail && (
    <button
      type="button"
      className="w-24 h-10 border my-0 mx-2 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2"
      onClick={isAcademicDetailEditable ? handleCancel : toggleAcademicDetailEdit}
    >
      {isAcademicDetailEditable ? 'Cancel' : 'Edit'}
    </button>
  )}
  {isAcademicDetailEditable && !isAcademicDetailSubmitting && (
    <button
      type="button"
      className="w-24 h-10 border my-0 mx-2 bg-[#811338] text-white flex items-center justify-center rounded-md px-3 py-2"
      onClick={handleUpdateAcademicDetail}
    >
      Submit
    </button>
  )}
</div>


                  </form>
                 


                </div>
              </div>
            </div>
            {/* Second Box */}
          </div>
        </div>
      </div>

    </>
  );
};



