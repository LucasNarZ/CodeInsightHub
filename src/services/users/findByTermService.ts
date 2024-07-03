const { findByTermDB } = require("@repository/users")

module.exports = async (searchedString:string) => {
    const users = await findByTermDB(searchedString, 50);
    return users;
}