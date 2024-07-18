import { findByIdDB } from "@repository/users";

export default async (id:string) => {
    const user = await findByIdDB(id);
    if(user == null){
        throw {name:"UserNotFound"}
    }
    return user; 
}