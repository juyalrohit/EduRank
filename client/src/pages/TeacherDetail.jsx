import React, { useEffect, useState } from 'react'
import ReviewCard from '../feature/ReviewCard';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import RatingBadge from '../feature/RatingBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import College from '../assets/maxresdefault.jpg'


const TeacherDetail = () => {
    const {Id} = useParams();
    const naviGate = useNavigate();
    const [isExpanded, setisExpanded] = useState(false);
    const [teacher, setteacher] = useState();
    const [loading, setloading] = useState(true);


  

    useEffect(()=>{

      const fetchDepartment = async()=>{
         try{
            const res = await axios.get(`http://localhost:3000/teacher/get-teacher/${Id}`);
            setteacher(res.data);

        }
        catch(error){
            console.log("Get Error Fetching Teacher" , error);
        }
        finally{
            setloading(false);
        }

    }
    fetchDepartment();
},[Id]);

const getColorBasedOnRating = (rating) => {
  if (rating >= 9) return "#2ecc71";   // Green
  if (rating >= 7) return "#3498db";   // Blue
  if (rating >= 4) return "#f39c12";   // Orange
  return "#e74c3c";                    // Red
};




console.log(teacher)



const goBack = () => {
    naviGate(-1); // Goes back to the previous page
  };
  
if(loading) return <p>Fetching Teacher Details....</p>;


const data = [
  { name: 'Subject Knowledge', rating: teacher.ratings.reduce((sum, r) => sum + r.knowledge, 0) /  teacher.ratings.length },
  { name: 'Teaching Style', rating: teacher.ratings.reduce((sum, r) => sum + r.teachingStyle, 0) /  teacher.ratings.length },
  { name: 'Assesment Fairness', rating: teacher.ratings.reduce((sum, r) => sum + r.assessmentFairness, 0) /  teacher.ratings.length },
  { name: 'Student Support', rating: teacher.ratings.reduce((sum, r) => sum + r.studentSupport, 0) /  teacher.ratings.length }
];


  return (
    <div className='w-full  pb-5 sm:mt-22'>

        <div onClick={goBack} className='fixed sm:top-24 top-14 sm:right-4 right-3 z-99 text-xl cursor-pointer transform hover:bg-red-600 '>
            <i class="ri-close-large-line"></i>
        </div>

        <button  onClick={()=>naviGate(`/RateTeacher/${Id}`)} 
        className="btn fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white font-bold sm:py-6 py-2 sm:px-5 px-3 rounded-full shadow-lg transition duration-300 z-99">
          Give Review ⭐
        </button>
         <div className='w-full h-72 z-59 relative'>
            <div className='sm:text-xl text-[1rem] text-white absolute top-30 sm:pl-10 pl-4 z-50 '>
                <h1 className='sm:text-2xl text-xl  tracking-wider font-bold uppercase'> Department of {teacher.department.name.replace(/Department/gi, '').trim() }</h1>
                <span>{teacher.position}</span>
                <span> {teacher.name} </span>
                <span>student feedbacks</span>
            </div>
     
            <img className=' w-full h-full blur-[3px]  ' src={College}alt="Computer" />
       </div>

      <div className='w-[80%] mx-auto mt-10 sm:flex  gap-44 space-y-8 '>
        <img className='w-80  sm:h-80 h-70 shadow-sm' src={teacher.picture} alt="" />
        <div className='space-y-3 w-full'>

            <h1 className='sm:text-3xl text-2xl underline font-bold mb-8 '>{teacher.position} in Computer Science Department</h1>
              {/* Name */}
              <div className='flex gap-4 mb-3 text-lg'>
                  <p className=''>Name :</p>
                
                  <p className='text-gray-800 '>{teacher.name}</p>

              </div>

              {/* Email */}

            <div className='flex gap-4 mb-3 text-lg'>
                 
             <p className='text-lg tracking-wider'>Email :</p> 
             <p className=' text-gray-800'>{teacher.email}</p>
            </div>
             
             {/* Phone */}

             <div className='flex gap-4 mb-3 text-lg'>
                 <p className='text-lg tracking-wider'>Phone : </p>
                 <p className='sm:ml-6  text-gray-800' >{teacher.phone}</p>
             </div>
           

            
            <h2 className="text-xl font-bold mb-4  ">Ratings</h2>
           <p className='md:hidden text-red-500  text-sm font-light '>Note : For Small Screen Rating Bars Graph Migh Not Work Properly.</p>
       <div className="sm:w-full h-[400px] bg-white rounded-2xl p-4 shadow-xl overflow-y-auto  ">

          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data}>
              
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />           // Shows 'Subject Knowledge', etc.
              <YAxis domain={[0, 10]} />         // Y-axis ranges from 0 to 10
              <Tooltip />                        // Shows tooltip on hover
              <Bar 
                dataKey="rating"                 // Each bar shows the average rating
                  // Purple-ish color
                radius={[10, 10, 0, 0]} >
                  {
                    data.map((entry,idx)=>(
                      <Cell
                       key={idx}
                       fill={getColorBasedOnRating(entry.rating)}
                      
                      />
                    ))
                  }
                </Bar>        
            </BarChart>
        </ResponsiveContainer>

          </div>

        </div>

     </div>
      <div className='max-w-3xl  mx-auto  rounded-4xl  mt-6 p-4 bg-white  border-gray-500 shadow-lg mb-14'>

        <div className="flex justify-between items-center cursor-pointer border-b pb-3 p-2" onClick={()=> setisExpanded(!isExpanded)}>
        <h2 className="text-xl font-semibold">Student Feedbacks</h2>
        <span className="text-lg">{isExpanded ? <i class="ri-arrow-up-wide-fill"></i> : <i class="ri-arrow-down-wide-line"></i>}</span>
        </div>
        {
            isExpanded && (
                <div className='space-y-4  mt-4 overflow-y-auto'>
                    {
                        loading ? (
                            <p>coment are loading</p>
                        ) : 
                             teacher.ratings.length===0 ?  (
                                <p>No reviews yet. Be the first to review!</p>
                            ) : (
                                teacher.ratings.map((review)=>{
                                return <ReviewCard key={review._id} review={review} />})
                            )
                    }
                     
            </div>
            )
        }

      </div>
        
    </div>
  )
}

export default TeacherDetail