const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.get('/all', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
})

router.delete('/all', async (req, res) => {
    const users = await prisma.user.deleteMany();
    res.json(users);
})

module.exports = router;