import http from "k6/http";
import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from "k6";

const users = [];
for(let i=0;i < 50000;i++){
    users[i] = { apelido: randomString(8), nome: "asdad", nascimento: "0000-00-00", stack: [] }
}
const options = {
    stages: [
        {duration: "5s", target: 10},
        {duration: "15s", target: 15},
        {duration: "30s", target: 20},
        {duration: "15s", target: 15},
        {duration: "5s", target: 10},

    ]
}
export {options};

export default () => {
    let random = randomIntBetween(0, 50000)
    const res = http.post("http://localhost:9999/api/pessoas", JSON.stringify(users[random]), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    console.log(res);
    check(res, {"201": (r) => r.status === 201})
    users.splice(random, 1);
};