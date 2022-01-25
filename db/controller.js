var userPoints = [];

//add transaction route, convert date from string to date object
const addTransaction = (request, response) => {
  let obj = request.body;
  var date = new Date(obj.timestamp);
  obj.timestamp = date;
  userPoints.push(obj);
  response.json(userPoints);
};

//spending points route
//  We want the oldest points to be spent first
//(oldest based on transaction timestamp not the order they’re received)
//  We want no payer's points to go negative.
const spendingPoints = (request, response) => {};
//points balance route
const fetchAll = (request, response) => {};

module.exports = {
  fetchAll,
  spendingPoints,
  addTransaction,
};
