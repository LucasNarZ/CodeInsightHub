import { createUserDB } from "@repository/users";
import validateCredentials from "@utils/validateSurveyUserCredentials";
import { v4 } from "uuid";
import User from "@utils/types/user";

export default async (user:User) => {
    user.id = v4();
    user.searchvector = `${user.apelido} ${user.nome} ${user?.stack?.join(" ") ?? ""}`;
    user.stack = user.stack || [];
    validateCredentials(user);
    
    //creates a new user in the database
    await createUserDB(user);
    return user;
}