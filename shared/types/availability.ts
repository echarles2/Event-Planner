export type AvailabilityStatus = "available" | "unavailable";

export type AvailabilityEntry = {
    id: string;
    day: number;
    status: AvailabilityStatus;
};