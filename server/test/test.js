import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app.js';

describe('Testing user/{id}', () => {

    it('Testing Positive Case of Returning Specific User', async function () {

        var response = await supertest(app).get(`/user/1`).send({});

        expect(response.status).equals(200);

        var user = response.body.data.find(user => user.first_name === "Michael");

        expect(user).to.exist;
        expect(user.last_name).equals("Evans");
        expect(user.email).equals("mevan028@odu.edu");
        expect(user.password).equals("ok");
        expect(user.is_admin).equals(1);

    });

    it('Testing Negative Case of Returning Specific User', async function () {

        var response = await supertest(app).get(`/user/1`).send({});

        expect(response.status).equals(200);

        var user = response.body.data.find(user => user.first_name === "Kayla");

        expect(user).to.not.exist;
    });

    it('Testing Case of Returning Non-existent User', async function () {

        var response = await supertest(app).get(`/user/9`).send({});

        expect(response.status).equals(200);

        var user = response.body.data[0];

        expect(user).to.not.exist;
    });
})

describe('Testing user/total', () => {

    it('Testing Get Total Users API', async function () {

        var response = await supertest(app).post(`/user/total`).send({});

        expect(response.status).equals(200);

        var total = response.body.data;

        expect(total).equals(22); // Update as users increase
    });
})

describe('Testing user/ping-render', () => {

    it('Testing Backend Server Ping', async function () {

        var response = await supertest(app).get(`/user/ping-render`).send({});

        expect(response.status).equals(200);
        expect(response.body.message).equals("Successfully pinged render");
    });
})

describe('Testing user/signUp and user/login', () => {

    let userId;
    let response1;
    const email = "johndoe@example.com";
    const password = "SecurePass123";

    before(async function () {
        // Create a user before running the tests
        const testUser = {
            first_name: "John",
            last_name: "Doe",
            email: email,
            password: password,
        };
    
        response1 = await supertest(app)
            .post("/user/signUp")
            .send(testUser)
            .set("Accept", "application/json");
    
        console.log('User Signup Response:', response1.body);
    
        if (response1.status !== 201) {
            throw new Error('User sign-up failed, stopping tests.');
        }
    
        userId = response1.body.userId;
    });

    it('Testing Positive Case of User Sign Up', async function () {
        expect(response1.status).to.equal(201);
        expect(response1.body).to.have.property("status", 201);
        expect(response1.body).to.have.property("message", "User signed up successfully");
        expect(response1.body).to.have.property("userId").that.is.a("number");
    });

    it('Testing Negative Case of User Sign Up Duplicate Email', async function () {
        const testUser = {
            first_name: "Johnathan",
            last_name: "Adoe",
            email: "johndoe@example.com",
            password: "Somepass2",
        };

        const response = await supertest(app)
            .post("/user/signUp")
            .send(testUser)
            .set("Accept", "application/json");

        console.log('API Response:', response.body);

        expect(response.status).to.equal(500);
    });

    it('Testing Positive Case of User Login', async function () {
        const loginInfo = {
            email: email,
            password: password,
        };

        const response = await supertest(app)
            .post("/user/login")
            .send(loginInfo)
            .set("Accept", "application/json");

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message", "User logged in successfully!");
    });

    
    it('Testing Negative Case of User Login', async function () {
        const loginInfo = {
            email: email,
            password: "SecurePass124", // Off by 1 character
        };

        const response = await supertest(app)
            .post("/user/login")
            .send(loginInfo)
            .set("Accept", "application/json");

        expect(response.status).to.equal(401);
        expect(response.body).to.have.property("message", "Wrong username or password");
    });

    it('Testing Positive Case of User Delete', async function() {
        const response = await supertest(app).delete("/user").send({ id: userId });
    
        console.log(response.body);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message", "User deleted successfully");
    });
});

describe('Testing Place place/tps and place/catalogs', () => {
    it('Testing Total Places API', async function() {
        const response = await supertest(app).get("/place/tps").send();
    
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message", "Total number of places retrieved successfully");
        expect(response.body).to.have.property("data", 22); // Update as number increases
    });

    it('Testing Get All Places', async function() {
        const response = await supertest(app).get("/place/catalogs").send();
    
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message", "Places retrieved successfully");
        expect(response.body).to.have.property("data");
        expect(response.body.data.length).to.be.greaterThan(21);

        const firstPlace = response.body.data[0];

        expect(firstPlace).to.have.property("place_id", 1);
        expect(firstPlace).to.have.property("name", "Not Starbucks");
        expect(firstPlace).to.have.property("address", "5115 Hampton Blvd");
        expect(firstPlace).to.have.property("city", "Norfolk");
        expect(firstPlace).to.have.property("state", "VA");
        expect(firstPlace).to.have.property("zip", "23529");
    });
});

describe('Testing place/reviews', () => {
    it('Positive Case for Retriving Reviews', async function () {
        const response = await supertest(app)
            .get("/place/reviews")
            .query({ place_id: 1 }) // Not Starbucks
            .set("Accept", "application/json");

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", 200);
        expect(response.body).to.have.property("message", "Places reviews retrieved successfully");
        expect(response.body).to.have.property("data").that.is.an("array");

        const firstReview = response.body.data[0];

        expect(firstReview).to.have.property("review_id", 1);
        expect(firstReview).to.have.property("place_id", 1);
        expect(firstReview).to.have.property("user_id", 13);
        expect(firstReview).to.have.property("photo_id", 1);
        expect(firstReview).to.have.property("num_stars", 4);
        expect(firstReview).to.have.property("comment", "Test comment");
    });

    it('Negative Case for Retriving Reviews Invalid Place Id', async function () {
        const response = await supertest(app)
            .get("/place/reviews")
            .query({ place_id: 9999 })
            .set("Accept", "application/json");

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", 200);
        expect(response.body).to.have.property("message", "Places reviews retrieved successfully");
        expect(response.body).to.have.property("data").that.is.an("array").with.length(0);
    });
});

describe('Testing for GET places/', () => {
    it('Testing Positive Case for Retriving Places by Name', async function () {
        const response = await supertest(app)
            .get("/place/places")
            .query({ name: "ODU" }) // Two places have ODU in name
            .set("Accept", "application/json");

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", 200);
        expect(response.body).to.have.property("message", "Places retrieved successfully");
        expect(response.body).to.have.property("data").that.is.an("array").with.length(2);

        const firstPlace = response.body.data[0];
        const secondPlace = response.body.data[1];

        expect(firstPlace).to.have.property("place_id", 19);
        expect(firstPlace).to.have.property("name", "ODU Oceanography Building");
        expect(firstPlace).to.have.property("address", "4402 Elkhorn Ave");
        expect(firstPlace).to.have.property("city", "Norfolk");
        expect(firstPlace).to.have.property("state", "VA");
        expect(firstPlace).to.have.property("zip", "23508");

        expect(secondPlace).to.have.property("place_id", 21);
        expect(secondPlace).to.have.property("name", "Perfectly Frank ODU");
    });

    it("Testing Negative Case for Retriving Places by Name", async function () {
        const response = await supertest(app)
            .get("/place/places")
            .query({ name: "VCU" }) // no match for this name
            .set("Accept", "application/json");

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", 200);
        expect(response.body).to.have.property("message", "Places retrieved successfully");
        expect(response.body).to.have.property("data").that.is.an("array").with.length(0);
    });
});
