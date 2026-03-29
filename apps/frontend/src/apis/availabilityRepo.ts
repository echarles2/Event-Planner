import type { AvailabilityEntry, AvailabilityStatus } from "../../../../shared/types/availability";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/availability`;

export class AvailabilityRepository {
    async getAll(): Promise<AvailabilityEntry[]> {
        const response = await fetch(BASE_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch availability.");
        }

        return response.json();
    }

    async saveDayStatus(date: string, status: AvailabilityStatus): Promise<AvailabilityEntry> {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ date, status })
        });

        if (!response.ok) {
            throw new Error("Failed to save availability.");
        }

        return response.json();
    }

    async deleteByDate(date: string): Promise<void> {
        const response = await fetch(`${BASE_URL}/${date}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete availability.");
        }
    }
}