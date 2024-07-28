const { findByTermDB } = require("@repository/users");
jest.mock("@repository/users");
const { server } = require("../server");
import supertest from "supertest";
const agent = supertest.agent(server);

const { personModel } = require("@utils/personModel");
const searchedPersons = new Array(10).fill(personModel);

afterAll(async () => {
    await server.close();
});

describe("GET /pessoas?t=[:search term]", () => {
    describe("should respond with all matchs", () => {
        test("using data", async () => {
            (findByTermDB as jest.Mock).mockImplementationOnce(() => {
                return searchedPersons;
            });
            const { body } = await agent.get("/pessoas?t=luc");
            expect(body).toEqual(searchedPersons);

        })
    })

    describe("other details", () => {
        test("should respond 200 status code, respond []", async () => {
            (findByTermDB as jest.Mock).mockImplementationOnce(() => {
                return [];
            });

            const { body, status } = await agent.get("/pessoas?t=luc");
            expect(body).toEqual([]);
            expect(status).toBe(200);
        })
    })
})