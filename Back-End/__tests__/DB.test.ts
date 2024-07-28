import axios from "axios";


describe("Test DB", () => {
    test("should not return an error(Postgres)", async () => {
        const res = await axios.get("http://localhost:3000/contagem-pessoas");
        expect(res.data).toBeGreaterThanOrEqual(0);
    });
    test("should not return an error(Nginx)", async () => {
        const res = await axios.get("https://localhost/api/contagem-pessoas");
        expect(res.data).toBeGreaterThanOrEqual(0);
    });
})