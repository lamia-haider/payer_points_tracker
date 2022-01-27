# Requirements

- NodeJs https://nodejs.org/en/
- Postman https://www.postman.com/: This will be used to make API requests and see the responses.

# Initial Steps

1. Download the project either by cloning the project from this github repository: https://github.com/lamia-haider/payer_points_tracker
2. In your code editor of choice navigate to the project directory
3. In your terminal run the command `npm install`
4. In your terminal run the command `npm run start`
5. This project's API server will start on port 8080 by default, if this port is already in use on your machine the server will use a different one, use that when making API requests.

_NOTE_: The tests for the API calls can be run by running `npm run test` in your terminal.

# Endpoints

## GET the balance of all payer points

Route for Postman:

`GET` `http://localhost:8080/points/balance`

Example response:

```
{
"DANNON": 1000,
"UNILEVER": 0,
"MILLER COORS": 5300
}
```

## POST/ADD a payer and the corresponding points

Route for Postman:
`POST` `http://localhost:8080/points/add`

This route enables the addition of a new payer and their corresponding points, or if the payer already exists it updates their points. The response will be the updated array of payer objects.

Make sure Postman POST request settings have the Body enabled as 'raw', with a JSON format:

![alt text](https://github.com/lamia-haider/payer_points_tracker/blob/main/readmeimg.png?raw=true)

Example request:

```
{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }

```

Example response:

```
[
    {
        "payer": "DANNON",
        "points": 1000,
        "timestamp": "2020-11-02T14:00:00Z"
    },
    {
        "payer": "UNILEVER",
        "points": 200,
        "timestamp": "2020-10-31T11:00:00Z"
    }
]
```

## POST/SPEND Route

Route for Postman:
`POST` `http://localhost:8080/points/spend`

When a user spends points there are two rules for determining what points to "spend" first:

- We want the oldest points to be spent first (oldest based on transaction timestamp, not the order they’re received)
- We want no payer's points to go negative.
  The request for this call will be the number of points to spend, and the response will be an array showing which payers were used to spend the points.

Make sure Postman POST request settings have the Body enabled as 'raw', with a JSON format:
![alt text](https://github.com/lamia-haider/payer_points_tracker/blob/main/readmeimg.png?raw=true)


Example request:

```
{ "points": 5000 }

```

Example response:

```
[
{ "payer": "DANNON", "points": -100 },
{ "payer": "UNILEVER", "points": -200 },
{ "payer": "MILLER COORS", "points": -4,700 }
]
```
