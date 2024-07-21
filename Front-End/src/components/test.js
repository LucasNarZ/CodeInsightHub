import axios from "axios";

const pessoa = {
    apelido:"Lusc",
    nome:"Lucas",
    nascimento:"1234-21-12",
    stack:[]
};

(async () => {
    const res = await axios.post("http:///localhost:3000/api/pessoas", pessoa);
    console.log(res);
})()