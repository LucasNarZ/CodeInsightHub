import { countUsersDB }  from "@repository/users";

export default async () => {
    const usersCount = await countUsersDB();
    return usersCount;
}