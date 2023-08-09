const mongoose = require("mongoose");

//Creating and Validating a Database Schema
const tour_schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Tour should be specified"],
    unique: true,
    trim: true,
    minlength: [5, "Tour name should be at least 5 characters long"],
  },
  duration: {
    type: Number,
    required: [true, "A Duration should be specified"],
  },
  maxGroupSize: {
    type: Number,
    min: [2, "Group size cannot be less than 2"],
    max: [100, "Group size cannot exceed 100"],
  },
  difficulty: {
    type: String,
    required: [true, "A Difficulty should be specified"],
  },
  ratingsAverage: {
    type: Number,
    min: [1, "Rating cannot be less than 1"],
    max: [5, "Rating size cannot exceed 5"],
    default: 4.0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A Price should be specified"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, "A Summary should be specified"],
    trim: true,
    minlength: [4, "The Summary should be at least 4 characters long"],
  },
  description: {
    type: String,
    trim: true,
    minlength: [30, "The Description should be at least 30 characters long"],
  },
  imageCover: {
    type: String,
    required: [true, "A Image should be specified"],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: {
    type: [Date],
  },
});
//Creating a Database Model
const Tour = mongoose.model("tour", tour_schema);
module.exports = Tour;

//Creating a new Test-Document
/*
const test_tour = new Tour({
  name: "The Sky Soarer",
  price: 497,
  rating: 4.2,
});

//Adding it to the Database
test_tour
  .save()
  .then((document) => console.log(document))
  .catch((error) => {
    console.log(error);
  });
*/
