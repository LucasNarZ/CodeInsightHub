import { createUserService } from "@services/users";

export default async (req:ExpressRequest, res:ExpressResponse) => {
    try{
        const user = req.body;
        const result = await createUserService(user);
        req.session.save(() => {
            req.session.userId = result.id;
        });
        //return the status OK with location
        res.status(201).location(`/pessoas/${result.id}`).json(result);
    }catch(err){
        if(err == "ParameterNullError"){
            //for null parameter
            res.status(422);
            res.json(err);
        }else if(JSON.stringify(err) == JSON.stringify({name:"SequelizeUniqueConstraintError"})){
            //for unique constraint
            res.status(422);
            res.json(err);
        }else if(err == "WrongParameterTypeError" || err == "WrongBirthFormatError"){
            //for wrong type parameter
            res.status(400);
            res.json(err);
        }else{
            //for other errors
            console.error(err);
            res.status(500);
            res.json(err);
        }
    }
}