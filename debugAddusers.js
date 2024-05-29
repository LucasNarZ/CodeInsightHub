const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const { server } = require("./src/server");
const agent = require("supertest").agent(server);

const sendPostRequest = async (data) => {
    return await agent.post('/api/pessoas').send(data);
}

const randomstring = require("randomstring");
const name = randomstring.generate({ length: 12, charset: 'alphabetic' });
const personModel = {
    apelido: name,
    nome: name,
    nascimento: "0000-00-00",
    stack: ["java", "python"]
};
async function criarIndice() {
  try {
    await Promise.all((new Array(2663).fill(personModel)).map(async (user) => {
        user.apelido = randomstring.generate({ length: 12, charset: 'alphabetic' }); 
        return await sendPostRequest(user);
    }));
  } catch (erro) {
    console.error('Erro ao criar índice:', erro);
  } finally {
    await prisma.$disconnect();
  }
}

criarIndice();