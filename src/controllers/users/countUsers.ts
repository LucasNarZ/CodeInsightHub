const { countUsersService } = require("@services/users")


module.exports = async (req:ExpressRequest, res:ExpressResponse) => {
    try{
        const usersCount = await countUsersService();
        res.json(usersCount);
    }catch(err){
        console.error(err);
        res.status(500);
        res.json(err);
    }
    
}