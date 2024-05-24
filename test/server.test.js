const request = require("supertest");
const { app, server } = require("../src/server");
const randomstring = require("randomstring");

// Função para enviar uma requisição POST com dados de pessoa e retornar a resposta
async function sendPostRequest(data) {
    return await request(app).post('/pessoas').send(data);
}

beforeAll(() => {
    server.close();
});

describe('POST /pessoas', () => {
    describe('valid person', () => {

        test('should respond 201 OK status code', async () => {
            const response = await sendPostRequest({
                apelido: randomstring.generate({ length: 12, charset: 'alphabetic' }),
                nome: "a",
                nascimento: "0000-00-00",
                stack: []
            });
            expect(response.status).toBe(201);
        });

        test('should respond with a header location with /pessoas/(added person id)', async () => {
            const apelido = randomstring.generate({ length: 12, charset: 'alphabetic' });
            const response = await sendPostRequest({
                apelido: apelido,
                nome: apelido,
                nascimento: "0000-00-00",
                stack: []
            });
            expect(response.headers.location).toMatch(/^\/pessoas\/[0-9a-fA-F-]+$/);
        });

        test('should respond with a body with the new added person', async () => {
            const apelido = randomstring.generate({ length: 12, charset: 'alphabetic' });
            const person = {
                apelido: apelido,
                nome: apelido,
                nascimento: "0000-00-00",
                stack: []
            };
            const response = await sendPostRequest(person);
            expect(response.body).toMatchObject(person);
        });
    });

    describe('invalid person', () => {

        test('should respond 422 status code(unique constraint)', async () => {
            const response1 = await sendPostRequest({
                apelido: "a",
                nome: randomstring.generate({ length: 12, charset: 'alphabetic' }),
                nascimento: "0000-00-00",
                stack: []
            });
            const response2 = await sendPostRequest({
                apelido: "a",
                nome: randomstring.generate({ length: 12, charset: 'alphabetic' }),
                nascimento: "0000-00-00",
                stack: []
            });
            expect(response2.status).toBe(422);
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
            const name = randomstring.generate({ length: 12, charset: 'alphabetic' });
            const response = await sendPostRequest({ apelido: name, nome: name, nascimento: "000-00-00", stack: null })
        });

        test('should respond 400 status code(wrong parameter type)', async () => {
            const name = randomstring.generate({ length: 12, charset: 'alphabetic' });
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
