const mockfindByIdDB  = require("@services/users/findByIdDB");
const Pessoas = require("@models/Pessoas")

// Mock manual do modelo User
const mockFindByIdDB = jest.fn();

// Substituir o método findByPk com o mock
Pessoas.findByIdDB = mockFindByIdDB;

const personModel = {
    id:"2CA263F1-5C94-11E0-84CC-002170FBAC5B",
    apelido:"luc",
    nome:"lucas",
    stack:["python", "JS"]
}
beforeEach(() => {
    // Limpar mocks antes de cada teste
    mockFindByIdDB.mockReset();
});
describe('GET /pessoas/[:id]', () => {
    describe('valid search', () => {
        test('should respond with status code 200 OK and person data', async () => {
            mockFindByIdDB.mockResolvedValue(personModel);
            const {body, status} = await findByIdDB("2CA263F1-5C94-11E0-84CC-002170FBAC5B");
            expect( status ).toBe(200);
            expect(body).toMatchObject(personModel);
        });

    });

    // describe('invalid search', () => {
    //     test('should respond status 404', async () => {
    //         const {status} = await sendGetByIdRequest("5cc226ae-ea08-4b2f-b848-e984069a0");
    //         expect(status).toBe(404);
    //     })
    // })
});