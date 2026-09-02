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
  
  //Test GET Launches API describe
  describe("Test GET planets API", () => {
    test("It should respond with 200 success", async () => {
      const respond = await request(app)
        .get("/planets")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
