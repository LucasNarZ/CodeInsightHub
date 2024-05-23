import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
//teste
const app = express();

app.use(express.json());

const port = 3000;

app.get('/all', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
})

app.delete('/all', async (req, res) => {
    const users = await prisma.user.deleteMany();
    res.json(users);
})

app.post('/pessoas',async (req, res) => {
    try{
        const birthRegex = /^\d{4}-\d{2}-\d{2}$/
        Object.keys(req.body).forEach(key => {
            //check if there are any parameters other than stack = null and throw the error
            if(req.body[key] == null && key != "stack"){
                throw {name:"PrismaClientNullError"};
            }
            //check if the stack is null to switch to []
            if(key == "stack" && req.body[key] == null){
                req.body.stack = [];
            }
            //check if birchday is in correct format
            if(key == "nascimento" && !req.body[key].test(birthRegex)){
                throw {name:"PrismaClientValidationError"}
            }
        })
        res.status(201);
        //creates a new user in the database
        const result = await prisma.user.create({
            data: {...req.body}
        });
        const userId = result.id;

        //return the status OK with location
        
        res.setHeader('location', '/pessoas/'+userId);
        res.json(userId);
    }catch(err){
        //for repeated user name
        if(err.name == "PrismaClientKnownRequestError"){
            res.status(422);
            res.json(err);
        //for null parameter
        }else if(err.name == "PrismaClientNullError"){
            res.status(422);
            res.json(err);
        //for out of type parameter
        }else if(err.name == "PrismaClientValidationError"){
            res.status(400);
            res.json(err);
        }else{
            res.json(err);
        }

        
    }
})



app.listen(port, () => {
    console.log("Server is running at port", port);
});

export default app;