const { countUsersDB } = require("@repository/users");
jest.mock("@repository/users");


const { server } = require("../server");
import supertest from "supertest";
const agent = supertest.agent(server);


afterAll(async () => {
    await server.close();
});

describe("/contagem pessoas", () => {
    test("should respon with the number of people registered", async () => {
        (countUsersDB as jest.Mock).mockImplementationOnce(() => {
            return 10;
        });
        const res = await agent.get("/contagem-pessoas");
        expect(res.body).toBe(10);
    })
})