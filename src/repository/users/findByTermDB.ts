const { Op } = require("sequelize");
import { FindOptions } from "sequelize";

module.exports = async (searchedString:string, limit=null) => {
    let options:FindOptions = {
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