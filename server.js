const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const port = process.env.PORT || 3000;

dotenv.config({ path: "./config.env" });
// console.log(process.env);

//DATABASE
//Connecting Express and MongoDB
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((error) => {
    console.log(error);
  });

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
const tour = mongoose.model("tour", tour_schema);

//Server
//to Listen as the port starts
app.listen(port, "127.0.0.1", () => {
  console.log(`Started to Listen on ${port}`);
});
