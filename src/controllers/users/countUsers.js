const countUsers = require("@services/users");

module.exports = async (req, res) => {
    const usersCount = await countUsers();
    res.json(usersCount);
}