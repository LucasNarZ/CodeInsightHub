const { server } = require("../src/server");
const agent = require("supertest").agent(server);

const randomstring = require("randomstring");
// Função para enviar uma requisição POST com dados de pessoa e retornar a resposta
const sendPostRequest = async (data) => {
    return await agent.post('/api/pessoas').send(data);
};

async function StringMatchRequest(string){
    return await agent.get("/api/pessoas?t=" + string)
}

const name = randomstring.generate({ length: 12, charset: 'alphabetic' });


afterEach(async () => {
    await agent.delete("/api/all");
    server.close();
});

describe("GET /pessoas?t=[:termo da busca]", () => {
    describe("should respond with all matchs", () => {
        test("using dados", async () => {
            const users = await Promise.all([
                sendPostRequest({ apelido: "teste" + name, nome: name, nascimento: "0000-00-00", stack: [] }),
                sendPostRequest({ apelido: name, nome: name, nascimento: "0000-00-00", stack: [] }),
                sendPostRequest({ apelido: name + "teste", nome: name, nascimento: "0000-00-00", stack: [] })
            ]);

            const { body } = await StringMatchRequest("teste");
            expect(new Set(body)).toEqual(new Set([users[2].body, users[0].body]));

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