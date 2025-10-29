import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';


const ReplieCard = ({id}) => {

    const [reply,setReply] = useState(null);
    const [loading, setloading] = useState(true)
    const {backendURL} = useAuth();

   

    useEffect(()=>{
     const getReply = async()=>{

      try {
        const {data} = await axios.post(backendURL + '/reply/get-reply',{id});

        if(data.success){
          setReply(data.reply);
        }
        else{
          toast.error(data.message)
        }
        
      } catch (error) {
        toast.error(error.message);
      }
      finally{
        setloading(false)
      }
     }
     getReply()
    },[])

   

    const {isAuthenticated,userData} = useAuth();
    
    
    const [likes, setlikes] = useState(0);

    const [dislikes,setdislikes] =  useState(0);


    const [isLiked , setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false)

    const [replyId,setReplyId] = useState(id);


    useEffect(() => {
    if (reply) {
      setlikes(reply.like?.length || 0);
      setdislikes(reply.unlike?.length || 0);

      setIsLiked(reply.like.includes(userData._id));
      setIsDisliked(reply.unlike.includes(userData._id));
    }
  }, [reply]);


 


     function getBG(name) {
      let bgColor = 'bg-orange-400'; 

      name = name.toLowerCase()

     
   
    if (name >= 'a' && name <= 'h') {
      bgColor = 'bg-yellow-400';
    } else if (name >= 'i' && name <= 'l') {
      bgColor = 'bg-pink-400';
    } else if (name >= 'm' && name <= 'q') {
      bgColor = 'bg-green-400';
    }

    return bgColor;
    }

    

    const handleLike = async()=>{

        
      if(!isAuthenticated){
         toast.info("Kindly login to proceed!");
         return;
      }

      if(isDisliked){
        handleDislike();
      }
          
        axios.defaults.withCredentials=true;
        try {
          const {data} = await axios.put(backendURL + "/reply/update-like", {replyId,isLiked});

          if(data.success){
             setIsLiked(!isLiked);

             setlikes(data.likes);
          }
          else{
             toast.error(data.message);
          }
          
        } catch (error) {

          toast.error(error.message);
          
        }
    }

    const handleDislike = async()=>{
      if(!isAuthenticated){
         toast.info("Kindly login to proceed!")
         return;
      }

      if(isLiked){
        handleLike();
      }

      axios.defaults.withCredentials = true;

      try {
        const {data} = await axios.put(backendURL + "/reply/update-dislike", {replyId, isDisliked})

        if(data.success){
          setIsDisliked(!isDisliked);
        
          setdislikes(data.dislikes);
        }
        else{
          toast.error(data.message);
        }
        

      } catch (error) {
        toast.error(error.message);
        console.log(error)
      }

    }

    if(loading){
      return (<p>Loading...</p>)
    }
    if(!reply){
      return (<p>No replies is there</p>)
    }


  return (

                <div className=''>
                      
                      <div className='flex itmes-center space-x-0.5'>

                        <div className={`w-10 h-10 rounded-full ${getBG(reply.user.name.slice(0,1))} text-white text-center text-2xl flex items-center justify-center`}> 

                            {reply.user.name.slice(0,1)}

                        </div>

                        <div className='px-2'>

                            <p className='text-black '>{reply.user.name}</p>
                            <p className='text-gray-600 text-sm'>{new Date(reply.createdAt).toLocaleDateString()}</p>

                        </div>

                      </div>
                      <div className='sm:px-12'>

                      <p className='tracking-wider mt-2'>{reply.reply}</p>
                      
                     

                      <div className='flex items-center mt-2 gap-4'>
                      <button onClick={handleLike} className="cursor-pointer">
                        <i className={`ri-thumb-up-line ${isLiked ? "text-green-500" : ""}`}></i> {likes}
                        </button>

                        <button onClick={handleDislike} className="cursor-pointer">
                        <i className={`ri-thumb-down-line ${isDisliked ? "text-red-500" : ""}`}></i> {dislikes}
                        </button>

                      </div>

                      </div>

                     



                </div>
  )
}

export default ReplieCard