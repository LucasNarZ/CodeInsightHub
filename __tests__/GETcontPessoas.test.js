const { server } = require("@root/server");
const agent = require("supertest").agent(server);
const { sequelize } = require("@root/db.js");
const Pessoas = require("@models/Pessoas");


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

beforeAll(async () => {
    await sequelize.sync({ force: true });
});
  
afterAll(async () => {
    await sequelize.close();
});

afterEach(async () => {
    await agent.delete("/api/all");
    server.close();
});

describe("/contagem pessoas", () => {
    test("should respon with the number of people registered", async () => {
        const realNumberUsers = (await Promise.all((new Array(10).fill(personModel)).map(async (user) => {
            user.apelido = randomstring.generate({ length: 12, charset: 'alphabetic' }); 
            return await sendPostRequest(user);
        }))).length;

        const numberPeople = await agent.get("/api/contagem-pessoas");

        expect(numberPeople.body).toBe(realNumberUsers);

    })
})