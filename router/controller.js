var userPoints = [];

//ADD ROUTE

const addTransaction = (request, response) => {
  let obj = request.body;
  //Convert timestamp from string to date object:
  let date = new Date(obj.timestamp);
  obj.timestamp = date;
  userPoints.push(obj);
  userPoints = userPoints.sort(function (a, b) {
    var dateA = a.timestamp;
    var dateB = b.timestamp;
    return dateA < dateB ? -1 : 1;
  });
  response.json(userPoints);
};

//SPEND ROUTE

const spendingPoints = (request, response) => {
  var pointsRequest = request.body.points; //works
  var returnArr = [];
  for (let i = 0; i < userPoints.length; i++) {
    if (pointsRequest === 0) {
      break;
    }
    // If the points requested is less than the points available in a payer transaction:
    if (userPoints[i].points >= pointsRequest) {
      let payerSubtract = {};
      payerSubtract.payer = userPoints[i].payer;
      payerSubtract.points = 0 - pointsRequest;
      // Determine if payer already exists. First check if array empty:
      if (returnArr.length === 0) {
        returnArr.push(payerSubtract);
      } else {
        //If array isn't empty iterate through it to check if payer matches
        for (let j = 0; j < returnArr.length; j++) {
          //If there is a match:
          if (returnArr[j].payer === payerSubtract.payer) {
            returnArr[j].points = returnArr[j].points + payerSubtract.points;
            break;
          } else {
            //If there is not a match:
            returnArr.push(payerSubtract);
            break;
          }
        }
      }
      //Update original storage array
      userPoints[i].points = userPoints[i].points - pointsRequest;
      //Update points requested
      pointsRequest = 0;
    }

    // If the points requested is more than the points available in a payer transaction:
    if (userPoints[i].points < pointsRequest) {
      let payerSubtract = {};
      payerSubtract.payer = userPoints[i].payer;
      payerSubtract.points = 0 - userPoints[i].points;
      // Determine if payer already exists. First check if array empty:
      if (returnArr.length === 0) {
        returnArr.push(payerSubtract);
      } else {
        //If array isn't empty iterate through it to check if payer matches
        for (let j = 0; j < returnArr.length; j++) {
          //If there is a match:
          if (returnArr[j].payer === payerSubtract.payer) {
            returnArr[j].points = returnArr[j].points + payerSubtract.points;
            break;
          } else {
            //If there is not a match:
            returnArr.push(payerSubtract);
            break;
          }
        }
      }
      //Update original storage array
      pointsRequest = pointsRequest - userPoints[i].points;
      //Update payer points
      userPoints[i].points = 0;
    }
  }
  response.json(returnArr);
};

//BALANCE ROUTE
const fetchAll = (request, response) => {
  //Output has to be an object with the payer as the key name and points as value
  var balanceObj = {};

  for (let i = 0; i < userPoints.length; i++) {
    // Check if returned object already has key matching the payer:
    if (balanceObj.hasOwnProperty(userPoints[i].payer)) {
      // If payer has already been added as a key in the return object
      // the val of userpoints.points will be added to the val of balanceobj.points
      balanceObj[userPoints[i].payer] =
        balanceObj[userPoints[i].payer] + userPoints[i].points;
    } else {
      // If payer isn't already a key then create one with points as value:
      balanceObj[userPoints[i].payer] = userPoints[i].points;
    }
  }

  response.json(balanceObj);
};

module.exports = {
  fetchAll,
  spendingPoints,
  addTransaction,
};
