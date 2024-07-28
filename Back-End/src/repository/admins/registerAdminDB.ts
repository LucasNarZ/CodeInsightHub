import Admin from "@models/Admin"
import AdminType from "@utils/types/admin"

export default async (adminInfo:AdminType) => {
    return await Admin.create({...adminInfo});
}