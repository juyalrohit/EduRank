import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const DropDown = ({navElement,features}) => {
    const [isHovered, setIsHovered] = useState(false);
    const toggleDropdown = () => {
      setIsHovered(!isHovered);
    };
  
  return (
    <div className="relative cursor-pointer text-[16px] font-medium  transition-colors duration-300 hover:text-red-600 
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] 
    after:bg-red-600 after:scale-x-0 after:origin-bottom after:transition-transform after:duration-300 
    hover:after:scale-x-100">
        <div
        className="flex items-center cursor-pointer p-2 hover:bg-gray-200 rounded-md"
        onClick={toggleDropdown}
      >
        <span className="mr-2 font-medium">{navElement}</span>

        {isHovered ? (
          <span><i className="ri-arrow-up-wide-fill"></i></span> 
        ) : (
          <span><i className="ri-arrow-down-wide-fill"></i></span> 
        )}

      </div>

      {/* Dropdown Menu */}
      {isHovered && (
        <div
          className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ul className="py-1">
           {features.map((feature,index)=>(
            
            <Link to={feature.url}><li key={index}  className='text-gray-700 px-4 py-2 transition-colors duration-300 hover:text-green-600  
    after:bg-green-600 after:scale-x-0 after:origin-bottom after:transition-transform after:duration-300 
    hover:after:scale-x-100'>
            {feature.name}
          </li></Link>
           ))

           }
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropDown;