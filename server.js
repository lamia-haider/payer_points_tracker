const express = require("express");
const app = express();
const PORT = 8080;
var controllers = require("./db/controller.js");
\
app.use(express.json());

app.get("/points/all", controllers.fetchAll);

app.post("/points/all", controllers.postPoints);

app.post("/points/add", controllers.addTransaction);

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}`);
});

module.exports = {
  userPoints,
};
