const { countUsersDB } = require("@repository/users");
jest.mock("@repository/users");

import redisSessionsClient from "redis-sessions";

const { server } = require("../server");
import supertest from "supertest";
const agent = supertest.agent(server);

import verifySession from "@utils/users/middlewares/verifySession";
jest.mock("@utils/users/middlewares/verifySession.ts");
(verifySession as jest.Mock).mockImplementation((req, res, next) => {
    next();
});

afterAll(async () => {
    await server.close();
});

describe("/contagem pessoas", () => {
    test("should respon with the number of people registered", async () => {
        (countUsersDB as jest.Mock).mockImplementationOnce(() => {
            return 10;
        });
        const res = await agent.get("/api/contagem-pessoas");
        expect(res.body).toBe(10);
    })
})