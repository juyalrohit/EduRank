import React from 'react'
import Hero from '../component/Hero'
import Cards from '../component/Cards'
import Foter from '../component/Foter'
import Header from '../component/Header'

const Home = () => {
  return (
  
     <div className=' w-[100vw] h-screen bg-gradient-to-br from-blue-200 to bg-purple-400 '>
      
      
      <Hero/>
    
      
      <Cards/>
      <div className='mt-40'>
       <Foter/>
      </div>
      
     
    </div>
    
 
   
  )
}

export default Home