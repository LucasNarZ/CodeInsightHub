const { countUsersDB } = require("@repository/users");

module.exports = async (req, res) => {
    const usersCount = await countUsersDB();
    res.json(usersCount);
}