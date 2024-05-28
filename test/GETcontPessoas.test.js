const request = require("supertest");
const { app, server } = require("../src/server");
const randomstring = require("randomstring");
// Função para enviar uma requisição POST com dados de pessoa e retornar a resposta
const sendPostRequest = async (data) => {
    return await request(app).post('/api/pessoas').send(data);
}

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

describe("/contagem pessoas", () => {
    test("should respon with the number of people registered", async () => {
        const realNumberUsers = (await Promise.all((new Array(10).fill(personModel)).map(async (user) => {
            user.apelido = randomstring.generate({ length: 12, charset: 'alphabetic' }); 
            return await sendPostRequest(user);
        }))).length;

        const numberPeople = await request(app).get("/api/contagem-pessoas");

        expect(numberPeople.body).toBe(realNumberUsers);

    })
})