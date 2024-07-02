const { createUserDB } = require("@repository/users");
const validateCredentials = require("@utils/users/validateCredentials");
const { v4 } = require("uuid");

module.exports = async (user) => {
    user.id = v4();
    user.searchVector = `${user.apelido} ${user.nome} ${user?.stack?.join(" ") ?? ""}`;
    if(user.stack == null){
        user.stack = [];
    }
    validateCredentials(user);
    
    //creates a new user in the database
    const result = await createUserDB(user);
    return result;
}