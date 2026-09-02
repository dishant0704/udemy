const request = require("supertest");
const app = require("../../app");
const { connect, disconnect } = require("../../mongoConfig/MongoDb");

describe("Launch API Test/", () => {
  // Connect MongoDB
  beforeAll(async () => {
    await connect();
  });

  // Disconnect MongoDB
  afterAll(async () => {
    await disconnect();
  });

  describe("Test GET Launches API", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST Launches creat", () => {
    const completeLaunchData = {
      mission: "ZTM155",
      rocket: "ZTM Explorer IS1",
      launchDate: "2030-12-27",
      target: "Kepler-442 b",
    };

    const launchDataWithoutDate = {
      mission: "ZTM155",
      rocket: "ZTM Explorer IS1",
    };

    const LaunchInvalidData = {
      mission: "ZTM155",
      rocket: "ZTM Explorer IS1",
      launchDate: "India",
      target: "Kepler-186 g",
    };

    test("It should respond with 201 success", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missing required proparties", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("It should catch invalid data", async () => {
      const response = await request(app)
        .post("/launches")
        .send(LaunchInvalidData)
        .expect("Content-Type", /json/)
        .expect(400);
      expect(response.body).toStrictEqual({ error: "Invalid launch date" });
    });
  });
});
