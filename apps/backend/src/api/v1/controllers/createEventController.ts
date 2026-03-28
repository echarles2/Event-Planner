import { Request, Response, NextFunction } from "express";
import * as createEventService from "../services/createEventService.js";
import { successResponse } from "../models/responseModel.js";

export const getAllEvents = async(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const events = await createEventService.fetchAllEvents();
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
        const newEvent = await createEventService.createEvent(req.body);
        res.status(201)
            .json(successResponse(newEvent, "Event created succesfully"));
    } catch(error) {
        next(error);
    }
};