import User from "@utils/users/types/user";

module.exports = async (userInfo:User) => {
    return await Pessoas.create({
        ...userInfo
    });
}