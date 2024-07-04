import Pessoas from "@models/Pessoas";

export default  async (id:string) => {
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
    