const reviewModel = require('../models/review-model');
const departmentModel = require('../models/department-model');
const teacherModel = require('../models/teacher-model');
const { json } = require('express');

module.exports.createReview = async (req, res) => {
   try {
     const { knowledge, teachingStyle, assessmentFairness, studentSupport, comment, type, targetId } = req.body;
 
     // Check if user is logged in
     if (!req.user) {
       return res.status(401).send("User not authenticated");
     }
     const userId = req.user._id;
 
     // Validate type
     if (!["department", "teacher"].includes(type)) {
       return res.status(400).send("Invalid Type");
     }
 
     // Validate target ID
     if (!targetId || targetId.length !== 24) {
       return res.status(400).send("Invalid target ID");
     }
 
     // Calculate overall rating
     const overallRating =
     (Number(knowledge) +
       Number(teachingStyle) +
       Number(assessmentFairness) +
       Number(studentSupport)) / 4;    
 
     // Create review
     const review = await reviewModel.create({
       knowledge,
       teachingStyle,
       assessmentFairness,
       studentSupport,
       overallRating,
       user: userId,
       comment,
       type,
       targetId
     });
 
     // Update Teacher or Department
     if (type === "teacher") {
       const teacher = await teacherModel.findById(targetId);

       if (teacher) {
         teacher.ratings.push(review._id);
         await teacher.save();
       }
       const reviews = await reviewModel.find({ targetId });
       
       const avgRating = reviews.reduce((sum, r) => sum + Number(r.overallRating), 0) / reviews.length;
       const roundedRating = Math.round(avgRating * 10) / 10; 
       await teacherModel.findByIdAndUpdate(targetId, { avgRating:roundedRating});

     } else if (type === "department") {
       const department = await departmentModel.findById(targetId);



       if (department) {
         department.ratings.push(review._id);
         await department.save();
       }
       const reviews = await reviewModel.find({ targetId });
       
       const avgRating = reviews.reduce((sum, r) => sum + Number(r.overallRating), 0) / reviews.length;
       const roundedRating = Math.round(avgRating * 10) / 10; 
       await departmentModel.findByIdAndUpdate(targetId, { avgRating:roundedRating });
     }
 
     res.status(201).json({ message: "Review added successfully", review });
 
   } catch (error) {
     console.log("Error creating reviews", error);
     res.status(500).send("Something went wrong!");;
   }
 };
 


module.exports.getReview = async (req,res)=>{
   try{
      const reviews = await reviewModel.find().populate('user','name');
      res.status(200).json(reviews);
   }
   catch(error){
      console.log("Error",error);
      res.status(500).send('Something went wrong');
   }
};

module.exports.getAllReviews = async(req, res)=>{
    try{
        const reviews = await reviewModel.find({targetId:req.params.id}).populate('user','name').populate({path:'targetId',select:'name'});
        
        if (!reviews.length) return res.status(404).send('No reviews found');

        res.status(200).json(reviews);
    }
    catch(error){
        console.log("Fetching reviews",error);
        res.status(500).send("Something went wrong!")
    }
};

module.exports.updateLike = async (req, res) => {
 
  const {reviewId,isLiked} = req.body; 
  const userId = req.user._id;
  try {
   
    const review = await reviewModel.findById(reviewId);
    if (!review) return res.status(404).json({success:false, message: "Review not found" });

    const update = isLiked ? {$pull:{upVote:userId}}:{$addToSet:{upVote:userId}};

    // Use `$inc` for efficiency
    const updated  = await reviewModel.findByIdAndUpdate(reviewId,update ,{new:true});

    res.json({ success:true, likes:updated.upVote.length});
  } catch (error) {
    res.status(500).json({success:false, message: error.message });
  }
};

module.exports.updateDislike = async (req, res) => {

  const {reviewId,isDisliked} = req.body;
  const userId = req.user._id;
  try {

    const review = await reviewModel.findById(reviewId);
    if (!review) return res.status(404).json({success:false, message: "Review not found" });

    const update = isDisliked ? {$pull:{downVote:userId}}:{$addToSet:{downVote:userId}};

    // Use `$inc` for efficiency
   const updated = await reviewModel.findByIdAndUpdate(reviewId, update ,{new:true});

    res.json({success:true,dislikes:updated.downVote.length});
  } catch (error) {
    res.status(500).json({success:false, message: error.message });
  }
};

module.exports.deleteReview = async(req,res)=>{
  try{
   const Id = req.params.Id;
   await reviewModel.findByIdAndDelete(Id);
   res.status(200).send("Review is deleted")
  }
  catch(error){
    console.log(error);
    res.status(501).send("Something went wrong!");
  }

}

module.exports.updateComment = async(req,res)=>{
   try{
     const {comment} = req.body;
     const _id = req.params.Id;
     await reviewModel.findByIdAndUpdate(_id,{comment});
     res.status(200).json({success:true,message:"Comment is Updated"});
   }
   catch(error){
     console.log("Something went wrong!")
   }
}

