import type { AvailabilityEntry, AvailabilityStatus } from "../../../../shared/types/availability";
import { availabilityTestData } from "./availabilityData";

let data: AvailabilityEntry[] = [...availabilityTestData];

export class AvailabilityRepository {
    async getAll(): Promise<AvailabilityEntry[]> {
        return [...data];
    }

    async getById(id: string): Promise<AvailabilityEntry | undefined> {
        return data.find(entry => entry.id === id);
    }

    async create(entry: AvailabilityEntry): Promise<AvailabilityEntry> {
        data = [...data, entry];
        return entry;
    }

    async update(
        id: string,
        patch: Partial<Pick<AvailabilityEntry, "day" | "status">>
    ): Promise<AvailabilityEntry | undefined> {
        const index = data.findIndex(entry => entry.id === id);
        if (index === -1) return undefined;
    
        const updated: AvailabilityEntry = { ...data[index], ...patch };
        const copy = [...data];
        copy[index] = updated;
        data = copy;
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        const before = data.length;
        data = data.filter(entry => entry.id !== id);
        return data.length !== before;
    }

    async upsertByDay(day: number, status: AvailabilityStatus): Promise<AvailabilityEntry> {
        const existing = data.find((e) => e.day === day);
        if (existing) {
            const updated = await this.update(existing.id, { status });
            return updated as AvailabilityEntry;
        }

        const newEntry: AvailabilityEntry = {
            id: crypto.randomUUID(),
            day,
            status,
        };
        return this.create(newEntry);
    }

    async deleteByDay(day: number): Promise<boolean> {
        const existing = data.find((e) => e.day === day);
        if (!existing) return false;
        return this.delete(existing.id);
    }
}
