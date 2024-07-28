import axios from 'axios';
import https from 'https';
import fs from 'fs';
import path from 'path';

const mkcertRootCA = path.resolve(
  process.env.HOME, 
  'Library/Application Support/mkcert/rootCA.pem'
);
const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
      ca: fs.readFileSync(mkcertRootCA)
    })
});

describe("Test DB", () => {
    test("should not return an error(Postgres)", async () => {
        const res = await axios.get("http://localhost:3000/contagem-pessoas");
        expect(res.data).toBeGreaterThanOrEqual(0);
    });
    test("should not return an error(Nginx)", async () => {
        const res = await axiosInstance.get("https://localhost/api/contagem-pessoas");
        expect(res.data).toBeGreaterThanOrEqual(0);
    });
})