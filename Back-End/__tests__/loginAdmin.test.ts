import { loginAdminDB } from "@repository/admins";
import argon2 from "argon2";
jest.mock("@repository/admins");
jest.mock("@utils/createSession");


import { server } from "../server";
import supertest from "supertest";
const agent = supertest.agent(server);
import { adminModel } from "@utils/adminModel";

afterAll(async () => {
    await server.close();
});

(loginAdminDB as jest.Mock).mockImplementation(async () => {
    return {dataValues:{id:adminModel.id, password: await argon2.hash(adminModel.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 2,
        hashLength: 128,
    })}}
});


describe('POST /register', () => {
    describe('valid admin', () => {
        test('should respond 201 OK status code', async () => {
            const { status } = await agent.post('/api/login').send({email:adminModel.email, password:adminModel.password});
            expect(status).toBe(200);
        });
    });

    describe('invalid admin', () => {
        test("should respond with 401 unauthorized", async () => {
            const { status } = await agent.post('/api/login').send({email:adminModel.email, password:"wrongpassword"});
            expect(status).toBe(401);
        })

        
    });
});
