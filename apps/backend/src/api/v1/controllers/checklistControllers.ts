import { Request, Response, NextFunction } from "express";
import * as checklistService from "../services/checklistServices";
import { successResponse } from "../models/responseModel";
import { checklistItemSchema } from "../validations/checklistValidation";

export const getAllChecklists = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const checklists = await checklistService.getAllChecklists();
        res.status(200).json(
            successResponse(checklists, "Checklists retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

export const createChecklist = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newChecklist = await checklistService.createChecklist(req.body);
        res.status(201)
            .json(successResponse(newChecklist, "Checklist created succesfully"));
    } catch(error) {
        next(error);
    }
};

export const createChecklistItem = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { error, value } = checklistItemSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }

        const newItem = await checklistService.createChecklistItem(value);
        res.status(201)
            .json(successResponse(newItem, "Checklist item created succesfully"));
    } catch(error) {
        next(error);
    }
};

export const updateChecklistItem = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedItem = await checklistService.updateChecklistItem(req.params.id as string);

        res.status(200)
            .json(successResponse(updatedItem, "Checklist item updated succesfully"));
    } catch(error) {
        next(error);
    }
};

export const deleteChecklist = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await checklistService.deleteChecklist(req.params.id as string);

        res.status(200)
            .json(successResponse(null, "Checklist deleted succesfully"));
    } catch(error) {
        next(error);
    }
};

export const deleteChecklistItem = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await checklistService.deleteChecklistItem(req.params.id as string);
        res.status(200)
            .json(successResponse(null, "Checklist item deleted succesfully"));
    } catch(error) {
        next(error);
    }
};