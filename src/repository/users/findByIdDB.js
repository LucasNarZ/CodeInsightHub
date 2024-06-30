const Pessoas = require("@models/Pessoas");

module.exports = async (id) => {
    try{
        return await Pessoas.findOne({
            where:{
                id
            }
        });
    }catch(err){
        console.error(err);
    }
    
}
    