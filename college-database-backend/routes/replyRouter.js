const express = require('express');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const reviewModel = require('../models/review-model');
const replyModel = require('../models/reply-model')

const router = express.Router();

router.post('/reply-comment',isLoggedIn, async(req,res)=>{
   const {reply,reviewId} = req.body;
   const user = req.user;
   if(!reply){
     res.status(501).json({success:false,message:"Mising Details"})

   }
   try {
        const newReply = await replyModel.create({user:user._id,reply});

        if(!newReply){
            return res.json({success:false,message:"something went wrong"});
        }
       


        const review = await reviewModel.findById(reviewId);
        review.replies.push(
         newReply._id
        )

       await review.save();

       res.status(200).json({success:true,message:"Your reply sumitted"})

    
   } catch (error) {
      res.status(501).json({success:false,message:error.message});
   }
   
}
)

router.put('/update-like',isLoggedIn, async(req,res)=>{
   const {replyId,isLiked} = req.body;
   const userId = req.user._id;
   
  
   
   if(!replyId || !userId){
      return res.json({success:false, message:"missing details"});
   }

   try {
      const update = isLiked ? {$pull:{like:userId}} : {$addToSet:{like:userId}};

      const reply = await replyModel.findByIdAndUpdate(replyId, update,{new:true});

    

      res.json({success:true, likes:reply.like.length});
    
   } catch (error) {

      console.log(error)

    return res.status(501).json({success:false, message:error.message});
    
   }
})


router.put('/update-dislike', isLoggedIn, async(req,res)=>{
  const {replyId,isDisliked} = req.body;
  const userId = req.user._id;

  if(!replyId){
     return res.json({success:false, message:"missing details"});
  }

  try {

    const update = isDisliked ? {$pull:{unlike:userId}} : {$addToSet:{unlike:userId}};

    const reply = await replyModel.findByIdAndUpdate(replyId,update,{new:true});

    res.json({success:true, dislikes:reply.unlike.length});
  
 } catch (error) {

  return res.status(501).json({success:false, message:error.message});
  
 }

})

router.post('/get-reply',async(req,res)=>{
  const {id} = req.body;

  try {
   const reply = await replyModel.findById(id).populate({ path: 'user' });

      if (!reply) {
      return res.status(404).json({success:false, message: 'Reply not found' });
      }

      res.json({success:true,reply:reply});
    
    
  } catch (error) {
    res.json({success:true,message:error.message})
  }
})




module.exports = router;
