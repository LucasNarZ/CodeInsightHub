const { createUser, findById, findByTerm, countUsers } = require("@controllers/users");
const express = require("express");
const router = express.Router();

router.post('/pessoas', createUser);

router.get("/pessoas/:id", findById);

router.get("/pessoas", findByTerm);

router.get("/contagem-pessoas", countUsers);

module.exports = router;