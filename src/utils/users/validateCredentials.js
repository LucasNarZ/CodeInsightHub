module.exports = (credentials) => {
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/
    Object.keys(credentials).forEach(key => {
        //check if there are any parameters other than stack = null and throw the error
        if(credentials[key] == null && key != "stack"){
            throw {name:"SequelizeNullError"};
        }
        //check if the stack is null to switch to []
        if(key == "stack" && credentials[key] == null){
            credentials.stack = [];
        }
        //check if birchday is in correct format
        if(key == "nascimento" && !(birthRegex).test(credentials[key]) && typeof credentials[key] == "string"){
            throw {name:"SequelizeValidationError"}
        }
    });
    return credentials;
}