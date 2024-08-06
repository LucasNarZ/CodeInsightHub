import { createUser, findById, findByTerm, countUsers } from "@controllers/users";
import { registerAdmin, loginAdmin } from "@controllers/admins";
import verifySession from "@utils/middlewares/verifySession";
import { Router }  from "express";

const router = Router();

router.post('/pessoas', createUser);

router.get("/pessoas/:id", verifySession, findById);

router.get("/pessoas", verifySession, findByTerm);

router.get("/contagem-pessoas", countUsers);

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

export default router;