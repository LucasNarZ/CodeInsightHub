import { createUserService } from "@services/users";

import createSession from "@utils/users/createSession";


export default async (req:ExpressRequest, res:ExpressResponse) => {
    try{
        const user = req.body;
        const result = await createUserService(user);
        await createSession(req, user.id);

        //return the status OK with location
        res.status(201).location(`/pessoas/${result.id}`).json(result);
    }catch(err){
        if(err == "ParameterNullError"){
            //for null parameter
            res.status(422);
            res.json(err);
        }else if(err == "SequelizeUniqueConstraintError"){
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