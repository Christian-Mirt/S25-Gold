import { expect } from "chai";
import supertest from "supertest";
import app from "../app.js";

describe('Testing Positive Get User by ID API', () => {

    it('Testing Positive Case of Returning Specific User', async function () {

        var response = await supertest(app).get(`/user/1`).send({});

        var user = response.body.data.find(user => user.first_name === "Michael");

        expect(user).to.exist;
    });

})

describe('Testing Negative Get User by ID API', () => {

    it('Testing Negative Case of Returning Specific User', async function () {

        var response = await supertest(app).get(`/user/1`).send({});

        var user = response.body.data.find(user => user.first_name === "Kayla");

        expect(user).to.not.exist;
    });

})
