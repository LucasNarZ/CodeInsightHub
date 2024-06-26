const { server } = require("@root/server");
const agent = require("supertest").agent(server);

const randomstring = require("randomstring");
// Função para enviar uma requisição POST com dados de pessoa e retornar a resposta
const sendPostRequest = async (data) => {
    return await agent.post('/api/pessoas').send(data);
}

const name = randomstring.generate({ length: 12, charset: 'alphabetic' });
const personModel = {
    apelido: name,
    nome: name,
    nascimento: "0000-00-00",
    stack: []
};


afterEach(async () => {
    await agent.delete("/api/all");
    server.close();
});

describe('POST /pessoas', () => {
    describe('valid person', () => {

        test('should respond 201 OK status code, header location /pessoas/[added person id] and body with new added person data', async () => {
            const response = await sendPostRequest(personModel);
            expect(response.status).toBe(201);
            expect(response.headers.location).toMatch(/^\/pessoas\/[0-9a-fA-F-]+$/);
            expect(response.body).toMatchObject(personModel);
        });

    });

    describe('invalid person', () => {
        test('should respond 422 status code(unique constraint)', async () => {
            await sendPostRequest(personModel);
            const { status } = await sendPostRequest(personModel);
            expect(status).toBe(422);
        });

        test('should respond 422 status code(null parameter)', async () => {
            const name = randomstring.generate({ length: 12, charset: 'alphabetic' });
            const responses = await Promise.all([
                sendPostRequest({ apelido: null, nome: name, nascimento: "0000-00-00", stack: [] }),
                sendPostRequest({ apelido: name, nome: null, nascimento: "0000-00-00", stack: [] }),
                sendPostRequest({ apelido: name, nome: name, nascimento: null, stack: [] })
            ]);
            responses.forEach(response => {
                expect(response.status).toBe(422);
            });
        });

        test("should respond 201 status cod(optional parameter)", async () => {
            const { status } = await sendPostRequest({ apelido: "a", nome: name, nascimento: "0000-00-00", stack: null })
            expect(status).toBe(201);
        });

        test('should respond 400 status code(wrong parameter type)', async () => {
            const responses = await Promise.all([
                sendPostRequest({ apelido: 1, nome: name, nascimento: "0000-00-00", stack: [] }),
                sendPostRequest({ apelido: name, nome: 1, nascimento: "0000-00-00", stack: [] }),
                sendPostRequest({ apelido: name, nome: name, nascimento: 1, stack: [] })
            ]);
            responses.forEach(response => {
                expect(response.status).toBe(400);
            });
        });
        
    });
});