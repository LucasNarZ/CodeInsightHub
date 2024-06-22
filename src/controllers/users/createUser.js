const { addUsers } = require("@services/users");
const validateCredentials = require("@utils/users/validateCredentials");


module.exports = async (req, res) => {
    try{
        const user = validateCredentials(req.body);
        
        //creates a new user in the database
        const result = await addUsers(user);
        //return the status OK with location
        res.status(201).location(`/pessoas/${result.userId}`).json(result);
    }catch(err){
        if(err.name == "SequelizeNullError"){
            //for null parameter
            res.status(422);
            res.json(err.name);
        }else if(err.name == "PrismaClientKnownRequestError"){
            //for unique constraint
            res.status(422);
            res.json(err.name);
        }else if(err.name == "PrismaClientValidationError"){
            //for wrong type parameter
            res.status(400);
            res.json(err);
        }else{
            //for other errors
            res.status(404);
            res.json(err);
        }
    }
}