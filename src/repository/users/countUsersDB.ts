import Pessoas from "@models/Pessoas"

export default async ():Promise<Number> => {
    return await Pessoas.count();
}