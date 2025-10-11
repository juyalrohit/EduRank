import React, { useState } from 'react';
import Foter from '../component/Foter';
import Gate from '../assets/photojpg.jpg'
import Member1 from '../assets/profile.jpg'
import  useScreenValue  from '../feature/useScreenValue';
import College from '../assets/maxresdefault.jpg'
import Code from '../assets/code.svg'


const About = () => {
  const ReadMore = ({ children }) => {
    const screenSize = useScreenValue();
      const text = children;
      const [isReadMore, setIsReadMore] = useState(true);
      const toggleReadMore = () => {
          setIsReadMore(!isReadMore);
      };
      return (
          <p className="text">
              {isReadMore ? 
              (screenSize === 'small' ? text.slice(0, 0) : text.slice(0, 563))
               : text}
              <span
                  onClick={toggleReadMore}
                  className="cursor-pointer text-red-500"
                  
              >
                  {isReadMore ? (
    <>
      ...Read more <i className="ri-arrow-down-wide-fill"></i>
    </>
  ) : (
    <>
      Show less <i className="ri-arrow-up-wide-line"></i>
    </>
  )}
  
              </span>
          </p>
      );
  };
   return (
        <>
        <div className="w-full  bg-white-100 sm:mt-22">
     
              <div className='w-full sm:h-72 h-60 z-40 relative  border border-b-1 border-gray-400'>
                <div className='text-xl text-white absolute top-30 pl-10 z-40  '>
                  <h1 className='text-2xl tracking-wider font-bold uppercase'>About Section</h1>
                  <span>Kumaun University/</span>
                  <span>About Me  </span>
                  <span></span>
              </div>                               
              <img className=' w-full h-full blur-[3px]  ' src={College} alt="Computer" />
          </div> 

            <div className='w-full sm:px-12 px-6'>
              
            <div className='flex sm:flex-row flex-col mt-15 gap-10'>
                <img className='sm:w-[710px] w-[800px] sm:h-[360px] h-[260px] shadow-2xl pt-1' src={Gate} alt="" />
                
                    <div>
                    <h1 className='sm:text-4xl text-2xl  font-bold text-blue-950 drop-shadow-lg underline mb-4'>About Kumaun University :</h1>
                    <p className='tracking-wider leading-8.5' >Kumaun University, a residential-cum-affliating university, came into existence in the year 1973 by notification No. (10)/8651/15/75(85)/64 dated 23 November, 1973 under the Act No. 10 of State Legislature (U.P. State Universities Act, 1973 now adopted by Uttarakhand State) with the merger of two Government Colleges, D.S.B. Government P.G.College, Nainital and Almora Government P.G. College, Almora. These Constituent Colleges were later elevated to the status of University Campuses by Government order No. E-1861/GS dated 14/15 March, 1994.
                    The University Grants Commission, New Delhi granted recognition to the University under section 12-B of the UGC Act, 1956 and its name appears at serial No. 177.<br></br> Since then the Kumaun University is receiving central assistance from the UGC.</p>
                    </div>
                    

                 </div>
                <p className='tracking-widest leading-8.5 mt-1.5'>
                  <ReadMore>
                  The academic wing of the University is spread over in three campuses (D.S.B. Campus, Nainital, SSJ Campus, Almora and newly constructed Campus at Bhimtal) with an area of 5,31,373 sq.mt. (160 acres), the total built up area being 3,00,000 sq. m .
                   The academic wing of the University is spread over in three campuses (D.S.B. Campus, Nainital, SSJ Campus, Almora and newly constructed Campus at Bhimtal) with an area of 5,31,373 sq.mt. (160 acres), the total built up area being 3,00,000 sq. mt. 47 Government colleges under the administrative control of the State Government, 50 Private institute and 01 Government Aided College, spread over in six districts of Kumaun region are affiliated with the University. It is the biggest State University of the state (Uttarakhand) which caters the need of about 1,50,000 students by providing a high quality educational experience in diverse learning environments and promoting the values and institutions of democracy that prepare students to lead lives of personal integrity and civic responsibility and service to in a global society.
                   The University is famous for building and promoting a system, which is accessible to people of diversied faiths, races, creeds and cultures and is striving hard for excellence in the creation and dissemination of knowledge, promoting the holistic development of students and preparing them to lead lives of personal integrity, civic responsibility and service to the society. Efforts to galvanize the academic fervor and creative instincts of the youth coming from socially and economically backward areas, to strengthen the interface of academia with the government and industry and prepare the always undertaken. The University is committed to raise the academic standard of all its. three campuses, viz., DSB Campus, Nainital, SSJ Campus, Almora and Sir JC Bose Technical Campus, Bhimtal and 100 affiliated colleges and institutes. For the last three years the University has made untiring efforts to develop some well recognized departments of scientic and social research and these have been attracting faculty members and students from different parts of the country.
                   Kumaun University became an ideal for all the state universities before the creation of new state of Uttarakhand for regularizing academic session, making education more participatory, creating serious academic atmosphere, generating resources without taxing the students, maintaining strict discipline among students and imposing code of conduct for teachers and this approach is still continuing. Keeping in view its overall achievements the University was accredited with 'A' Grade status in the year 2015 by the National Assessment and Accreditation Council (NAAC). The University has a regular membership of Association of Indian Universities.
                   In order to cater the technical professional and vocational education, another campus of the University has been developed at Bhimtal. The University is imparting quality education and research facilities in all the eight faculties:
                   </ReadMore>
                </p>
    
        
    <section class=" py-10 mt-14">
    <div class="max-w-5xl mx-auto text-center">
      <div className='flex justify-center gap-4'>
          <img src={Code} className='size-10 animate-bounce' alt="" />

         <h2 class="sm:text-4xl text-2xl  mb-16 font-serif font-semibold">Made By</h2>
          <img src={Code} className='size-10 animate-bounce' alt="" />

      </div>
     
    <div class="sm:flex justify-around gap-8 items-center">
      
     
      <div class="bg-white  rounded-2xl shadow-lg ">
       
       <div className="relative w-full h-40 rounded-2xl overflow-hidden">

         {/* Blurred background image */}
        <div className="absolute inset-0 bg-[url('/profile.jpg')] bg-cover bg-center filter blur-md">
        </div>

        {/* Content on top */}
        <div className="relative z-10  text-white ">
          <img className='rounded-full w-34 h-34 mx-auto mt-2' src="/profile.jpg" alt="" />
        </div>

</div>
        
        <h3 class="text-xl font-semibold mt-4">Rohit Juyal</h3>
        <p class="text-gray-600">Frontend / Backend</p>
        <p class="mt-2 text-sm text-gray-500 p-6">Passionate about building responsive and user-friendly websites.</p>
        <a href="https://www.linkedin.com/in/rohit-juyal-917aa0270/" className="text-blue-500 mt-3 mb-6 inline-block hover:underline">
          <img className='size-10' src="linkedin.png" alt="" />
        </a>
      </div>

    
      
    </div>
  </div>
</section>
            </div> 
           
           

        
            
        </div>
        <Foter/>
        </>
    );
};

export default About;
