import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import RatingBadge from '../feature/RatingBadge';

const Cards = () => {
    var settings = {
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

      const [departments, setDepartments] = useState("");
      const [loading, setLoading] = useState(true);
      
      useEffect(() => {
        const fetchAllDepartments = async () => {
          try {
            const response = await axios.get('http://localhost:3000/department/get-departments');
            setDepartments(response.data);
            setLoading(false);  // ✅ Set loading to false after fetching data
          } catch (error) {
            console.log("Error fetching departments:", error);
            setLoading(false);  // ✅ Prevent infinite loading
          }
        };
      
        fetchAllDepartments();
      }, []);
      
      if (loading) return <p>Loading...</p>;  // ✅ Show loading message while fetching
      if (!departments) return <p>No departments found</p>;  // ✅ Handle empty response
      
      console.log(departments);
      

 const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    
    return (
        <span className="text ">
            {isReadMore ? text.slice(0, 25) : text}
            <span
                onClick={toggleReadMore}
                className="cursor-pointer text-gray-500"
                
            >
                {isReadMore ? (
  <>
    ...Read more
  </>
) : (
  <>
    ...Show less
  </>
)}

            </span>
        </span>
    );
};


const getAvgRating = (reviews)=>{
  const avgRating = reviews.reduce((sum, r) => sum + Number(r.overallRating), 0) / reviews.length;
  const roundedRating = Math.round(avgRating*10)/10;
  return roundedRating;
}

if(departments){
  console.log(departments[0].avgRating);
}
 



    return (

   
        <div className='w-screen   '>
           <h1 className='text-blue-950 text-2xl sm:flex-none  sm:mx-[38%]   sm:text-3xl font-bold  my-8  mx-12'>Explore Departments</h1>

            
              
           <div  className='w-full px-10 sm:px-20   '
            > 
              <h1 className='font-semibold sm:text-2xl text-xl text-gray-800 mb-6 pl-4 sm:pl-3'>Science & Arts : </h1>
             
              <Slider {...settings}>

              {departments.map((card, index) => (
                  <div className="relative bg-gradient-to-br from-gray-100 to-gray-300 sm:w-[320px] sm:h-[430px] rounded-2xl sm:mx-2 mx-4 overflow" key={index}>
                    <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                      Rank #{index + 1}
                    </div>
                  <img className="w-full h-[200px] object-cover rounded-t-2xl" src={card.deptPicture} alt={card.name} />
                  <div className="p-4 flex flex-col justify-between gap-2 ">
                    
                  <h3 className="text-xl font-bold text-gray-800">{card.name}</h3>
                  <p className="text-sm text-gray-600">Head :  {card.head}</p>
                  <p className="text-sm text-gray-600 mt-2">Courses  : { card.course.length==3 ?( <>{card.course.join(',')}</>) : <ReadMore>{card.course.join(",")}</ReadMore>}</p>
                 
        
                  <p className="text-sm text-gray-500 font-medium mt-2 sm:mb-0 mb-12">Ratings : <RatingBadge rating={Number.isNaN(getAvgRating(card.ratings))? 0 : getAvgRating(card.ratings)}/></p>
                    
                  <Link
                    to={`/department/${card._id}`}
                    className="absolute bottom-3 w-[90%] text-center bg-blue-500 text-white sm:px-4 px-2 sm:py-2 py-1 rounded-md hover:bg-blue-600 transition "
                  >
                    Learn More
                  </Link>
            </div>
          </div>
        ))}
                </Slider>
            </div>
            
        </div>

      
    );
};

export default Cards;