const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./../../models/tourModel");

dotenv.config({ path: "./config.env" });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((error) => {
    console.log(error);
  });

// Input data into DATABASE
const insert_data_into_db = async () => {
  try {
    await Tour.create(tours);
    console.log("Insertion successful in DB");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// Delete data into DATABASE
const delete_data_into_db = async () => {
  try {
    await Tour.deleteMany();
    console.log("Deletion successful from DB");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  insert_data_into_db();
}
if (process.argv[2] === "--delete") {
  delete_data_into_db();
}
