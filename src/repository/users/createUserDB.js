const Pessoas = require("@models/Pessoas");

module.exports =  async (userInfo) => {
    return await Pessoas.create({
        ...userInfo
    });
}