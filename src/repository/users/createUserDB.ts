import User from "@utils/users/types/user";
import Pessoas from "@models/Pessoas"

export default async (userInfo:User) => {
    return await Pessoas.create({
        ...userInfo
    });
}