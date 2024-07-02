const { findByTermService } = require("@services/users")

module.exports = async (req, res) => {
    try{
        const searchedString = req.query.t;
        const users = await findByTermService(searchedString);
        res.status(200).json(users);
    }catch(err){
        console.log(err);
        res.status(500);
        res.json(err);
    }
}