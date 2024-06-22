const Pessoas = require("@models/Pessoas")

module.exports = async (searchedString, limit=null) => {
    let options = {
        where:{
            searchVector:{
                [Op.like]: `%${searchedString}%`
            }
        }
    }
    if(limit !== null){
        options.limit = limit;
    }
    return await Pessoas.findAll(options);
}