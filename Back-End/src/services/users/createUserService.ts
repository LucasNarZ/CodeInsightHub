import { createUserDB } from "@repository/users";
import validateCredentials from "@utils/users/validateCredentials";
import { v4 } from "uuid";
import User from "@utils/users/types/user";

export default async (user:User) => {
    user.id = v4();
    user.searchvector = `${user.apelido} ${user.nome} ${user?.stack?.join(" ") ?? ""}`;
    user.stack = user.stack || [];
    validateCredentials(user);
    
    //creates a new user in the database
    const result = await createUserDB(user);
    return result;
}