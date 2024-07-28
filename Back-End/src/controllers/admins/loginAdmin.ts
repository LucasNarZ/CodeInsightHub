import { loginAdminService } from "@services/admins";

export default async (req:ExpressRequest, res:ExpressResponse) => {
    try{
        const { email, password } = req.body;
        const { id } = await loginAdminService(email, password);
        req.session.userId = id;
        res.status(200).json({message:"Sucefully Logedin"})
        
    }catch(err){
        if(err instanceof Error && err.message === "WrongEmailOrPassword"){
            res.status(401).json({message:"Wrong Email or Password"});
        }else{
            res.status(500).json({message:"Server Error"});
        }
    }
}