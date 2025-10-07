import React from 'react'

const RatingBar = ({ rating }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${(rating / 10) * 100}%` }}
        ></div>
      </div>
    );
  };
  
  export default RatingBar;
  