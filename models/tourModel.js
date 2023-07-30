const mongoose = require("mongoose");

//Creating and Validating a Database Schema
const tour_schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour should be specified"],
    unique: true,
  },
  rating: Number,
  price: {
    type: Number,
    required: [true, "A price should be specified"],
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
