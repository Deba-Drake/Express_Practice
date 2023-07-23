const express = require("express");
const {
  get_all_users,
  create_user,
  get_specified_user,
  update_user,
  delete_user,
} = require("./../controllers/userrController");

//Routes

/////////////--------------------USERS---------------------/////////////

//To create a sub-app/middleware and Express.Route()
const user_Router = express.Router();

//to implement the "GET" & "POST" method for all users and new user respectively
user_Router.route("/").get(get_all_users).post(create_user);

//to implement the "GET" method, "PATCH" method and "DELETE" method for a specific user
user_Router
  .route("/:id")
  .get(get_specified_user)
  .patch(update_user)
  .delete(delete_user);

module.exports = user_Router;
