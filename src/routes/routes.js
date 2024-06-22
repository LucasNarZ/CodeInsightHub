const { createUser, findById, findByTerm, countUsers } = require("@controllers/users");
const test = require("@controllers/users")
const express = require("express");
const router = express.Router();
console.log(test.findById)
router.post('/pessoas', createUser);

router.get("/pessoas/:id", findById);

router.get("/pessoas", findByTerm);

router.get("/contagem-pessoas", countUsers);

module.exports = router;