const request = require("supertest");
const express = require("express");
const app = express();

describe("Test routes", () => {
  test("POST /points/add", (done) => {
    request(app)
      .post("/points/add")
      .send({
        payer: "TEST",
        points: 350,
        timestamp: "2020-10-31T10:00:00Z",
      })
      .expect((res) => {
        res.payer = "TEST";
        res.points = 350;
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
