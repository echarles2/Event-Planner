import type { AvailabilityStatus } from "../../../../../shared/types/availability";
import { AvailabilityRepository } from "../../apis/availabilityRepo";

export interface SaveAvailabilityResult {
    success: boolean;
    error?: string;
}

export class AvailabilityService {
    private repo: AvailabilityRepository;

    constructor(repo: AvailabilityRepository) {
        this.repo = repo;
    }

    async saveDayStatus(day: number, status: AvailabilityStatus): Promise<SaveAvailabilityResult> {
        if (!Number.isInteger(day) || day < 1 || day > 31) {
            return { success: false, error: "Please enter a valid day number between 1 and 31." };
    }

        if (status !== "available" && status !== "unavailable") {
            return { success: false, error: "Please choose Available or Unavailable." };
        }

        await this.repo.upsertByDay(day, status);
        return { success: true };
    }

    async removeDay(day: number): Promise<void> {
        await this.repo.deleteByDay(day);
    }
}