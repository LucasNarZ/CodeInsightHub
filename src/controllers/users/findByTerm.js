const { findByTermDB } = require("@repository/users")

module.exports = async (req, res) => {
    const searchedString = req.query.t;
    try{
        const users = await findByTermDB(searchedString, 50);
        res.status(200).json(users);
    }catch(err){
        console.log(err)
        res.json(err);
    }
}