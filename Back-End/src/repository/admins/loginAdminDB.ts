import Admin from "@models/Admin";

export default async (email:string) => {
    return await Admin.findOne({
        where:{
            email
        }
    });
}