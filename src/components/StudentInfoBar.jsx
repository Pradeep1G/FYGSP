
import React from 'react';

const YourComponent = () => {
  const data = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Age', value: 25 },
    { label: 'Location', value: 'City, Country' },
    // Add more data as needed
  ];

  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      <div className="flex flex-col w-48">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <div className="font-bold">{item.label}</div>
            <div className="text-gray-600">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stude;
