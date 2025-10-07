import React, { useRef, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
import { data, useNavigate } from 'react-router-dom';
import { Loader2  } from 'lucide-react';

const ResetPassword = () => {
    const inputRef = useRef([]);
    const [email, setemail] = useState('')
    const [otp,setotp] = useState('')
    const [newPassword, setnewPassword] = useState("")
    const [Loading,setLoading]  = useState(false);

    const navigate = useNavigate();

    const [isEmailSubmitted,setIsEmailSubmitted] = useState(false);
    const [isOTPSubmitted,setIsOTPSubmitted] = useState(false)



    const handleSendOTP = async(e)=>{
        e.preventDefault();
        setLoading(true);
       

        try {
            const {data} = await axios.post('http://localhost:3000/user/send-password-otp',{email});
            if(data.success){
                toast.success(data.message)
                setIsEmailSubmitted(true);
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)  
        }
        finally{
            setLoading(false)
        }
    }

    const handleSubmitOTP =(e)=>{
        e.preventDefault();
        const otpArray = inputRef.current.map((e)=>e.value)
        const otpStr = otpArray.join('');
        if(otpStr===""){
            toast.error("Please enter the OTP to proceed.")
            return;
        }
        if(otpStr.length<6){
            toast.error("Please enter the full 6-digit code.")
            return;
        }
        setotp(otpStr);
        setIsOTPSubmitted(true)
    }
    
    const handleNewPassword = async(e)=>{
        e.preventDefault();
        try {
            const {data} =  await axios.post('http://localhost:3000/user/reset-password',{email,otp,newPassword})
            if(data.success){
                toast.success(data.message)
                navigate('/login')
            }
            else{
                toast.error(data.message);
                 setIsEmailSubmitted(false);
                 setIsOTPSubmitted(false);
            }
        } catch (error) {
            toast.error(error.message);
            setIsEmailSubmitted(false);
            setIsOTPSubmitted(false);
        }
    }

    const handleInput = (e, index) => {
        if (e.target.value.length > 0  && index < inputRef.current.length - 1) {
          inputRef.current[index + 1].focus();
        }
      }

    const handleKeyDown = (e,index)=>{
        if(e.target.value=='' && e.key==='Backspace'){
            inputRef.current[index-1].focus();
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();
      
        const val = e.clipboardData.getData('text').trim();
        const valArray = val.split('');
      
        valArray.forEach((num, idx) => {
          if (inputRef.current[idx]) {
            inputRef.current[idx].value = num; // not `val`, but `num`
          }
        });
      };
      
      
  return (
    <div className='w-full min-h-screen flex justify-center items-center px-6 sm:px-0 '>
        
        {/* Stage 1 : Fill you register email section  */}
        {!isEmailSubmitted && !isOTPSubmitted && 
        <form
             onSubmit={handleSendOTP}
             className=' w-94 rounded-lg shadow-lg text-sm p-8'>

            <h1 className='text-black mb-4 text-center text-2xl font-semibold'>Reset Password</h1>
            <p className='text-center   mb-6'>Enter your register Email adresss.</p>


            <div className='w-full flex itmes-center gap-3 rounded-full  px-5 mb-8 shadow'>
                <img src={assets.mail_icon} alt="" />
                <input 
                    onChange={(e)=>setemail(e.target.value)}
                    value={email} className='border-none focus:ring-0'
                    type="text" 
                    placeholder='Enter Email'
                  />
            </div>

          

            <button
             type='submit'
             className='btn w-full py-2.5 bg-gradient-to-r from-red-400 to-red-700
             rounded-full text-white font-bold cursor-pointer' disabled={Loading}>
                {
                   Loading ? <Loader2 className='size-5 animate-spin'/>
                 
                   : <> Send Otp</>
                }
            </button>
        </form>
        }

        {/* Stage-2: Enter OTP sent to your register email */}

        {isEmailSubmitted && !isOTPSubmitted &&
         <form onSubmit={handleSubmitOTP} 
               className='w-94 rounded-lg shadow-lg text-sm p-8'>

            <h1 className=' mb-4 text-center text-2xl font-semibold'>Reset Password OTP</h1>
            <p className='text-center  mb-6'>Enter 6 digit otp sent to your register email.</p>

            <div onPaste={handlePaste} className='flex justify-between mb-6'>
            {
                Array(6).fill(0).map((_,index)=>(
                    <input
                     maxLength='1'
                     className='bg-gray-700 w-12 h-12 rounded-md border-none
                     text-center text-white' 
                     type="text"
                     ref={(e)=>inputRef.current[index]=e}
                     id={index}
                     onInput={(e)=>handleInput(e,index)}
                     onKeyDown={(e)=>handleKeyDown(e,index)}
                      />
                ))
            }
            </div>   
            <button className='btn w-full py-2.5 bg-gradient-to-r from-red-400 to-red-700 rounded-full text-white font-bold cursor-pointer'>Submit</button>
        </form>}

        {isEmailSubmitted && isOTPSubmitted &&  <form onSubmit={handleNewPassword} className=' w-94 rounded-lg shadow-lg text-sm p-8'>
            <h1 className='mb-4 text-center text-2xl font-semibold'>New Password</h1>
            <p className='text-center  mb-6'>Enter your new password below.</p>

            <div className=' w-full flex itmes-center gap-3 rounded-full shadow-sm  px-5 mb-6'>
                <img src={assets.lock_icon} alt="" />
                <input onChange={(e)=>setnewPassword(e.target.value)} value={newPassword} className='bg-transparent border-none  focus:ring-0' type="password" placeholder='New Password'/>
            </div>

            <button 
                type='submit'
                className='btn w-full py-2.5 bg-gradient-to-r from-red-400 to-red-700 rounded-full
                text-white font-bold cursor-pointer'>
                    {
                        Loading ? <Loader2 className='size-5 animate-spin' /> : "Submit"
                    }
            </button>
        </form>}
        
    </div>
  )
}

export default ResetPassword