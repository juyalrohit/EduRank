import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Foter from '../component/Foter';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RatingBadge from '../feature/RatingBadge';
import ReviewCard from '../feature/ReviewCard';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ReadMore from '../feature/ReadMore'



const DepartmentDetail = () => {
  const { id } = useParams(); // Get department ID from the URL
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded,setIsExpanded] = useState(false);
  const naviGate = useNavigate();
  const {departments} = useAuth();
  


  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/department/get-department/${id}`);
        setDepartment(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching department:", error);
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!department) return <p>Department not found!</p>;


  // Get the data for the current department
  console.log({department});

  
const getColorBasedOnRating = (rating) => {
  if (rating >= 9) return "#2ecc71";   // Green
  if (rating >= 7) return "#3498db";   // Blue
  if (rating >= 4) return "#f39c12";   // Orange
  return "#e74c3c";                    // Red
};


  const data = [
  { name: 'Overall Facilities', rating:department.ratings.reduce((sum,r)=> sum+ r.knowledge,0)/department.ratings.length },
  { name: 'Faculty Support', rating:department.ratings.reduce((sum,r)=>sum+r.teachingStyle,0)/department.ratings.length},
  { name: 'Extracurricular Activities', rating: department.ratings.reduce((sum,r)=>sum+r.teachingStyle,0)/department.ratings.length},
  {name:  'Course Structure' , rating:department.ratings.reduce((sum,r)=>sum+r.studentSupport,0)/department.ratings.length}
];

  const settings = {
    accessibility:true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const currentYear = new Date().getFullYear();
  const yearsOfDevelopment = currentYear - department.foundedYear;

 


const rank = departments.findIndex((dept)=>dept._id===id);

const type = "department"



  return (
    <>
     
     <div id='dept' className="w-[100vw]  sm:mt-22 sm:flex-none flex flex-col ">
     <div onClick={()=>naviGate('/')} className='fixed sm:top-24 top-14 sm:right-4 right-6 z-99 text-xl cursor-pointer transform hover:bg-red-500 '>
            <i class="ri-close-large-line"></i>
        </div>

      <div className='w-full h-72 z-50 relative'>
        <div className='sm:text-xl text-[1rem] text-white absolute top-30 sm:pl-10 pl-4 z-50 '>
        <h1 className='sm:text-2xl text-xl sm:tracking-wider  font-bold uppercase'>{department.name} Department</h1>
        <span>No. {rank+1} Rank Department/</span>
        

        <span> 250+ Students/</span>
        <span> {yearsOfDevelopment} years of Development</span>
    </div>
     
      <img className=' w-full h-full blur-[3px] border-1 border-b-gray-400 ' src='https://i.ytimg.com/vi/WXR-gwZhAQg/maxresdefault.jpg' alt="Computer" />
      </div>
    
     
      <section className='sm:px-10 px-5 py-5' >
        <div className='flex justify-between'>
            <h1 className=" text-3xl font-bold text-blue-950 drop-shadow-lg underline p-3">About {department.name}:</h1>
           <Link to ={`/RateDepartment/${department._id}`}>
           <button className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600
            text-white font-bold sm:py-6 py-2 px-3 sm:px-5 rounded-full shadow-lg transition duration-300 z-99 btn">
          ⭐ Give Review
           </button>
           </Link> 

       </div>
        
        <div className='p-4 '><ReadMore>{department.about}</ReadMore></div>
        
      
       <h2 className="text-3xl  p-3 mt-6 text-blue-950 ">Offered Courses :</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-3">
        {department.course.map((data, index) => (
          <div key={index} className="bg-indigo-500 p-4 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 ">
            <div className="text-xl font-semibold  text-white text-center ">{data}</div>
          </div>
        ))}
        </div>

  

       <h2 className='text-3xl  p-3 mt-8  text-blue-950'>Contact Details :</h2>
       <div className='grid grid-col-2 sm:grid-cols-4 gap-4 '>
          <div className='bg-white p-4 rounded-lg  shadow-md hover:shadow-xl transition-transform transform hover:scale-105 flex items-center justify-between '>
            <p className='text-lg font-medium'><i class="ri-mail-line"></i> {department.deptEmail}</p>
          </div>
          <div className='bg-white p-4 rounded-lg  shadow-md hover:shadow-xl transition-transform transform hover:scale-105 flex items-center justify-between '>
            <p className='text-lg font-medium'><i class="ri-phone-line"></i>  {department.deptPhone}</p>
          </div>
       </div>

       <h2 className="text-3xl  p-3 mt-8  text-blue-950">Deparment Ratings</h2>


      
       {department.ratings.length>0 ?  <div className='sm:w-1/2 w-full h-[400px] bg-white rounded-2xl shadow-xl text-sm'>
        <ResponsiveContainer width="100%" height="90%">

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Bar dataKey="rating" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColorBasedOnRating(entry.rating)}
                  />
                ))}

          </Bar> 


        </BarChart>

       </ResponsiveContainer> </div> : <p className='p-3 text-xl opacity-80 text-gray-500'>No Review.</p>}

       

        <h2 className='text-3xl  p-3 mt-8  text-blue-950 mb-5'>Faculty Members of {department.name}:</h2>
        <div className=" sm:p-10 px-2 mb-7 border-b-2 ml-1 ">
        <Slider {...settings}>
                {department.teacher.map((faculty, index) => (

                    <div key={index} id='teacher' className=" sm:w-full  bg-white shadow-lg rounded-xl border border-b-1 border-gray-400 ">
                         <div className='w-full h-60 bg-blue-700 backdrop-blur  rounded-t-2xl flex justify-center items-center'>

                        <img className='w-full h-full z-40 rounded-t-xl ' src = {faculty.picture} alt='Helldaf' />
                        {/* <img className='w-full h-full z-40 rounded-t-xl' src="https://i.pinimg.com/236x/0f/68/94/0f6894e539589a50809e45833c8bb6c4.jpg" alt="" /> */}
                 </div>
                  <div className='p-6'>
                  <h3 className="text-xl font-semibold text-gray-800">{faculty.name}</h3>
                        <p className="text-gray-600">{faculty.position}</p>
                        <p className="mt-2 text-gray-700"><strong>Ratings :</strong> <RatingBadge rating={faculty.avgRating} /></p>
                        <p className="mt-2 text-gray-700"><strong>Email :</strong> <a href={`mailto:${faculty.email}`} className="text-blue-500 ">{faculty.email}</a></p>
                        <p className="mt-2 text-gray-700"><strong>Contact :</strong> {faculty.phone}</p>
                        <div className="mt-4 flex justify-between items-center">
                       <Link to={`/teacher/${faculty._id}`}>
                       <button className="btn px-2 py-3TEt bg-black text-white font-medium rounded-lg shadow-md hover:bg-gray-900 transition">
                         Read Feedback
                       </button>
                       </Link> 

                       <Link to={`/RateTeacher/${faculty._id}`}>
                       <button className="btn px-2 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition">
                        Give Feedback
                     </button>
                       </Link>
                     
                  </div>

                  </div>
                       
                    </div>
                ))}
            </Slider>
            </div>

            <div className="max-w-3xl mx-auto mt-6 p-4 bg-white  border-gray-500 shadow-lg rounded-4xl">
                  <div className="flex justify-between items-center cursor-pointer border-b pb-3" onClick={() => setIsExpanded(!isExpanded)}>
                  <h2 className="text-xl font-semibold">Student Feedback</h2>
                  <span className="text-lg">{isExpanded ? <i class="ri-arrow-up-wide-fill"></i> : <i class="ri-arrow-down-wide-line"></i>}</span>
                </div>

                { isExpanded && (
                   <div className='space-y-4  mt-4 overflow-y-auto'>
                                {loading ? (
                        <p>Loading reviews...</p>
                      ) : department.ratings.length === 0 ? (
                        <p>No reviews yet. Be the first to review!</p>
                      ) : (
                        department.ratings.map((review) => <ReviewCard key={review._id} review={review} />)
                      )}
                  </div>
                )

                }

                
            </div>
      </section>
     
      
    </div>
    <Foter/>
    </>
   
  );
};

export default DepartmentDetail;
