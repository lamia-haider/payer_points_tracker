// var userPoints = require("../server.js");
var userPoints = [];

//add transaction route
const addTransaction = (request, response) => {
  let obj = request.body;
  userPoints.push(obj);
  response.json(userPoints);
};

//spending points route
const spendingPoints = (request, response) => {};
//points balance route
const fetchAll = (request, response) => {};

module.exports = {
  fetchAll,
  spendingPoints,
  addTransaction,
};
