const express = require("express");
const { request } = require("http");
const app = express();
const port = 3000;

app.get("/", (request, response) => {
  //response of string
  // response.status(200).send("Hello from the server side !!!");

  //response with json
  response.status(200).json({
    message: "Hello From The Server!!",
    app: "Natours",
  });
});

app.post("/", (request, response) => {
  response.send("Sent from the post endpoint.");
});

app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});