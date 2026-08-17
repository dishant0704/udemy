const request =  require("supertest");
const app = require("../../app");

//Test GET Launches API describe
describe("Test GET planets API", () => {
    test("It should respond with 200 success",async()=>{
        const respond = await request(app)
        .get("/planets")
        .expect("Content-Type", /json/)
        .expect(200)
    })
})