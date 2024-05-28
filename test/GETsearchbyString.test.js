const request = require("supertest");
const { baseUrl, server } = require("../src/server");
const randomstring = require("randomstring");
// Função para enviar uma requisição POST com dados de pessoa e retornar a resposta
const sendPostRequest = async (data) => {
    return await request(baseUrl).post('/api/pessoas').send(data);
};

async function StringMatchRequest(string){
    return await request(baseUrl).get("/api/pessoas?t=" + string)
}

const name = randomstring.generate({ length: 12, charset: 'alphabetic' });


afterEach(async () => {
    await request(baseUrl).delete("/api/all");
    server.close()
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