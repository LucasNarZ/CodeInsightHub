import { findByTermDB } from "@repository/users";

export default async (searchedString:string) => {
    const users = await findByTermDB(searchedString, 50);
    return users;
}