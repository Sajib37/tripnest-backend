import { TUserRole, USER_ROLE } from "./users.constant";
import { User } from "./users.model";

const findLastId = async (role: TUserRole) => {
    const lastStudent = await User
        .findOne(
            { role},
            {
                id: 1,
                _id: 0,
            }
        )
        .sort({ createdAt: -1 })
        .lean();

    return lastStudent ? lastStudent.id.substring(2) : undefined;
};
export const generateId = async (role: TUserRole) => {
    const currentId = (await findLastId(role)) || (0).toString();
    const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    const id= role===USER_ROLE.admin?`A-${incrementId}`:`U-${incrementId}`
    return id;
};


