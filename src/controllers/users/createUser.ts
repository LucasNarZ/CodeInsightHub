import { createUserService } from "@services/users";

import { v4 } from "uuid";
import redisSessionClient from "../../../redis-sessions";
import createSession from "@utils/users/createSession";


export default async (req:ExpressRequest, res:ExpressResponse) => {
    try{
        const user = req.body;
        const result = await createUserService(user);
        await createSession(req, user.id);

        //return the status OK with location
        res.status(201).location(`/pessoas/${result.id}`).json(result);
    }catch(err:any){
        if(err.name == "ParameterNullError"){
            //for null parameter
            res.status(422);
            res.json(err.name);
        }else if(err.name == "SequelizeUniqueConstraintError"){
            //for unique constraint
            res.status(422);
            res.json(err.name);
        }else if(err.name == "WrongParameterTypeError" || err.name == "WrongBirthFormatError"){
            //for wrong type parameter
            res.status(400);
            res.json(err.name);
        }else{
            //for other errors
            console.error(err);
            res.status(500);
            res.json(err);
        }
    }
}