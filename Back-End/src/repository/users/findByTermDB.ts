import { Op } from "sequelize";
import { FindOptions } from "sequelize";
import Pessoas from "@models/Pessoas"

export default async (searchedString:string, limit:number|null=null) => {
    const options:FindOptions = {
        where:{
            searchvector:{
                [Op.like]: `%${searchedString}%`
            }
        }
    }
    if(limit !== null){
        options.limit = limit;
    }
    return await Pessoas.findAll(options);
}