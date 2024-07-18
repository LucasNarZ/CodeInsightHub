import { createUserDB, findByIdDB, findByTermDB, countUsersDB } from "@repository/users";
import { personModel } from "@utils/users/personModel";
import { v4 } from "uuid";

const { server } = require("../server");
import supertest from "supertest";
const agent = supertest.agent(server);

const newPersonModel = {...personModel, searchvector:"luc  Lucas Python JS", id:v4(), apelido:v4()};

afterAll(async () => {
    await server.close();
});


describe("Postgres", () => {
    test("should respond with added user", async () => {
        const user = (await createUserDB(newPersonModel)).dataValues;
        expect(user).toMatchObject(newPersonModel);
    });

    test("should respond searched by id person", async () => {
        const userById = (await findByIdDB(newPersonModel.id)).dataValues;
        expect(userById).toStrictEqual(newPersonModel);
    });

    test("should respond with users by term", async () => {
        const usersByTerm = (await findByTermDB("luc"));
        expect(usersByTerm).toEqual(expect.arrayContaining([expect.objectContaining(newPersonModel)]));
    });

    test("should respond with least one user", async () => {
        const countPersons = await countUsersDB();
        expect(countPersons).toBeGreaterThanOrEqual(1);
    });


})

describe("Sessions and Redis", () => {
    test("should create a cookie and add to Redis userId", async () => {
        const { headers } = await agent.post("/api/pessoas").send(personModel);
        expect(headers["set-cookie"]).toBeDefined();
    });
});