import User from "@utils/users/types/user";

export default (credentials:User) => {
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
    const keys = Object.keys(credentials);
    keys.forEach((key:string) => {
        //check if there are any parameters other than stack = null and throw the error
        if(credentials[key] == null){
            throw "ParameterNullError";
        }
        if(typeof credentials[key] !== "string" && key != "stack"){
            throw "WrongParameterTypeError";
        }
        
        //check if birchday is in correct format
        if(key == "nascimento" && !(birthRegex).test(credentials[key]) && typeof credentials[key] == "string"){
            throw "WrongBirthFormatError";
        }
    });
}