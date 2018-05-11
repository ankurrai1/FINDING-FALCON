const request = require("supertest");
const assert = require("chai").assert;
let app = require("../app.js");

describe("app", () => {
  beforeEach(function() {
    handleError = function(done) {
      return function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      };
    };
  });
  describe("GET /bad", () => {
    it("resonds with 404", done => {
      request(app)
        .get("/bad")
        .expect(404)
        .end(handleError(done));
    });
  });

  describe("GET /", () => {
    it("should serve landing page", done => {
      request(app)
        .get("/")
        .expect(200)
        .expect("Content-Type", "text/html; charset=UTF-8")
        .expect(/FINDING FALCON/)
        .end(handleError(done));
    });
  });
  describe("GET /index.html", () => {
    it("should serve landing page", done => {
      request(app)
        .get("/index.html")
        .expect(200)
        .expect("Content-Type", "text/html; charset=UTF-8")
        .expect(/FINDING FALCON/)
        .end(handleError(done));
    });
  });
  describe("GET /setup.html", () => {
    it("should serve setup page", done => {
      request(app)
        .get("/setup.html")
        .expect(200)
        .expect("Content-Type", "text/html; charset=UTF-8")
        .expect(/getPlanetAndVehical()/)
        .end(handleError(done));
    });
  });
  describe("POST /token", () => {
    it("should store token as cookie", done => {
      request(app)
        .post("/token")
        .send("token=123456")
        .expect(200)
        .expect("set-cookie", /token=123456/)
        .end(handleError(done));
    });
  });
});