import { registerDB } from "@repository/admins";
import Admin from "@models/Admin";
import { v4 } from "uuid";
import argon2 from "argon2";
import validateAdminCredentials from "@utils/validateAdminCredentials";

export default async (adminInfo:Admin) => {
    adminInfo.id = v4();
    validateAdminCredentials(adminInfo);
    adminInfo.password = await argon2.hash(adminInfo.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 2,
        hashLength: 128,
    });
    return await registerDB(adminInfo);
}