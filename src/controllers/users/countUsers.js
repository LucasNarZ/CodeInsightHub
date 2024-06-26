const { countUsersDB } = require("@services/users");

module.exports = async (req, res) => {
    const usersCount = await countUsersDB();
    res.json(usersCount);
}