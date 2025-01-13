const  mongoose =require("mongoose");

const reviewSchema = new mongoose.Schema({
  
    comments: String,
    rating:Number,
    createdAt: { type: Date, default: Date.now },
   
  });