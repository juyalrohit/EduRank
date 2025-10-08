import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../context/AuthContext';
import {Loader, Loader2} from 'lucide-react'



const RateTeacher = () => {

  const [knowledge, setKnowledge] = useState();
  const [teachingStyle, setTeachingStyle] = useState();
  const [assessmentFairness, setAssessmentFairness] = useState();
  const [studentSupport, setStudentSupport] = useState();
  const [comment,setComment] = useState();

  const { Id: targetId} = useParams(); // Get teacher ID from URL params
  const [loading, setloading] = useState(false)

  const navigate = useNavigate();
  const {isAuthenticated,backendURL} = useAuth();

  
 

  const submitReview = async (e) => {
    e.preventDefault();
    setloading(true);
    if(!isAuthenticated){
          toast.info("Please login to proceed!")
          return;
    }

    try {
        const response = await axios.post(backendURL + '/review/create-review', {
        knowledge,
        teachingStyle,
        assessmentFairness,
        studentSupport,
        comment,
        type:"teacher",
        targetId,
      }, { withCredentials: true });

      toast.success('Review submitted successfully!');

      setTimeout(()=>{
        window.location.reload();
        navigate(-1)
      },2000)


    } catch (error) {
      console.log('Error submitting review:', error);
      toast.error("Failed to submit review!");
    }
    finally{
      setloading(false);
    }
  };

  const goBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-200 px-6 sm:mt-20 mt-6 py-6 ">
     <div onClick={goBack} className='fixed sm:top-24 top-16 sm:right-4 right-6 z-99 text-xl cursor-pointer transform hover:bg-red-600 '>
            <i class="ri-close-large-line"></i>
    </div>

      <div className="bg-white shadow-lg rounded-lg p-8 sm:w-[50vw] w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Give Your Review</h1>
        <p className='text-red-500 text-sm tracking-wider mb-4 ml-2'>Note : Please submit a review only if you have been taught by this teacher.</p>

        <form onSubmit={submitReview} className="space-y-4">
          <div className="space-y-6">
            <label className="text-gray-700 font-medium sm:mb-1 mb-6 ">
              <i class="ri-arrow-right-s-fill"></i> 
              Subject Knowledge –  (Does the teacher have deep understanding of the subject?)
            </label>
            <input
              type="number"
              required
              placeholder="Give a number from 1 to 10"
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setKnowledge(e.target.value)}
              min="1"
              max="10"
            />

            <label className="text-gray-700 font-medium mb-1  sm:mt-0 mt-9"><i class="ri-arrow-right-s-fill"></i> Teaching Style – (Can they explain concepts clearly and effectively?)</label>
            <input
              type="number"
              required
              placeholder="Give a number from 1 to 10"
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setTeachingStyle(e.target.value)}
              min="1"
              max="10"
            />

            <label className="text-gray-700 font-medium mb-1  sm:mt-0 mt-9"><i class="ri-arrow-right-s-fill"></i> Punctuality/Consistency – (Do they take classes on time and regularly?)</label>
            <input
              type="number"
              required
              placeholder="Give a number from 1 to 10"
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setAssessmentFairness(e.target.value)}
              min="1"
              max="10"
            />

            <label className="text-gray-700 font-medium mb-1  sm:mt-0 mt-9"><i class="ri-arrow-right-s-fill"></i> Student Support – (Are they helpful and approachable outside of class?)</label>
            <input
              type="number"
              required
              placeholder="Give a number from 1 to 10"
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setStudentSupport(e.target.value)}
              min="1"
              max="10"
            />
          </div>

          <div className="px-4">
            <label className="block text-gray-700 font-medium mb-1  ">Comment:</label>
            <textarea
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              rows="4"
              placeholder="Write your feedback..."
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <button className="btn w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300 " disabled={loading}>
            {loading ? <Loader2 className='animate-spin' /> :
            "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RateTeacher;
