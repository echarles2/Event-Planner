import type { AvailabilityEntry, AvailabilityStatus } from "../../../../shared/types/availability";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/availability`;

export class AvailabilityRepository {
    private getToken: () => Promise<string | null>;

    constructor(getToken: () => Promise<string | null>) {
        this.getToken = getToken;
    }

    private async buildAuthHeaders(includeJsonContentType = false): Promise<HeadersInit> {
        const token = await this.getToken();
        
        const headers: Record<string, string> = {};

        if (includeJsonContentType) {
            headers["Content-Type"] = "application/json";
        }

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        return headers;
    }

    async getAll(): Promise<AvailabilityEntry[]> {
        const response = await fetch(BASE_URL, {
            headers: await this.buildAuthHeaders()
        });

        if (!response.ok) {
            throw new Error("Failed to fetch availability.");
        }
        return response.json();
    }

    async saveDayStatus(date: string, status: AvailabilityStatus): Promise<AvailabilityEntry> {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: await this.buildAuthHeaders(true),
            body: JSON.stringify({ date, status })
        });

        if (!response.ok) {
            throw new Error("Failed to save availability.");
        }

        return response.json();
    }

    async deleteByDate(date: string): Promise<void> {
        const response = await fetch(`${BASE_URL}/${date}`, {
            method: "DELETE",
            headers: await this.buildAuthHeaders()
        });

        if (!response.ok) {
            throw new Error("Failed to delete availability.");
        }
    }
}