import { expect } from "chai";
import supertest from "supertest";
import app from "../app.js";

describe('Testing user/{id}', () => {

    it('Testing Positive Case of Returning Specific User', async function () {

        var response = await supertest(app).get(`/user/1`).send({});

        expect(response.status).equals(200);

        var user = response.body.data.find(user => user.first_name === "Michael");

        expect(user).to.exist;
        expect(user.last_name).equals('Evans');
        expect(user.email).equals('mevan028@odu.edu');
        expect(user.password).equals('password');
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

        expect(total).equals(22);
    });
})

describe('Testing user/ping-render', () => {

    it('Testing Backend Server Ping', async function () {

        var response = await supertest(app).get(`/user/ping-render`).send({});

        expect(response.status).equals(200);
        expect(response.body.message).equals('Successfully pinged render');
    });
})

describe('Testing user/signUp', () => {

    let userId;

    it("Testing Positive Case of User Sign Up", async function () {
        const testUser = {
            first_name: "John",
            last_name: "Doe",
            email: "johndoe@example.com",
            password: "SecurePass123",
        };

        const response = await supertest(app)
            .post("/user/signUp")
            .send(testUser)
            .set("Accept", "application/json");

        console.log("API Response:", response.body);

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("status", 201);
        expect(response.body).to.have.property("message", "User signed up successfully");
        expect(response.body).to.have.property("userId").that.is.a("number");

        userId = response.body.userId;
    });

    after(async function () {
        const response = await supertest(app)
            .delete(`/user/`)
            .send({ id: userId });

        console.log("Deleted:", response.body);
    });
});