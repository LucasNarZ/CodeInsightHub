import User from "@utils/users/types/user";
let { createUserDB } = require("@repository/users");
let createSession = require("@utils/users/createSession.ts");
jest.mock("@repository/users");
jest.mock("@utils/users/createSession.ts");

const { server } = require("../server");
import supertest from "supertest";
const agent = supertest.agent(server);
const { personModel }  = require("@utils/users/personModel");

afterAll(async () => {
    await server.close();
});

console.log(createSession);
createUserDB.mockImplementation(() => {
    return personModel;
});



describe('POST /pessoas', () => {
    describe('valid person', () => {
        test('should respond 201 OK status code, header location /pessoas/[added person id] and body with new added person data', async () => {
            const { status, body, headers } = await agent.post('/api/pessoas').send(personModel);
            expect(status).toBe(201);
            expect(headers.location).toMatch(/^\/pessoas\/[0-9a-fA-F-]+$/);
            expect(body).toMatchObject(personModel);
        });
        
        test("should respond 201 status code(optional parameter)", async () => {
            createUserDB.mockImplementationOnce(() => {
                return {...personModel, stack:[]}
            });
            const { status } = await agent.post('/api/pessoas').send({...personModel, stack:null});
            expect(status).toBe(201);
        });
    });

    describe('invalid person', () => {
        test('should respond 422 status code(unique constraint)', async () => {
            createUserDB.mockImplementationOnce(() => {
                throw {name:"SequelizeUniqueConstraintError"}
            });
            const { status } = await agent.post('/api/pessoas').send(personModel);
            expect(status).toBe(422); 
        });

        test('should respond 422 status code(null parameter)', async () => {        
            const personModelNullArray = [{...personModel, apelido:null}, {...personModel, name:null}, {...personModel, nascimento:null}] as User[];
            for(let personModelNull of personModelNullArray){
                const { status } = await agent.post('/api/pessoas').send(personModelNull);
                expect(status).toBe(422);
            };
        });

        test('should respond 400 status code(wrong parameter type)', async () => {          
            const personModelTypeArray = [{...personModel, apelido:1}, {...personModel, name:2}, {...personModel, nascimento:3}];
            for(let personModelType of personModelTypeArray){
                const { status } = await agent.post('/api/pessoas').send(personModelType);
                expect(status).toBe(400);
            };
        }); 
    });
});