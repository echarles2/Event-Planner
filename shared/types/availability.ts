export type AvailabilityStatus = "available" | "unavailable";

export type AvailabilityEntry = {
    id: string;
    date: string;
    status: AvailabilityStatus;
};