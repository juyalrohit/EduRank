import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../context/AuthContext';



const RateDepartment = () => {
  const [knowledge, setKnowledge] = useState();
  const [teachingStyle, setTeachingStyle] = useState();
  const [assessmentFairness, setAssessmentFairness] = useState();
  const [studentSupport, setStudentSupport] = useState();
  const [comment, setComment] = useState('');
  const [type] = useState('department'); 
  const { Id: targetId } = useParams();
  const [flashmessage, setflashmessage] = useState();
  const navigate = useNavigate();

  const {isAuthenticated} = useAuth();


  const submitReview = async (e) => {
    e.preventDefault();
    if(!isAuthenticated){
      toast.info("Please login to proceed!")
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/review/create-review', {
        knowledge,
        teachingStyle,
        assessmentFairness,
        studentSupport,
        comment,
        type,
        targetId,
      }, { withCredentials: true });
      
      toast.success("Review succesfully submitted");
      setTimeout(()=>{
        navigate(`/department/${targetId}`);
      },2000)
    } catch (error) {
      console.log('Error submitting review:', error);
      toast.error("Failed to submit review")
    }
  };

  const goBack = () => {
    navigate(-1); // Goes back to the previous page
  };
  
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 px-6 sm:mt-20 mt-6">

        <div onClick={goBack} className='fixed sm:top-24 top-16 sm:right-4 right-6 z-99 text-xl cursor-pointer transform hover:bg-red-600 '>
            <i class="ri-close-large-line"></i>
       </div>
   
  <div className="bg-white shadow-lg rounded-lg p-8 sm:w-[50vw] w-full">
    <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Give Your Review</h1>
        <p className='text-red-500 text-sm tracking-wider mb-4 ml-2'>Note : Please submit a review only if you belong to this department</p>

    <form className="space-y-4"  onSubmit={submitReview}>
    
          <label className="block text-gray-700 font-medium mb-1"><i class="ri-arrow-right-s-fill"></i> Overall Facilities – (Labs, classrooms, libraries, etc.)</label>
          <input
            onChange={(e)=> setKnowledge(e.target.value)}
            type="number"
            min={1}
            max={10}
            placeholder="Give a number from 1 to 10"
            className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <label className="block text-gray-700 font-medium mb-1"><i class="ri-arrow-right-s-fill"></i>Faculty Support – (How supportive teachers & staff are)</label>
          <input
            onChange={(e)=>setTeachingStyle(e.target.value)}
            type="number"
            min={1}
            max={10}
            placeholder="Give a number from 1 to 10"
            className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <label className="block text-gray-700 font-medium mb-1"><i class="ri-arrow-right-s-fill"></i>Extracurricular Activities – (Events, competitions, etc.)</label>
          <input
            onChange={(e)=> setAssessmentFairness(e.target.value)}
            type="number"
            min={1}
            max={10}
            placeholder="Give a number from 1 to 10"
            className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <label className="block text-gray-700 font-medium mb-1"><i class="ri-arrow-right-s-fill"></i> Course Structure – (Relevance and quality of syllabus)</label>
          <input
            onChange={(e)=> setStudentSupport(e.target.value)}
            type="number"
            min={1}
            max={10}
            placeholder="Give a number from 1 to 10"
            className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

         
      <div>
        <label className="block text-gray-700 font-medium mb-1">Comment:</label>
        <textarea
          onChange={(e)=>setComment(e.target.value)}
          className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          rows="4"
          placeholder="Write your feedback..."
        ></textarea>
      </div>

      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300">
        Submit
      </button>
    </form>
  </div>
</div>
 )
}

export default RateDepartment;