import Admin from "@utils/types/admin";
import { registerDB } from "@repository/admins";
jest.mock("@repository/admins");
jest.mock("@utils/createSession");

import { server } from "../server";
import supertest from "supertest";
const agent = supertest.agent(server);
import { adminModel } from "@utils/adminModel";

afterAll(async () => {
    await server.close();
});

(registerDB as jest.Mock).mockImplementation(() => {
    return adminModel;
});


describe('POST /register', () => {
    describe('valid admin', () => {
        test('should respond 201 OK status code, header location /register/[added admin id] and body with new added admin data', async () => {
            const { status, body, headers } = await agent.post('/api/register').send(adminModel);
            expect(status).toBe(201);
            expect(headers.location).toMatch(/^\/register\/[0-9a-fA-F-]+$/);
            expect({...body, password:undefined, id:undefined}).toMatchObject({...adminModel, password:undefined, id:undefined});
        });
    });

    describe('invalid admin', () => {
        test('should respond 422 status code(unique constraint)', async () => {
            (registerDB as jest.Mock).mockImplementationOnce(() => {
                throw {name:"SequelizeUniqueConstraintError"}
            });
            const { status } = await agent.post('/api/register').send(adminModel);
            expect(status).toBe(422); 
        });

        test('should respond 400 status code(null parameter)', async () => {        
            const adminModelNullArray = [{...adminModel, email:null}, {...adminModel, password:null}] as Admin[];
            for(const adminModelNull of adminModelNullArray){
                const { status } = await agent.post('/api/register').send(adminModelNull);
                expect(status).toBe(400);
            };
        });

        test('should respond 400 status code(wrong parameter type)', async () => {          
            const personModelTypeArray = [{...adminModel, email:1}, {...adminModel, password:2}];
            for(const personModelType of personModelTypeArray){
                const { status } = await agent.post('/api/register').send(personModelType);
                expect(status).toBe(400);
            };
        }); 
    });
});
