import { findByIdDB } from "@repository/users";
jest.mock("@repository/users");
import personModel from "@utils/users/personModel";

import { server } from "@root/server";
import supertest from "supertest";
const agent = supertest.agent(server);


afterAll(async () => {
    await server.close();
});

describe('GET /pessoas/[:id]', () => {
    describe('valid search', () => { 
        test('should respond with status code 200 OK and person data', async () => {
            (findByIdDB).mockImplementationOnce(() => {
                return personModel;
            })
            const { status, body } =  await agent.get("/api/pessoas/2CA263F1-5C94-11E0-84CC-002170FBAC5B");
            expect(status).toBe(200);
            expect( body ).toMatchObject(personModel);
        });
    });

    describe('invalid search', () => {
        test('should respond status 404', async () => {
            (findByIdDB).mockImplementationOnce(() => {
                return null;
            })
            const { status, body } =  await agent.get("/api/pessoas/2CA263F1-5C94-11E0-84CC-002170FBAC5B");
            expect(status).toBe(404);
            expect(body).toMatchObject({name:"UserNotFound"})
        })
    })
});