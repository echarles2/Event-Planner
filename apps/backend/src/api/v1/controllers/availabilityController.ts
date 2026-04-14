import { NextFunction, Request, Response } from "express";
import { getAllAvailability, saveAvailability, deleteAvailabilityByDate } from "../services/availabilityService.js";
import { getAuth } from "@clerk/express";
import { checkAppUser } from "../services/userService.js";

export const fetchAvailability = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId: clerkUserId } = getAuth(_req);
        if (!clerkUserId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const appUser = await checkAppUser(clerkUserId);
        const availability = await getAllAvailability(appUser.id);

        res.status(200).json(availability);
    } catch (error) {
        next(error);
    }
};

export const createOrUpdateAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { date, status } = req.body;
        
        if (!date || !status) {
            res.status(400).json({ error: "Missing required fields: date and status." });
            return;
        }
        const normalizedDate = new Date(date);
        if (isNaN(normalizedDate.getTime())) {
            res.status(400).json({ error: "Invalid date format." });
            return;
        }

        const { userId: clerkUserId } = getAuth(req);

        if (!clerkUserId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const appUser = await checkAppUser(clerkUserId);
        const availability = await saveAvailability(appUser.id, normalizedDate, status);
        res.status(200).json(availability);
    } catch (error) {
        next(error);
    }
};

export const deleteAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const rawDate = req.params.date;

        if (typeof rawDate !== "string") {
            res.status(400).json({ error: "Missing date." });
            return;
        }

        const normalizedDate = new Date(rawDate);

        if (isNaN(normalizedDate.getTime())) {
            res.status(400).json({ error: "Invalid date format." });
            return;
        }

        const { userId: clerkUserId } = getAuth(req);

        if (!clerkUserId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const appUser = await checkAppUser(clerkUserId);
        const deleted = await deleteAvailabilityByDate(appUser.id, normalizedDate);

        if (!deleted) {
            res.status(404).json({ error: "Availability entry not found for the specified date." });
            return;
        }

        res.status(200).json(deleted);
    } catch (error) {
        next(error);
    }
};