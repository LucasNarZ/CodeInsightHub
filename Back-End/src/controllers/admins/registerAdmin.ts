import { registerAdminService } from "@services/admins"
import createSession from "@utils/createSession";

export default async (req:ExpressRequest, res:ExpressResponse) => {
    try{
        const adminInfo = req.body;
        await registerAdminService(adminInfo);
        createSession(req, adminInfo.id);
        res.status(201).location(`/register/${adminInfo.id}`).json(adminInfo)
    }catch(err){
        if(err == "ParameterNullError" || err == "WrongParameterTypeError" || err == "WrongEmailFormatError"){
            //for null parameter
            res.status(400).json(err);
        }else if(JSON.stringify(err) == JSON.stringify({name:"SequelizeUniqueConstraintError"})){
            //for unique constraint
            res.status(422).json("Admin already registered");
        }else{
            //for other errors
            console.error(err);
            res.status(500).json(err);
        }
    }
    


}