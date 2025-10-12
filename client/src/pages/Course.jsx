import React, { useState } from 'react'
import Foter from '../component/Foter'
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'


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
      <motion.div
       initial={{y:-30,opacity:0}}
       animate={{y:0,opacity:1}}
       transition={{duration:0.75,ease:'easeInOut'}}
       className='w-full h-screen mt-22 bg-neutral-50 '>

     
        <div className="w-full bg-opacity-50  z-50  flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-center text-red-800 uppercase ">
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

      
    </motion.div>
     )
}

export default Course