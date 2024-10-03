import cron from "node-cron";
import { Event } from "../modules/event/event.model";

export const statusUpdateSchedule = () => {
    cron.schedule("* * * * *", async () => {
        const currentDate = new Date();
        await Event.updateMany({ status: { $in: ["upcoming", "on-going"] } }, [
            {
                $set: {
                    status: {
                        $cond: [
                            {
                                $and: [
                                    { $lt: [currentDate, "$startDate"] },
                                    { $ne: ["$status", "upcoming"] },
                                ],
                            },
                            "upcoming",

                            {
                                $cond: [
                                    {
                                        $and: [
                                            {
                                                $gt: [currentDate, "$endDate"],
                                            },
                                            {
                                                $ne: ["$status", "completed"],
                                            },
                                        ],
                                    },
                                    "completed",

                                    {
                                        $cond: [
                                            {
                                                $ne: ["$status", "on-going"],
                                            },
                                            "on-going",
                                            "$status",
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                },
            },
        ]);
        
    });
};
