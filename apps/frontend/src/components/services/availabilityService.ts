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

    async saveDayStatus(date: string, status: AvailabilityStatus): Promise<SaveAvailabilityResult> {
        if (!date) {
            return { success: false, error: "Please select a valid date." };
        }


        if (status !== "available" && status !== "unavailable") {
            return { success: false, error: "Please choose Available or Unavailable." };
        }

        await this.repo.saveDayStatus(date, status);
        return { success: true };
    }

    async removeDay(date: string): Promise<void> {
        await this.repo.deleteByDate(date);
    }
}