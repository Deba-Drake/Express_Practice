//importing the Express and FileSystem module
const express = require("express");
const app = express();
const fs = require("fs");
const { request } = require("http");
const { dirname } = require("path");

const port = 3000;
app.use(express.json()); // to get the "json" into the "request"
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//to implement the "GET" method for all tours
app.get("/api/v1/tours", (request, response) => {
  response.status(200).json({
    status: "Success",
    results: data.length,
    tours: data,
  });
});

//to implement the "GET" method for a specific tour
app.get("/api/v1/tours/:id", (request, response) => {
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
});

//to implement the "POST" method
app.post("/api/v1/tours", (request, response) => {
  // console.log(request.body);

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
});

//to Listen as the port starts
app.listen(port, "127.0.0.1", () => {
  console.log(`Started to Listen on ${port}`);
});
