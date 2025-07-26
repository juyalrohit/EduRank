import { useEffect, useState } from 'react'
import Search from './component/Search'
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Header from './component/Header';

import Home from './pages/Home';
import About from './pages/About';

import Contact from './pages/Contact';
import DepartmentDetail from './pages/DepartmentDetail';
import Login from './pages/Login';



import Rating from './pages/Rating';
import Course from './pages/Course';
import SendEmail from './pages/SendEmail';
import axios  from 'axios';

import RateDepartment from './pages/RateDepartment';

import RateTeacher from './pages/RateTeacher';

import TeacherDetail from './pages/TeacherDetail';

import ResetPassword from './pages/ResetPassword';



function App() {  

return (
  <div className='w-screen min-h-screen '>
    <AuthProvider> {/* ✅ Pure App ko Wrap Kar Raha Hai */}
      <Router>
         <Header />
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/sendemail" element={<SendEmail />} />
          <Route path="/department/:id" element={<DepartmentDetail />} />
          <Route path='/teacher/:Id' element={<TeacherDetail/>} />
          <Route path="/login" element={<Login />} />
          <Route path='/RateDepartment/:Id' element={<RateDepartment/>}/>
          <Route path='/RateTeacher/:Id' element={<RateTeacher/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>

        </Routes>
      </Router>
    </AuthProvider>
  </div>
  
   
)
}

export default App;
