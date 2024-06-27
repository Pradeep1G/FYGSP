import React from 'react';

const AchievementCard = (props) => {

  const handleViewFile = () => {
    if (props.fileURL) {
      window.open(props.fileURL, '_blank');
    }
  };

  const handleDownloadFile = () => {
    if (props.fileURL) {
      const downloadLink = document.createElement('a');
      downloadLink.href = props.fileURL;
      downloadLink.download = props.fileName;
      downloadLink.click();
    }
  };

  const handleViewCertificate = () => {
    if (props.certificateURL) {
      window.open(props.certificateURL, '_blank');
    }
  };

  return (
    <div className="max-w-md bg-[#f6f5f5] rounded-xl shadow-md overflow-hidden md:max-w-3xl mt-4">
      <div className="p-2">
        <div className="flex mb-2">
          <label className="w-1/2 pr-2">
            <div className='font-bold'>Type of Achievement:</div>
            <div className="mt-1 p-2 border rounded-md w-full">{props.typeOfAch}</div>
          </label>

          <label className="w-1/2 pl-2">
            <div className='font-bold'>Description:</div>
            <div className="mt-1 p-2 border rounded-md w-full">{props.description}</div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
