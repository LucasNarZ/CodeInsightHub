import Admin from "./types/admin";
export default (adminInfo:Admin) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z].com/;
    if(Object.values(adminInfo).some(value => value === null )){
        throw "ParameterNullError";
    }
    if(Object.values(adminInfo).some(value => typeof value != "string" )){
        throw "WrongParameterTypeError";
    }
    if(emailRegex.test(adminInfo.email)){
        throw "WrongEmailFormatError"
    }
};