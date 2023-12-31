//importing the Express and FileSystem module
const express = require("express");
const app = express();
const morgan = require("morgan"); //Third-Party Middleware
const { request } = require("http");
const { dirname } = require("path");

const tour_router = require("./routers/tourRoutes");
const user_router = require("./routers/userRoutes");

//Middleware
app.use(express.json()); // to get the "json" into the "request"

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`${__dirname}/public`)); // to apply middleware for statics inside the public folder

//user created middleware
app.use((request, response, next) => {
  request.requestedTime = new Date().toISOString(); // add "requestedTime" property to the request to know the request time
  next();
});
app.use("", tour_router);
app.use("/api/v1/users", user_router);

module.exports = app;
