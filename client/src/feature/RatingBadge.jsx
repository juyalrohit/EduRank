import React from 'react'

const RatingBadge = ({ rating }) => {
  let textColor = "text-gray-400"; // Default
  let label = "Poor"; // Default label




  if (rating >= 8) {
    textColor = "text-green-500";
    label = "Excellent";
  } else if (rating >= 6) {
    textColor = "text-blue-500";
    label = "Good";
  } else if (rating >= 4) {
    textColor = "text-yellow-500";
    label = "Average";
  } else {
    textColor = "text-red-500";
    label = "Poor";
  }

  return (
    <span className={`px-3 py-1 ${textColor} rounded-lg  text-sm font-medium`}>
      {rating} ({label})
    </span>
  );
  };
  
  export default RatingBadge;