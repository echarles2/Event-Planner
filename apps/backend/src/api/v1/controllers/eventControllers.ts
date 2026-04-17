import { Request, Response, NextFunction } from "express";
import * as createEventService from "../services/eventServices.js";
import { successResponse } from "../models/responseModel.js";
import { getAuth } from "@clerk/express";
import { checkAppUser } from "../services/userService.js";

export const getAllEvents = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const {userId: clerkUserId} = getAuth(req);

        if (!clerkUserId){
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        const appUser = await checkAppUser(clerkUserId);
        const events = await createEventService.fetchAllEvents(appUser.id);

        res.status(200).json(
            successResponse(events, "Events retrieved succesfully")
        );
    } catch (error) {
        next(error);
    }
};

export const createEvent = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {userId: clerkUserId} = getAuth(req);

        if (!clerkUserId){
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        const appUser = await checkAppUser(clerkUserId);
        const newEvent = await createEventService.createEvent(req.body, appUser.id);
        res.status(201)
            .json(successResponse(newEvent, "Event created succesfully"));
    } catch(error) {
        next(error);
    }
};