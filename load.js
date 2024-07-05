import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Rate } from 'k6/metrics';

const failureRate = new Rate('failed_requests');

const pessoasPayloads = new SharedArray('pessoasPayloads', function() {
    return JSON.parse(open('./pessoas-payloads.json'));
});

const termosBusca = new SharedArray('termosBusca', function() {
    return (JSON.parse(open('./termos-busca.json'))).map(termo => {return termo.t});
});

const baseURL = 'http://localhost:9999';
const userAgent = 'Agente do Caos - 2023';

export let options = {
    scenarios: {
        criacaoEConsultaPessoas: {
            executor: 'ramping-arrival-rate',
            startRate: 2,
            timeUnit: '1s',
            preAllocatedVUs: 10,
            maxVUs: 600,
            stages: [
                { duration: '10s', target: 2 }, // warm up
                { duration: '15s', target: 5 }, // ready?
                { duration: '3m', target: 600 }, // lezzz go!!!
            ],
        },
        buscaPessoas: {
            executor: 'ramping-arrival-rate',
            startRate: 2,
            timeUnit: '1s',
            preAllocatedVUs: 10,
            maxVUs: 100,
            stages: [
                { duration: '25s', target: 2 }, // warm up
                { duration: '3m', target: 100 }, // lezzz go!!!
            ],
        },
        buscaInvalidaPessoas: {
            executor: 'ramping-arrival-rate',
            startRate: 2,
            timeUnit: '1s',
            preAllocatedVUs: 10,
            maxVUs: 40,
            stages: [
                { duration: '25s', target: 2 }, // warm up
                { duration: '3m', target: 40 }, // lezzz go!!!
            ],
        },
    },
};

export default function() {
    const payload = JSON.stringify(pessoasPayloads[Math.floor(Math.random() * pessoasPayloads.length)]);
    const termosBuscaValue = termosBusca[Math.floor(Math.random() * termosBusca.length)];
    let res;
    // Criação e consulta de pessoas
    // let res = http.post(`${baseURL}/api/pessoas`, payload, {
    //     headers: { 'Content-Type': 'application/json'},
    // });
    // console.log(res);
    // check(res, {
    //     'status is 201, 422, or 400': (r) => [201, 422, 400].includes(r.status),
    // });

    // failureRate.add(res.status !== 201 && res.status !== 422 && res.status !== 400);

    // if (res.status === 201) {
    //     const location = res.headers['Location'];
    //     if (location) {
    //         res = http.get(`${baseURL}${location}`, {
    //             headers: { 'User-Agent': userAgent },
    //         });
    //     }
    // }

    // // Busca válida de pessoas
    // // res = http.get(`${baseURL}/api/pessoas?t=${termosBuscaValue.t}`, {
    // //     headers: { 'User-Agent': userAgent },
    // // });

    // check(res, {
    //     'status is 2xx': (r) => r.status >= 200 && r.status < 300,
    // });

    // failureRate.add(res.status < 200 || res.status >= 300);

    // Busca inválida de pessoas
    res = http.get(`${baseURL}/api/pessoas`, {
        headers: { 'User-Agent': userAgent },
    });
    console.log(res);
    check(res, {
        'status is 400': (r) => r.status === 400,
    });

    failureRate.add(res.status !== 400);

    sleep(Math.random() * (0.03 - 0.001) + 0.001);
}