const express = require('express');
const router = express.Router();



const { isLoggedIn } = require('../middleware/isLoggedIn');

const {createReview,getReview,getAllReviews,updateLike,updateDislike,deleteReview,updateComment,replyComment} = require('../controllers/review-controller');


const reviewModel = require('../models/review-model');

router.post('/create-review', isLoggedIn, createReview);
router.get('/get-review',getReview);
router.get('/get-review/:id', getAllReviews);
router.put('/like', isLoggedIn, updateLike);
router.put("/dislike", isLoggedIn, updateDislike);;
router.delete('/delete-review/:Id',isLoggedIn, deleteReview);
router.put('/update-comment/:Id',isLoggedIn,updateComment);


module.exports = router;