const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post('/pessoas',async (req, res) => {
    try{
        
        const birthRegex = /^\d{4}-\d{2}-\d{2}$/
        Object.keys(req.body).forEach(key => {
            //check if there are any parameters other than stack = null and throw the error
            if(req.body[key] == null && key != "stack"){
                throw {name:"PrismaNullError"};
            }
            //check if the stack is null to switch to []
            if(key == "stack" && req.body[key] == null){
                req.body.stack = [];
            }
            //check if birchday is in correct format
            if(key == "nascimento" && !(birthRegex).test(req.body[key]) && typeof req.body[key] == "string"){
                throw {name:"PrismaValidationError"}
            }
        })
        const search_vector = `${req.body.apelido}     ${req.body.nome}     ${req.body.nascimento}     ${req.body.stack.join("     ")}`;
        //creates a new user in the database
        const result = await prisma.pessoas.create({
            data: {...req.body, search_vector}
        });
        const userId = result.id;

        //return the status OK with location
        res.status(201);
        res.setHeader('location', '/pessoas/' + userId);
        res.json(result);
    }catch(err){
        if(err.name == "PrismaNullError"){
            //for null parameter
            res.status(422);
            res.json(err.name);
        }else if(err.name == "PrismaClientKnownRequestError"){
            //for unique constraint
            res.status(422);
            res.json(err.name);
        }else if(err.name == "PrismaClientValidationError"){
            //for wrong type parameter
            res.status(400);
            res.json(err);
        }else{
            //for other errors
            res.status(404);
            res.json(err);
        }
    }
})

router.get("/pessoas/:id", async (req, res) => {
    try{
        const user = await prisma.pessoas.findFirst({
            where:{
                id:req.params.id
            }
        });
        if(user == null){
            throw {name:"UserNotFound"}
        }
        res.status(200);
        res.json(user);
    }catch(err){
        res.status(404);
        res.json(err);
    }
})

router.get("/pessoas", async (req, res) => {
    const searchedString = req.query.t;
    try{
        const users = await prisma.pessoas.findMany({
            where:{
                search_vector:{contains:searchedString}
            },
            take: 50
        });
        const usersStack = (await prisma.pessoas.findMany()).filter((user) => {return user.stack.includes(searchedString)});

        res.status(200);
        res.json(users.concat(usersStack));

    }catch(err){
        console.log(err);
        res.json(err);
    }
})

router.get("/contagem-pessoas", async (req, res) => {
    const users = await prisma.pessoas.findMany();
    console.log(users);
    res.json(users.length);
})

module.exports = router;