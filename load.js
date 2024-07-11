import http from "k6/http";
import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check, sleep } from "k6";
import { SharedArray } from 'k6/data';

// Criando um array de 50000 usuários
const users = new SharedArray("Users", function() {
    let users = [];
    for (let i = 0; i < 150000; i++) {
        users[i] = { apelido: randomString(8), nome: "asdad", nascimento: "0000-00-00", stack: [] };
    }
    return users;
});

const terms = new SharedArray("terms", function() {
    let terms = [];
    for (let i = 0; i < 150000; i++) {
        terms[i] = randomString(8);
    }
    return terms;
})

const options = {
    scenarios: {
        criacaoEConsultaPessoas: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 1000,
            stages: [
                { duration: '10s', target: 20 }, // warm up
                { duration: '15s', target: 50 }, // ready?
                { duration: '1m', target: 600 }, // lezzz go!!!
            ],
        },
        buscaPessoas: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 100,
            stages: [
                { duration: '25s', target: 2 }, // warm up
                { duration: '1m', target: 100 }, // lezzz go!!!
            ],
        }
    }
};
export { options };

export default function () {
    let user = users[randomIntBetween(0, 150000)];
    let term = terms[randomIntBetween(0, 150000)];

    let res = http.post("http://localhost:9999/api/pessoas", JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    check(res, {
        "status is 201 or 422": (r) => [201, 422].includes(r.status)
    });

    res = http.get("http://localhost:9999/api/pessoas?t=" + term);
    check(res, {
        "status is 200": (r) => r.status === 200
    });
    sleep(randomIntBetween(1, 10) / 100)
};
