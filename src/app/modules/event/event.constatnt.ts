export type TEventStatus = "completed" | "on-going"|"upcoming";
export type TEventCategory = "Economic" | "Standard" | "Premium";
export type TActivities = {
    day: string,
    activities: string[]
}
export const Event_status = ["completed", "on-going", "upcoming"];
export const Event_Category=["Economic" , "Standard" , "Premium"]