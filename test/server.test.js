
const request = require("supertest");
//import request from 'supertest';
const app = require("../src/server.js");
//import app from '../src/server.js'
const randomstring = require("randomstring");
//import randomstring from 'randomstring';




describe('POST /pessoas', () => {

    describe('valid person', () => {
        
        test('should respond 201 OK status code', async () => {
            const response = await request(app).post('/pessoas').send({
                apelido: "a",
                nome: randomstring.generate({length:12,charset:'alphabetic'}),
                nascimento: "0000-00-00",
                stack:[]
            });
            expect(response.status).toBe(201);
        });

        
        test('should respond with a header location with /pessoas/(added person id)', () => {

        });
        
        test('shound respond with a body with the new added person', () => {

        });

    });

    describe('invalid person', () => {
        
        test('should respond 422 status code', () => {

        });
        
        test('should respond 422 status code', () => {

        });
        
        test('should respond 400 status code', () => {

        });
    });

});