const { createUserDB } = require("@repository/users");
const validateCredentials = require("@utils/users/validateCredentials");
const { v4 } = require("uuid");

module.exports = async (req, res) => {
    try{
        const user = req.body;
        user.id = v4();
        user.searchVector = `${user.apelido} ${user.nome} ${user?.stack?.join(" ") ?? ""}`;
        if(user.stack == null){
            user.stack = [];
        }
        validateCredentials(user);
        
        //creates a new user in the database
        const result = await createUserDB(user);
        //return the status OK with location
        res.status(201).location(`/pessoas/${result.id}`).json(result);
    }catch(err){
        if(err.name == "ParameterNullError"){
            //for null parameter
            res.status(422);
            res.json(err.name);
        }else if(err.name == "SequelizeUniqueConstraintError"){
            //for unique constraint
            res.status(422);
            res.json(err.name);
        }else if(err.name == "WrongParameterTypeError"){
            //for wrong type parameter
            res.status(400);
            res.json(err.name);
        }else{
            //for other errors
            console.error(err);
            res.status(404);
            res.json(err);
        }
    }
}