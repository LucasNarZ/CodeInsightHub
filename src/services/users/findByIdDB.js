const Pessoas = require("@models/Pessoas");

module.exports = async (id) => {
    return await Pessoas.findOne({
        where:{
            id
        }
    });
}