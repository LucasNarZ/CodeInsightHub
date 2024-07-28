import Admin from "@utils/types/admin";
const { registerDB } = require("@repository/admins")
jest.mock("@repository/admins");
jest.mock("@utils/createSession");

const { server } = require("../server");
import supertest from "supertest";
const agent = supertest.agent(server);
const { adminModel } = require("@utils/adminModel.ts");

afterAll(async () => {
    await server.close();
});

registerDB.mockImplementation(() => {
    return adminModel;
});


describe('POST /register', () => {
    describe('valid admin', () => {
        test('should respond 201 OK status code, header location /register/[added admin id] and body with new added admin data', async () => {
            const { status, body, headers } = await agent.post('/register').send(adminModel);
            expect(status).toBe(201);
            expect(headers.location).toMatch(/^\/register\/[0-9a-fA-F-]+$/);
            expect({...body, id:undefined}).toMatchObject({...adminModel, id:undefined});
        });
    });

    describe('invalid admin', () => {
        test('should respond 422 status code(unique constraint)', async () => {
            registerDB.mockImplementationOnce(() => {
                throw {name:"SequelizeUniqueConstraintError"}
            });
            const { status } = await agent.post('/register').send(adminModel);
            expect(status).toBe(422); 
        });

        test('should respond 422 status code(null parameter)', async () => {        
            const adminModelNullArray = [{...adminModel, email:null}, {...adminModel, password:null}] as Admin[];
            for(const adminModelNull of adminModelNullArray){
                const { status } = await agent.post('/register').send(adminModelNull);
                expect(status).toBe(400);
            };
        });

        test('should respond 400 status code(wrong parameter type)', async () => {          
            const personModelTypeArray = [{...adminModel, email:1}, {...adminModel, password:2}];
            for(const personModelType of personModelTypeArray){
                const { status } = await agent.post('/register').send(personModelType);
                expect(status).toBe(400);
            };
        }); 
    });
});
