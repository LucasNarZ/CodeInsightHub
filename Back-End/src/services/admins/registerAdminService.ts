import { registerDB } from "@repository/admins";
import Admin from "@models/Admin";
import { v4 } from "uuid";
import validateAdminCredentials from "@utils/validateAdminCredentials";

export default async (adminInfo:Admin) => {
    adminInfo.id = v4();
    validateAdminCredentials(adminInfo);
    return await registerDB(adminInfo);
}