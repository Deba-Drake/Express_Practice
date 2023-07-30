const fs = require("fs");
const Tour = require("./../models/tourModel");
const { error } = require("console");

//To read the data about all "TOURS"
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//Route Handlers

/////////////--------------------TOURS---------------------/////////////
//to get all tours
exports.get_all_tours = (request, response) => {
  response.status(200).json({
    status: "Success",
    requestedAt: request.requestedTime,
    results: data.length,
    tours: data,
  });
};

//to get specified tour
exports.get_specified_tour = (request, response) => {
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
  //Creating a new Tour in the simple-tours-json File
  
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
exports.update_tour = (request, response) => {
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
};

//to delete a tour
// to be done after MongoDB is Insitialised
exports.delete_tour = (request, response) => {
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
};
