import { findByTermService } from "@services/users";

export default async (req:ExpressRequest, res:ExpressResponse) => {
    try{
        const searchedString:string = req.query.t as string;
        
        if(searchedString === NaN){
            throw {name:"BadRequest"}
        }
        const users = await findByTermService(searchedString);
        res.status(200).json(searchedString);
    }catch(err){
        console.log(err);
        res.status(400);
        res.json(err);
    }
}