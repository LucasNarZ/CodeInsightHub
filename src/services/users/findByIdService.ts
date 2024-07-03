const { findByIdDB } = require("@repository/users");

module.exports = async (id:string) => {
    const user = await findByIdDB(id);
    if(user == null){
        throw {name:"UserNotFound"}
    }
    return user; 
}