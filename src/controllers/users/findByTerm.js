const findByTerm = require("@services/users")

module.exports = async (req, res) => {
    const searchedString = req.query.t;
    try{
        const users = findByTerm(searchedString, 50);
        res.status(200).json(users);
    }catch(err){
        res.json(err);
    }
}