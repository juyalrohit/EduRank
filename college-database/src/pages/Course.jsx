import React, { useState } from 'react'
import Foter from '../component/Foter'
import { useNavigate } from 'react-router-dom';


 const kumaunCourses = [
  "B.Sc ",
  "Bachelor of Computer Applications [BCA]",
  "B.A.",
  "M.Sc",
  "LLB",
  "M.Com",
  "M.A",
  "B.B.A",
  "L.L.M",
  "Bachelor of Business Administration [BBA]",
];


const Course = () => {

   const naviGate = useNavigate();
  return (
      <div className='w-full h-screen mt-20 bg-neutral-50 '>

     
        <div className="w-full bg-opacity-50  z-50  flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              📚 Courses Offered at Kumaun University
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              {kumaunCourses.map((course, idx) => (
                <li
                  key={idx}
                  className="bg-gray-100 hover:bg-gray-200 rounded-xl p-3 shadow-sm"
                >
                  🎓 {course}
                </li>
              ))}
            </ul>

            <button
              onClick={() => naviGate(-1)}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>

    <div>
        <Foter/>
    </div>

      
    </div>
     )
}

export default Course