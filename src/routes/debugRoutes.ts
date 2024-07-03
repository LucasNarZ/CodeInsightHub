import User from "@utils/users/types/user";
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req:Request, res:Response) => {
    try{
        const users:User[] = await Pessoas.findAll();
        res.json(users);
    }catch(err){
        console.error(err);
    }
    
})

router.delete('/', async (req:Request, res:Response) => {
    const users = await Pessoas.destroy({
        truncate: true
    });
    res.json(users);
})

module.exports = router;