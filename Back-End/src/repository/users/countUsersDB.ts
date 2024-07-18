import Pessoas from "@models/Pessoas"

export default async ():Promise<number> => {
    return await Pessoas.count();
}