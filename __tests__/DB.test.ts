import { createUserDB, findByIdDB, findByTermDB, countUsersDB } from "@repository/users";
import { personModel } from "@utils/users/personModel";
import { v4 } from "uuid";

const newPersonModel = {...personModel, searchVector:"luc  Lucas Python JS", id:v4(), apelido:v4()};

describe("DB", () => {
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