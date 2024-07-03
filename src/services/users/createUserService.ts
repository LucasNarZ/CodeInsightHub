const { createUserDB } = require("@repository/users");
const validateCredentials = require("@utils/users/validateCredentials");
const { v4 } = require("uuid");
import User from "@utils/users/types/user";

module.exports = async (user:User) => {
    user.id = v4();
    user.searchVector = `${user.apelido} ${user.nome} ${user?.stack?.join(" ") ?? ""}`;
    user.stack = user.stack || [];
    validateCredentials(user);
    
    //creates a new user in the database
    const result = await createUserDB(user);
    return result;
}