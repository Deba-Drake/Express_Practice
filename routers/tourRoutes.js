const express = require("express");
const app = express();

const tour_controller = require("./../controllers/tourController");

//Routes

////////////////////////////---To check for Valid ID before the request hits---////////////////////////////
/*
//To use "param" middleware
express.Router().param("id",(request,response,next,value)=>
{
  console.log("The Tour is",value);
  next();
})
*/

/////////////--------------------TOURS---------------------/////////////
//to implement the "GET" method for all tours
app.get("/api/v1/tours", tour_controller.get_all_tours);

//to implement the "POST" method
app.post("/api/v1/tours", tour_controller.create_tour);

//to implement the "GET" method, "PATCH" method and "DELETE" method for a specific tour
app
  .route("/api/v1/tours/:id")
  .get(tour_controller.get_specified_tour)
  .patch(tour_controller.update_tour)
  .delete(tour_controller.delete_tour);

module.exports = app;
