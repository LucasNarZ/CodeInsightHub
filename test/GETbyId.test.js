const request = require("supertest");
const { app, server } = require("../src/server");
const randomstring = require("randomstring");
// Função para enviar uma requisição POST com dados de pessoa e retornar a resposta
const sendPostRequest = async (data) => {
    return await request(app).post('/api/pessoas').send(data);
};

async function sendGetByIdRequest(id){
    return await request(app).get('/api/pessoas/' + id);
};


const name = randomstring.generate({ length: 12, charset: 'alphabetic' });
const personModel = {
    apelido: name,
    nome: name,
    nascimento: "0000-00-00",
    stack: []
};


afterEach(async () => {
    await request(app).delete("/api/all");
    server.close();
});

describe('GET /pessoas/[:id]', () => {
    describe('valid search', () => {
        test('should respond with status code 200 OK and person data', async () => {
            const user = await sendPostRequest(personModel);
            const { status, body } = await sendGetByIdRequest(user.body.id);

            expect( status ).toBe(200);
            expect(body).toMatchObject(personModel);
        });

    });

    describe('invalid search', () => {
        test('should respond status 404', async () => {
            const {status} = await sendGetByIdRequest("5cc226ae-ea08-4b2f-b848-e984069a0");
            expect(status).toBe(404);
        })
    })
});