import { registerAdminService } from "@services/admins"

export default async (req:ExpressRequest, res:ExpressResponse) => {
    try{
        const adminInfo = req.body;
        await registerAdminService(adminInfo);
        req.session.userId = adminInfo.id;
        res.status(201).location(`/register/${adminInfo.id}`).json(adminInfo)
    }catch(err){
        if(err == "ParameterNullError"){
            //for null parameter
            res.status(422).json(err);
        }else if(JSON.stringify(err) == JSON.stringify({name:"SequelizeUniqueConstraintError"})){
            //for unique constraint
            res.status(422).json("Admin already registered");
        }else if(err == "WrongParameterTypeError" || err == "WrongEmailFormatError"){
            //for wrong type parameter
            res.status(400).json(err);
        }else{
            //for other errors
            console.error(err);
            res.status(500).json(err);
        }
    }
    


}