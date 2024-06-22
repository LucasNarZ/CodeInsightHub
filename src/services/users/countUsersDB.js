const Pessoas = require("@models/Pessoas");

module.exports = async () => {
    return await Pessoas.count();
}