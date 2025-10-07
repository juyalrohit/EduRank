import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import ReplieCard from "./ReplieCard";
import ConfirmationDialog from './ConfirmationDialog'


const ReviewCard = ({ review }) => {
   const {isAuthenticated,userData} = useAuth();
  const [isClick, setisClick] = useState(false);
  
  const [comment, setcomment] = useState(review.comment);
  console.log(review.upVote)

  const [likes, setLikes] = useState(review.upVote.length || 0);
  const [dislikes, setDislikes] = useState(review.downVote.length || 0);

  const [isLiked, setIsLiked] = useState(review.upVote.includes(userData._id));
  const [isDisliked, setIsDisliked] = useState(review.downVote.includes(userData._id));
  
  const [isEdit, setisEdit] = useState(false);
 

  const [showReply ,setShowReply] = useState(false);
  const name = review.user.name.slice(0, 1).toLowerCase();

  const [writeReply, setwriteReply] = useState(false)
  const [reply,setReply] = useState("");

  const [reviewId,setReviewId] = useState(review._id)

  const [isDialogOpen, setisDialogOpen] = useState(false)



  
  

    let bgColor = 'bg-orange-400'; // Default

    if (name >= 'a' && name <= 'h') {
      bgColor = 'bg-yellow-400';
    } else if (name >= 'i' && name <= 'l') {
      bgColor = 'bg-pink-400';
    } else if (name >= 'm' && name <= 'q') {
      bgColor = 'bg-green-400';
    }
 

//get userData






const reportuserData = ()=>{
   if(isAuthenticated){
    toast.success(`Successfully reported ${review.user.name}.`);
    setisClick(!isClick)
   }
   else{
    toast.info('Kindly log in to proceed.')
    setisClick(!isClick)
   }
}

const deleteComment = async()=>{
 
  try{
    const res = await axios.delete(`http://localhost:3000/review/delete-review/${review._id}`,{withCredentials:true});
    toast.success("Deleted!");
    setTimeout(()=>{
      window.location.reload();
    },2000)


  }
  catch(error){
    console.log("Deleting comment get error!",error);
  }
  finally{
    setisClick(!isClick);
    setisDialogOpen(!isDialogOpen)
  }

 
}
const handleUpdate = async(e)=>{
   e.preventDefault();

  try{
     const res = await axios.put(`http://localhost:3000/review/update-comment/${review._id}`,{comment},{withCredentials:true});
     toast.success("Updated. Refresh to see update.");

  }
  catch(error){
    console.log("Updating comment get error!",error);
  }
  finally{
    setisClick(!isClick);
    setisEdit(!isEdit);
  }

}


const handleReply = async(e)=>{
  e.preventDefault()
  if(!isAuthenticated){
    toast.info("Kindly Login to proceed!")
    return;
  }
  try {

    const {data} = await axios.post('http://localhost:3000/reply/reply-comment',{reply,reviewId},{withCredentials:true});

    if(data.success){
      setwriteReply(!writeReply)
      window.location.reload();
    }
    else{
      toast.error(data.message)
    }
    
  } catch (error) {
    toast.error(error.message)
  }

}



  const handleLike = async () => {
    if(!isAuthenticated){
             toast.info("Kindly login to proceed!");
             return;
          }
    
    if(isDisliked){
      handleDislike();
    }

    axios.defaults.withCredentials=true;

    try {

      const {data} = await axios.put('http://localhost:3000/review/like',{reviewId,isLiked});

      if(data.success){
        setIsLiked(!isLiked);
        setLikes(data.likes);
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleDislike = async () => {
    if(!isAuthenticated){
             toast.info("Kindly login to proceed!");
             return;
          }
    
    if(isLiked){
       handleLike();
    }
    axios.defaults.withCredentials=true;
    
    try {

      const {data} = await axios.put('http://localhost:3000/review/dislike',{reviewId,isDisliked});

      if(data.success){
        setDislikes(data.dislikes)
        setIsDisliked(!isDisliked)
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
        toast.error(error.message)
    }
  };

  return (
    <div className="p-4 border-b border-gray-300 rounded-md shadow-sm relative scrollbar">
      {/* user name logo and time with stamp */}
      <div className="flex items-center space-x-1.5">

          <div className={`w-11 h-10 flex items-center justify-center ${bgColor} text-white text-2xl rounded-full`}>
            {review.user.name.slice(0, 1)}
          </div>

          <div className="w-full">
            <p className="font-semibold">{review.user.name}</p>
            <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
      </div>

      {/* Edit logged In user comment */}
      
     { isEdit && 
     <form className="mt-4 tracking-wider flex flex-col sm:w-1/2 w-full" onSubmit={handleUpdate}>
          <textarea required type="text" value={comment}  onChange={(e)=>setcomment(e.target.value)} className="outline-none" /> 
          <div className="flex gap-6 py-3">
          <button className="px-3 py-2 bg-orange-500 hover:bg-amber-700 text-white rounded-lg" type="submit" >Update</button>
          <button className="px-3 py-2 bg-red-500 hover:bg-red-600  text-white rounded-lg" onClick={()=>setisEdit(!isEdit)}>Cancel</button>

          </div>
     </form> 
    }


       {/*comment  */}
      

      {!isEdit && <p className="mt-2 tracking-wider">{review.comment}</p> }

     
      
      {/* Handle like and dislike  */}
      <div className="mt-3 flex items-center gap-5 scrollbar ">
        
        <button onClick={handleLike} className="cursor-pointer">
          <i className={`ri-thumb-up-line ${isLiked ? "text-green-500" : ""}`}></i> {likes}
        </button>

        <button onClick={handleDislike} className="cursor-pointer">
          <i className={`ri-thumb-down-line ${isDisliked ? "text-red-500" : ""}`}></i> {dislikes}
        </button>

        <button onClick={()=>setwriteReply(!writeReply)} className="text-xl"><i class="ri-reply-line"></i></button>
        
       <p 
         onClick={()=>{setisClick(!isClick); setisEdit(false)}}
         className="-mt-1 cursor-pointer">
        <i class="ri-more-2-fill"></i>
      </p>

       {/* show the option of more for logged user comment delete and edit and or othere report */}

        {isClick && <div className="px-4 py-3 bg-slate-900 text-indigo-400 rounded-sm">
          <ul className="space-y-2">
            {/* If logged email user and review user are smame then show edit option */}
            {userData.email === review.user.email ? (
              <>
                <li 
                  onClick={() => setisEdit(!isEdit)} 
                  className="flex items-center gap-2 text-sm  hover:text-orange-500 cursor-pointer">

                  <i className="ri-pencil-line"></i>
                   Edit
                </li>

                <li 
                  onClick={()=>setisDialogOpen(!isDialogOpen)} 
                  className="flex items-center gap-2 text-sm  hover:text-red-500 cursor-pointer"
                >
                  <i className="ri-delete-bin-3-line"></i> Delete
                </li>
                
              </>
            ) : (
              //if logged user not equal to review user then only show report(which not work behind the schene 🤡)
              <li 
                onClick={reportuserData} 
                className="flex items-center gap-2 text-sm  hover:text-red-500 cursor-pointer"
              >
                <i className="ri-alert-line"></i> Report
              </li>
            )}
          </ul>
</div>

    }
      </div>


      {/* Open replay box on user comment if write replay state is true */}

      {writeReply && (
        <form id="scrollbar" className=" w-full " onSubmit={handleReply}>

          <textarea className=" text-black resize-none scrollbar  w-full" name="" id="" value={reply} onChange={(e)=>setReply(e.target.value)}></textarea>
          <div>
          <div className="flex gap-6 py-3 justify-end-safe">
          <button  className="px-3 py-1.5 bg-red-500 hover:bg-red-600  text-white rounded-lg" onClick={()=>setwriteReply(!writeReply)}>Cancel</button>
          <button  className="px-3 py-2 bg-emerald-500 hover:bg-emerald-700 text-white rounded-lg" type="submit" >Reply</button>


       </div>
          </div>


        </form>
      )}

      {/* showing replies text */}

    { review.replies.length>0  &&  <p onClick={()=>setShowReply(!showReply)} className="text-md font-semibold text-gray-800 my-4 px-6 cursor-pointer">
        {review.replies.length} {review.replies.length === 1 ? 'Reply' : 'Replies'} {showReply ?  <i class="ri-arrow-up-wide-line"></i>:<i class="ri-arrow-down-wide-line"></i>  }
      </p>
    }

    {/* Showing replies passing reply Id as props to othere component Replies Card */}

      {showReply && (
       <div className="w-full px-6 py-6 space-y-6.5">
       { review.replies.map((replyID,index)=>{
           return <ReplieCard id={replyID}/>
        })
      }
       </div>)

     }

     
      <div className="border border-gray-500"></div>



{/* Just in case user accidenly click the delete button */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setisDialogOpen(false)}
        onConfirm={deleteComment}
        message="Are you sure? Your review for the department will also be deleted."
      />

      
    </div>
  );
};

export default ReviewCard;
