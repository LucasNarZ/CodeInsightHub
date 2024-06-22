const { findByIdDB } = require("@services/users")

module.exports = async (req, res) => {
    try{
        const id = req.body.id;
        const user = await findByIdDB(id);
        if(user == null){
            throw {name:"UserNotFound"}
        }
        res.status(200).json(user);
    }catch(err){
        res.status(404).json(err);
    }
};