const { findByTermDB } = require("@repository/users")

module.exports = async (searchedString) => {
    const users = await findByTermDB(searchedString, 50);
    return users;
}