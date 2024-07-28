import User from "@utils/types/user";
import Pessoas from "@models/Pessoas"

export default async (userInfo:User) => {
    return await Pessoas.create({
        ...userInfo
    });
}