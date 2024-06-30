const { findByIdService } = require("@services/users");
const { findByIdDB } = require("@repository/users");

jest.mock("@repository/users");

findByIdDB.mockImplementationOnce(() => {
    return {
        id:"2CA263F1-5C94-11E0-84CC-002170FBAC5B",
        apelido:"luc",
        nome:"lucas",
        stack:["python", "JS"]
    };
}).mockImplementationOnce(() => {
    return null;
})

const personModel = {
    id:"2CA263F1-5C94-11E0-84CC-002170FBAC5B",
    apelido:"luc",
    nome:"lucas",
    stack:["python", "JS"]
}


describe('GET /pessoas/[:id]', () => {
    describe('valid search', () => {
        test('should respond with status code 200 OK and person data', async () => {
            const user =  await findByIdService("2CA263F1-5C94-11E0-84CC-002170FBAC5B");
            expect( user ).toMatchObject(personModel);
        });

    });

    describe('invalid search', () => {
        test('should respond status 404', async () => {
            await expect(findByIdService("2CA263F1-5C94-11E0-84CC-002170FBAC5B")).rejects.toThrow("UserNotFound");
        })
    })
});