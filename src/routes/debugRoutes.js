// const { PrismaClient } = require("@prisma/client")
// const prisma = new PrismaClient();
const Pessoas = require("../models/Pessoas");
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const users = await Pessoas.findAll();
        res.json(users);
    }catch(err){
        console.error(err);
    }
    
})

router.delete('/', async (req, res) => {
    const users = await Pessoas.destroy({
        truncate: true
    });
    res.json(users);
})

module.exports = router;