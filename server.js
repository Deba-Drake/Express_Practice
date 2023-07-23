const app = require("./app");
const port = 3000;

//Server
//to Listen as the port starts
app.listen(port, "127.0.0.1", () => {
  console.log(`Started to Listen on ${port}`);
});
