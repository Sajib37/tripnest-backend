import { Event } from "./event.model";

const findLastId = async () => {
    const lastStudent = await Event
        .findOne(
        {},
            {
                eventCode: 1,
                _id: 0,
            }
        )
        .sort({ createdAt: -1 })
        .lean();

    return lastStudent ? lastStudent.eventCode.substring(4) : undefined;
};
export const generateEventCode = async () => {
    const currentId = (await findLastId()) || (0).toString();
    const incrementId = (Number(currentId) + 1).toString().padStart(6, "0");
    const eventCode= `EVT-${incrementId}`
    return eventCode;
};




