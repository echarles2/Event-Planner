import express, {Router} from "express";
import * as checklistControllers from "../controllers/checklistControllers.js";
import { validateRequest } from "../middleware/validate.js";
import { checklistSchema, checklistItemSchema } from "../validations/checklistValidation.js";
import { getOrCreateUser } from "../middleware/getOrCreateUser.js";
import { requireAuth } from "@clerk/express";

const router: Router = express.Router();

// For checklist group
router.get("/checklists", 
    requireAuth(),
    getOrCreateUser,
    checklistControllers.getAllChecklists);

router.post("/checklists", 
    requireAuth(),
    getOrCreateUser,
    validateRequest(checklistSchema),
    checklistControllers.createChecklist);

router.delete("/checklists/:id", 
    requireAuth(),
    getOrCreateUser,
    checklistControllers.deleteChecklist);

// For checklist item
router.post("/checklist-items", validateRequest(checklistItemSchema),
    checklistControllers.createChecklistItem);

router.patch("/checklist-items/:id", checklistControllers.updateChecklistItem);

router.delete("/checklist-items/:id", checklistControllers.deleteChecklistItem);

export default router;