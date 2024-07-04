import { createUser, findById, findByTerm, countUsers } from "@controllers/users";
import { Router }  from "express";
const router = Router();

router.post('/pessoas', createUser);

router.get("/pessoas/:id", findById);

router.get("/pessoas", findByTerm);

router.get("/contagem-pessoas", countUsers);

export default router;