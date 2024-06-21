// const { PrismaClient } = require("@prisma/client")
// const prisma = new PrismaClient();
const Pessoas = require("../models/Pessoas")
const express = require("express");
const router = express.Router();

router.post('/pessoas',async (req, res) => {
    try{
        
        const birthRegex = /^\d{4}-\d{2}-\d{2}$/
        Object.keys(req.body).forEach(key => {
            //check if there are any parameters other than stack = null and throw the error
            if(req.body[key] == null && key != "stack"){
                throw {name:"SequelizeNullError"};
            }
            //check if the stack is null to switch to []
            if(key == "stack" && req.body[key] == null){
                req.body.stack = [];
            }
            //check if birchday is in correct format
            if(key == "nascimento" && !(birthRegex).test(req.body[key]) && typeof req.body[key] == "string"){
                throw {name:"SequelizeValidationError"}
            }
        })
        //creates a new user in the database
        const result = await Pessoas.create({
            ...req.body
        });
        //return the status OK with location
        res.status(201).location(`/pessoas/${result.userId}`).json(result);
    }catch(err){
        if(err.name == "SequelizeNullError"){
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
        const user = await Pessoas.findOne({
            where:{
                id:req.params.id
            }
        });
        if(user == null){
            throw {name:"UserNotFound"}
        }
        res.status(200).json(user);
    }catch(err){
        res.status(404).json(err);
    }
})

router.get("/pessoas", async (req, res) => {
    const searchedString = req.query.t;
    try{
        const users = await Pessoas.findAll({
            where:{
                searchVector:{
                    [Op.like]: `%{${searchedString}}%`
                }
            },
            limit: 50
        });
        res.status(200).json(users);
    }catch(err){
        res.json(err);
    }
})

router.get("/contagem-pessoas", async (req, res) => {
    const usersCount = await Pessoas.count();
    res.json(usersCount);
})

module.exports = router;