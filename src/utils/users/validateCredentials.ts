import User from "@utils/users/types/user";

export default (credentials:User) => {
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/
    Object.keys(credentials).forEach((key:string ) => {
        //check if there are any parameters other than stack = null and throw the error
        if(credentials[key as keyof User] == null){
            throw {name:"ParameterNullError"};
        }
        
        if(typeof credentials[key as keyof User] !== "string" && key != "stack"){
            throw {name:"WrongParameterTypeError"};
        }
        
        //check if birchday is in correct format
        if(key == "nascimento" && !(birthRegex).test(credentials[key]) && typeof credentials[key] == "string"){
            throw {name:"WrongBirthFormatError"};
        }
    });
}