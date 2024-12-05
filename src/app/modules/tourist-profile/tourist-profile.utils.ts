import { Profile } from "./tourist-profile.model";

/* eslint-disable @typescript-eslint/no-unused-vars */
const findLastId = async () => {
    const lastProfile = await Profile
        .findOne(
        {},
            {
                id: 1,
                _id: 0,
            }
        )
        .sort({ createdAt: -1 })
        .lean();

    return lastProfile ? lastProfile.id.substring(4) : undefined;
};

export const generateUID = async () => {
    const currentId = (await findLastId()) || (0).toString();
    const incrementId = (Number(currentId) + 1).toString().padStart(6, "0");
    const eventCode= `UID-${incrementId}`
    return eventCode;
};
