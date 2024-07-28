import User from "@utils/types/user";
const { createUserDB } = require("@repository/users");
jest.mock("@repository/users");
jest.mock("@utils/createSession");

const { server } = require("../server");
import supertest from "supertest";
const agent = supertest.agent(server);
const { personModel }  = require("@utils/personModel");

afterAll(async () => {
    await server.close();
});

createUserDB.mockImplementation(() => {
    return personModel;
});



describe('POST /pessoas', () => {
    describe('valid person', () => {
        test('should respond 201 OK status code, header location /pessoas/[added person id] and body with new added person data', async () => {
            const { status, body, headers } = await agent.post('/pessoas').send(personModel);
            expect(status).toBe(201);
            expect(headers.location).toMatch(/^\/pessoas\/[0-9a-fA-F-]+$/);
            expect({...body, id:undefined}).toMatchObject({...personModel, id:undefined});
        });
        
        test("should respond 201 status code(optional parameter)", async () => {
            createUserDB.mockImplementationOnce(() => {
                return {...personModel, stack:[]};
            });
            const { status } = await agent.post('/pessoas').send({...personModel, stack:null});
            expect(status).toBe(201);
        });
    });

    describe('invalid person', () => {
        test('should respond 422 status code(unique constraint)', async () => {
            createUserDB.mockImplementationOnce(() => {
                throw {name:"SequelizeUniqueConstraintError"}
            });
            const { status } = await agent.post('/pessoas').send(personModel);
            expect(status).toBe(422); 
        });

        test('should respond 422 status code(null parameter)', async () => {        
            const personModelNullArray = [{...personModel, apelido:null}, {...personModel, name:null}, {...personModel, nascimento:null}] as User[];
            for(let personModelNull of personModelNullArray){
                const { status } = await agent.post('/pessoas').send(personModelNull);
                expect(status).toBe(422);
            };
        });

        test('should respond 400 status code(wrong parameter type)', async () => {          
            const personModelTypeArray = [{...personModel, apelido:1}, {...personModel, name:2}, {...personModel, nascimento:3}];
            for(let personModelType of personModelTypeArray){
                const { status } = await agent.post('/pessoas').send(personModelType);
                expect(status).toBe(400);
            };
        }); 
    });
});