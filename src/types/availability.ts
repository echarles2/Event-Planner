export type AvailabilityStatus = "available" | "unavailable";

export type AvailabilityEntry = {
  day: number;
  status: AvailabilityStatus;
};