import { createUser, findById, findByTerm, countUsers } from "@controllers/users";
import verifySession from "@utils/users/middlewares/verifySession";
import { Router }  from "express";
const router = Router();

router.post('/pessoas', createUser);

router.get("/pessoas/:id", verifySession, findById);

router.get("/pessoas", verifySession, findByTerm);

router.get("/contagem-pessoas", verifySession, countUsers);

export default router;