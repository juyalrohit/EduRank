import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Foter from '../component/Foter';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {assets} from '../assets/assets'
import { Loader2 } from 'lucide-react';
import {motion} from 'framer-motion'


const Login = () => {

  const {setIsAuthenticated,backendURL} = useAuth();
  const [state, setstate] = useState("Sign Up")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [loading,setLoding] = useState(false);

  const handleSubmit = async (e) => {
  
    axios.defaults.withCredentials=true;
    e.preventDefault();
    setLoding(true)

    if(state==='Sign Up'){
      try {
        const {data} = await axios.post(
          backendURL + "/user/register-user",
          { name, email, password }  
        );

        if(data.success){
          navigate('/');
          setIsAuthenticated(true);
          toast.success(data.message);
         
        }
        else{
          toast.error(data.message);
        }
        
      } catch (error) {
        console.log(error)
         toast.error(error.message);
      }
      finally{
       setLoding(false);
    }
    }

    else{
    try {
      const {data} = await axios.post(backendURL + '/user/login-user', 
        { email, password }
      );

      if(data.success){
        toast.success(data.message);
        navigate('/'); 
        setIsAuthenticated(true);

        //To save state of user
        setTimeout(()=>{
         window.location.reload();
        },4000)
       
      }
      else{
        toast.error(data.message)
      }  
    } catch (error) {
      toast.error(error.message)
    }
    finally{
       setLoding(false);
    }
  }
  };

  return (
    <>
    <motion.div
     initial={{y:-30,opacity:0}}
     animate={{y:0,opacity:1}}
     transition={{duration:0.75,ease:'easeInOut'}}
    
    className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0
      gap-10 ">
      <div  className='w-full rounded-lg shadow-lg sm:w-96  text-sm p-8 mt-8'>
       
        <h1 className='text-3xl text-center font-semibold mb-3'>{state==='Sign Up'  ? 'Create Account' : 'Log In'}</h1>

        <p className='text-sm text-center mb-8 text-gray-500'>{state==='Sign Up'  ? 'Create your student account to explore departments, teachers, and more!' : 'Log In to your account!'}</p>



        <form action="" className='space-y-4 mb-4' onSubmit={handleSubmit} >

          {/* Only when state is equal to sign up then we show the full name detail */}

            {state==='Sign Up' &&
               <div className='flex items-center gap-3 rounded-full shadow-sm   px-5 py-0.5 '>

              <img src={assets.person_icon} alt="" />
              <input id='hey' onChange={(e)=>setName(e.target.value)} value={name}  className='bg-transparent  border-none outline-none focus:ring-0 focus:outline-none overflow-x-auto' type="text" 

              placeholder='Full Name'  required/>
            </div>}


        
            <div className='flex items-center gap-3 rounded-full shadow-sm py-0.5 px-5  '>

              <img className='' src={assets.mail_icon} alt="" />

              <input onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  className='bg-transparent  border-none outline-none focus:ring-0 focus:outline-none overflow-x-auto' 
                  type="email"
                  placeholder='Email ID'
                  required
                 />
                
            </div>



            <div className='flex items-center gap-3 rounded-full shadow-sm py-0.5 px-5  '>
              <img src={assets.lock_icon} alt="" />
              <input 
                  onChange={(e)=>setPassword(e.target.value)} 
                  value={password} 
                  className='bg-transparent  border-none outline-none focus:ring-0 focus:outline-none overflow-x-auto' 
                  type="password"
                  placeholder='Password'
                  required
              />
            </div>


           {state==='Log In' && <p  onClick={()=>navigate('/resetpassword')} className='text-indigo-500 cursor-pointer'>Forget Password?</p>}

            <button

              className='btn btn-primary  mt-2 w-full p-2.5 py-3 rounded-full bg-gradient-to-r
             from-red-400 to-red-700 text-white font-semibold text-22 cursor-pointer'
             disabled={loading}>
 
              {loading ? 
              <Loader2 className='size-5 animate-spin'/> 
              :
              state
              }
              

              

            </button>

            {state==='Sign Up' ? <p className='text-gray-400 text-sm text-center mt-2'>
              Already have an account?{" "} <span onClick={()=>setstate("Log In")} className='text-blue-600 underline cursor-pointer'>Log In</span>
            </p>
              :
            <p className='text-gray-400 text-sm text-center mt-2 '>
              Don't have an account?{" "} <span onClick={()=>setstate("Sign Up")} className='text-blue-600 underline cursor-pointer'>Sign Up</span>
            </p>}
        </form>

        
      </div>

    
    </motion.div>
    <Foter />
    </>
    
  );
};

export default Login;
