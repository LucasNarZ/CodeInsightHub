const { findByIdService } = require("@services/users")

module.exports = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await findByIdService(id);
        res.status(200);
        res.json(user);
    }catch(err){
        res.status(404).json(err);
    }
};