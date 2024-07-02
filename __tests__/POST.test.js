const { createUserDB } = require("@repository/users");
const personModel = require("@utils/users/personModel");
jest.mock("@repository/users");



const { server } = require("@root/server");
const agent = require("supertest").agent(server);



afterAll(async () => {
    await server.close();
});

describe('POST /pessoas', () => {
    describe('valid person', () => {
        test('should respond 201 OK status code, header location /pessoas/[added person id] and body with new added person data', async () => {
            createUserDB.mockImplementationOnce(() => {
                return personModel;
            });
            
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
            createUserDB.mockImplementationOnce(() => {
                return personModel;
            });            
            const personModelNullArray = [{...personModel, apelido:null}, {...personModel, name:null}, {...personModel, nascimento:null}];
            for(personModelNull of personModelNullArray){
                const { status } = await agent.post('/api/pessoas').send(personModelNull);
                expect(status).toBe(422);
            };
        });

        

        test('should respond 400 status code(wrong parameter type)', async () => {
            createUserDB.mockImplementationOnce(() => {
                return personModel;
            });            
            const personModelTypeArray = [{...personModel, apelido:1}, {...personModel, name:2}, {...personModel, nascimento:3}];
            for(personModelType of personModelTypeArray){
                const { status } = await agent.post('/api/pessoas').send(personModelType);
                expect(status).toBe(400);
            };
            
        });
        
    });
});