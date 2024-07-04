import { findByTermService } from "@services/users";

export default async (req:ExpressRequest, res:ExpressResponse) => {
    try{
        const searchedString:string = req.query.t as string;
        const users = await findByTermService(searchedString);
        res.status(200).json(users);
    }catch(err){
        console.log(err);
        res.status(500);
        res.json(err);
    }
}