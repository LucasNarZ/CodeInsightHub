import User from "@utils/types/user";
import Pessoa from "@models/Pessoas";
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req:Request, res:Response) => {
    try{
        const users:User[] = await Pessoa.findAll() as unknown as User[];
        res.json(users);
    }catch(err){
        console.error(err);
    }
    
})



export default router;