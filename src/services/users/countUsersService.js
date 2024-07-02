const { countUsersDB } = require("@repository/users");

module.exports = async () => {
    const usersCount = await countUsersDB();
    return usersCount;
}