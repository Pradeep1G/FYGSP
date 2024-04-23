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
            <div className='font-bold'>Activity Name:</div>
            <div className="mt-1 p-2 border rounded-md w-full">{props.activityName}</div>
          </label>

          <label className="w-1/2 pl-2">
            <div className='font-bold'>Type of Activity:</div>
            <div className="mt-1 p-2 border rounded-md w-full">{props.activityType}</div>
          </label>
        </div>

        <div className="flex flex-wrap mb-4">
          <label className="block mb-4">
            <div className='font-bold'>If Other:</div>
            <div className="mt-1 p-2 border rounded-md w-full">{props.ifOther}</div>
          </label>
        </div>

        {props.fileURL && (
          <div className="mt-4">
            <p>
              {props.brochureURL && (
                <>
                  Brochure:
                  <a href={props.brochureURL} target="_blank" rel="noopener noreferrer">
                    {props.brochureURL}
                  </a>
                  <br />
                </>
              )}

              {props.certificates && props.certificates.map((certificate, index) => (
                <span key={index}>
                  Certificate {index + 1}:
                  <a href={certificate.certificateURL} target="_blank" rel="noopener noreferrer">
                    {certificate.certificateURL}
                  </a>
                  <br />
                </span>
              ))}
            </p>

            <button
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 mr-2"
              onClick={handleViewFile}
            >
              View File
            </button>

            <button
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 mr-2"
              onClick={handleDownloadFile}
            >
              Download File
            </button>

            {props.brochureURL && (
              <button
                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-700"
                onClick={() => handleViewCertificate(props.brochureURL)}
              >
                View Brochure
              </button>
            )}

            {props.certificateURL && (
              <button
                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-700"
                onClick={handleViewCertificate}
              >
                View Certificate
              </button>
            )}
          </div>
        )}

        {!props.fileURL && (
          <div className="mt-4">
            <p>No file submitted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementCard;
