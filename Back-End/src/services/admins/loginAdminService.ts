import { loginAdminDB } from "@repository/admins";
import argon2 from "argon2";

export default async (email:string, password:string) => {
    const admin = (await loginAdminDB(email))?.dataValues;
    if(!admin){
        throw new Error("WrongEmailOrPassword");
    }
    if(!(await argon2.verify(admin.password, password))){
        throw new Error("WrongEmailOrPassword");
    }
    return admin;
}