const express = require("express");
const app = express();
const PORT = 8080;
var controllers = require("./router/controller.js");

app.use(express.json());

app.get("/points/balance", controllers.fetchAll);

app.post("/points/spend", controllers.spendingPoints);

app.post("/points/add", controllers.addTransaction);

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}`);
});

