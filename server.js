const dotenv = require("dotenv");
const app = require("./app");
const port = process.env.PORT || 3000;

dotenv.config({ path: "./config.env" });
// console.log(process.env);

//Server
//to Listen as the port starts
app.listen(port, "127.0.0.1", () => {
  console.log(`Started to Listen on ${port}`);
});
