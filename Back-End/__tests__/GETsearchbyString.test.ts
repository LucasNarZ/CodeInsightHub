const { findByTermDB } = require("@repository/users");
jest.mock("@repository/users");
import redisSessionsClient from "redis-sessions";
const { server } = require("../server");
import supertest from "supertest";
const agent = supertest.agent(server);

const { personModel } = require("@utils/users/personModel");
const searchedPersons = new Array(10).fill(personModel);

import verifySession from "@utils/users/middlewares/verifySession";
jest.mock("@utils/users/middlewares/verifySession.ts");
(verifySession as jest.Mock).mockImplementation((req, res, next) => {
    next();
});

afterAll(async () => {
    await server.close();
});

describe("GET /pessoas?t=[:search term]", () => {
    describe("should respond with all matchs", () => {
        test("using data", async () => {
            (findByTermDB as jest.Mock).mockImplementationOnce(() => {
                return searchedPersons;
            });
            const { body } = await agent.get("/api/pessoas?t=luc");
            expect(body).toEqual(searchedPersons);

        })
    })

    describe("other details", () => {
        test("should respond 200 status code, respond []", async () => {
            (findByTermDB as jest.Mock).mockImplementationOnce(() => {
                return [];
            });

            const { body, status } = await agent.get("/api/pessoas?t=luc");
            expect(body).toEqual([]);
            expect(status).toBe(200);
        })
    })
})