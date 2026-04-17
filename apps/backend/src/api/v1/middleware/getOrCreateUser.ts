import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import { checkAppUser } from "../services/userService";

export const getOrCreateUser = async(
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = getAuth(req);
        
        if (!userId) {
            throw new Error("User should exist here")
        }
        await checkAppUser(userId)

        req.userId = userId;
        next();
    } catch (error) {
        next(error)
    }
}