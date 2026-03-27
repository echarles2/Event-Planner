import { NextFunction, Request, Response } from "express";
import { getAllAvailability, saveAvailability, deleteAvailabilityByDate } from "../services/availabilityService";


export const fetchAvailability = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const availability = await getAllAvailability();
        res.status(200).json(availability);
    } catch (error) {
        next(error);
    }
};

export const createOrUpdateAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { date, status } = req.body;
        const normalizedDate = new Date(`${date}T00:00:00.000Z`);
        if (isNaN(normalizedDate.getTime())) {
            res.status(400).json({ error: "Invalid date value." });
            return;
        }
        const availability = await saveAvailability(normalizedDate, status);
        res.status(200).json(availability);
    } catch (error) {
        next(error);
    }
};

export const deleteAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const rawDate = req.params.date;

        if (Array.isArray(rawDate)) {
            res.status(400).json({ error: "Invalid date parameter." });
            return;
        }

        const date = new Date(rawDate);
        if (isNaN(date.getTime())) {
            res.status(400).json({ error: "Invalid date value." });
            return;
        }
        const deleted = await deleteAvailabilityByDate(date);

        if (!deleted) {
            res.status(404).json({ error: "Availability entry not found for the specified date." });
            return;
        }

        res.status(200).json(deleted);
    } catch (error) {
        next(error);
    }
};