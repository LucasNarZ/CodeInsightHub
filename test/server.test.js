const request = require("supertest");
const { app, server } = require("../src/server");
const randomstring = require("randomstring");
const { toIncludeSameMembers } = require("jest-extended")
// Função para enviar uma requisição POST com dados de pessoa e retornar a resposta
const sendPostRequest = jest.fn(async (data) => {
    return await request(app).post('/pessoas').send(data);
})

async function sendGetByIdRequest(id){
    return await request(app).get('/pessoas/' + id);
}

async function StringMatchRequest(string){
    return await request(app).get("/pessoas?t=" + string)
}


const name = randomstring.generate({ length: 12, charset: 'alphabetic' });
const personModel = {
    apelido: name,
    nome: name,
    nascimento: "0000-00-00",
    stack: []
};

beforeAll(async () => {

    server.close();
});


afterEach(async () => {
    await request(app).delete("/all");
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

describe("GET /pessoas?t=[:termo da busca]", () => {
    describe("should respond with all matchs", () => {
        test("using apelido", async () => {
            const users = await Promise.all([
                sendPostRequest({ apelido: "teste" + name, nome: name, nascimento: "0000-00-00", stack: [] }),
                sendPostRequest({ apelido: name, nome: name, nascimento: "0000-00-00", stack: [] }),
                sendPostRequest({ apelido: name + "teste", nome: name, nascimento: "0000-00-00", stack: [] })
            ]);

            const { body } = await StringMatchRequest("teste");
            expect(new Set(body)).toEqual(new Set([users[2].body, users[0].body]));

        })

        test("using nome", async () => {
            const users = await Promise.all([
                sendPostRequest({ apelido: "a", nome: "teste" + name, nascimento: "0000-00-00", stack: [] }),
                sendPostRequest({ apelido: name, nome: name, nascimento: "0000-00-00", stack: [] }),
                sendPostRequest({ apelido: "b", nome: name + "teste", nascimento: "0000-00-00", stack: [] })
            ]);

            const { body } = await StringMatchRequest("teste");
            expect(new Set(body)).toEqual(new Set([users[0].body, users[2].body]));
        })

        test("using nascimento", async () => {
            const users = await Promise.all([
                sendPostRequest({ apelido: "a", nome: "teste" + name, nascimento: "0000-02-01", stack: [] }),
                sendPostRequest({ apelido: name, nome: name, nascimento: "0000-02-00", stack: [] }),
                sendPostRequest({ apelido: "b", nome: name + "teste", nascimento: "0000-02-01", stack: [] })
            ]);

            const { body } = await StringMatchRequest("01");
            expect(new Set(body)).toEqual(new Set([users[0].body, users[2].body]));
        })

        test("using stack", async () => {
            const users = await Promise.all([
                sendPostRequest({ apelido: "a", nome: "teste" + name, nascimento: "0000-02-01", stack: ["java"] }),
                sendPostRequest({ apelido: name, nome: name, nascimento: "0000-02-00", stack: [] }),
                sendPostRequest({ apelido: "b", nome: name + "teste", nascimento: "0000-02-01", stack: ["java"] })
            ]);

            const { body } = await StringMatchRequest("java");
            expect(new Set(body)).toEqual(new Set([users[0].body, users[2].body]));
        })
    })

    describe("other details", () => {
        test("should return 200 status code, respond []", async () => {
            await Promise.all([
                sendPostRequest({ apelido: "teste" + name, nome: name, nascimento: "0000-00-00", stack: [] }),
                sendPostRequest({ apelido: name, nome: name, nascimento: "0000-00-00", stack: [] }),
                sendPostRequest({ apelido: name + "teste", nome: name, nascimento: "0000-00-00", stack: [] })
            ]);

            const { body, status } = await StringMatchRequest("banana");
            expect(body).toEqual([]);
            expect(status).toBe(200);
        })
    })
})