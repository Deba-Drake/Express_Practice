const fs = require("fs");
const Tour = require("./../models/tourModel");
const { error } = require("console");
const { options } = require("../app");
const { json } = require("express");

//To read the data about all "TOURS"
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//Route Handlers

/////////////--------------------TOURS---------------------/////////////
//to get all tours
exports.get_all_tours = async (request, response) => {
  //Get the All Tours from the Database
  try {
    //FILTERING

    //to make a new object out of the query to the original intact
    const requested_query = { ...request.query };

    //the parameters we need to exclude
    const exclude_from_query = ["page", "sort", "limit", "fields"];

    //removing the parameters
    exclude_from_query.forEach((element) => delete requested_query[element]);

    //ADVANCE FILTERING

    //to change the query into a string
    let requested_query_string = JSON.stringify(requested_query);

    //to create the applicable string
    requested_query_string = requested_query_string.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (matched_word) => `$${matched_word}`
    );
    //to change the string into a query
    requested_query_string = JSON.parse(requested_query_string);

    const query = Tour.find(requested_query_string);

    const requested_tours = await query;

    response.status(200).json({
      status: "Success",
      // requestedAt: request.requestedTime,
      results: requested_tours.length,
      data: { tours: requested_tours },
    });
  } catch (error) {
    response.status(404).json({
      status: "Failed",
      message: "No Tours Found",
    });
  }
};

//to get specified tour
exports.get_specified_tour = async (request, response) => {
  //Get the Specified Tour from the Database
  try {
    const requested_tour = await Tour.findById(request.params.id);

    response.status(200).json({
      status: "Success",
      tour: requested_tour,
    });
  } catch (error) {
    response.status(404).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }

  /*
  //Get the Specified Tour from the tours-simple.json
  //get the specified tour if present
  const requested_tour = data.find((tour) => {
    if (tour.id === +request.params.id) {
      return tour; // stop searching
    }
  });

  //return failed
  if (!requested_tour) {
    response.status(404).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }
  //returned success
  else {
    response.status(200).json({
      status: "Success",
      tour: requested_tour,
    });
  }
  */
};

//to create a new tour
exports.create_tour = async (request, response) => {
  //Creating a new Tour in The MongoDB Databse
  try {
    const new_tour = await Tour.create(request.body);

    response.status(201).json({
      status: "Success",
      data: { tour: new_tour },
    });
  } catch (error) {
    response.status(400).json({
      status: "Failed",
      message: "Invalid Data sent",
    });
  }

  /*
  //Creating a new Tour in the tours-simple.json File
  
  //creating the new "id" for the request recieved
  const new_id = data[data.length - 1].id + 1;

  //creating the new object which is added to the database
  const new_tour = Object.assign({ id: new_id }, request.body);
  data.push(new_tour);

  //adding to the database
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(data),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Success");
        response
          .status(201)
          .json({ status: "Success", data: { tour: new_tour } });
      }
    }
  );
  */
};

//to update specified tour
// to be done after MongoDB is Insitialised
exports.update_tour = async (request, response) => {
  //Updating a new Tour in The MongoDB Databse
  try {
    const requested_tour = await Tour.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );
    response.status(200).json({
      status: "Success",
      tour: requested_tour,
    });
  } catch (error) {
    response.status(400).json({
      status: "Failed",
      message: "Invalid Data sent",
    });
  }

  //Update the Specified Tour from the tours-simple.json
  /*
  //get the specified tour if present
  const requested_tour = data.find((tour) => {
    if (tour.id === +request.params.id) {
      return tour; // stop searching
    }
  });

  //return failed
  if (!requested_tour) {
    response.status(404).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }
  //returned success
  else {
    response.status(200).json({
      status: "Success",
      requested_tour: requested_tour,
      tour: "<Patched Tour Here>",
    });
  }
  */
};

//to delete a tour
// to be done after MongoDB is Insitialised
exports.delete_tour = async (request, response) => {
  //Deleting a new Tour in The MongoDB Databse
  try {
    const deleted_tour = await Tour.findByIdAndDelete(request.params.id);
    response.status(200).json({
      status: "Success",
      tour: deleted_tour,
    });
  } catch (error) {
    console.log("The error is", error);
    response.status(400).json({
      status: "Failed",
      message: "Invalid Data sent",
    });
  }
  //Get the Specified Tour from the tours-simple.json
  /*
  //get the specified tour if present
  const requested_tour = data.find((tour) => {
    if (tour.id === +request.params.id) {
      return tour; // stop searching
    }
  });

  //return failed
  if (!requested_tour) {
    response.status(404).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }
  //returned success
  else {
    response.status(204).json({
      status: "Success",
      data: null,
    });
  }
  */
};
