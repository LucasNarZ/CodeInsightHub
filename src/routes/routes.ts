const { createUser, findById, findByTerm, countUsers } = require("@controllers/users");
import express from "express";
const router = express.Router();

router.post('/pessoas', createUser);

router.get("/pessoas/:id", findById);

router.get("/pessoas", findByTerm);

router.get("/contagem-pessoas", countUsers);

module.exports = router;