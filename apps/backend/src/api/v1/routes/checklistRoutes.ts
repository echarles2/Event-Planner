import express, {Router} from "express";
import * as checklistControllers from "../controllers/checklistControllers";
import { validateRequest } from "../middleware/validate";
import { checklistSchema, checklistItemSchema } from "../validations/checklistValidation";

const router: Router = express.Router();
// For checklist group
router.get("/checklists", checklistControllers.getAllChecklists);

router.post("/checklists", validateRequest(checklistSchema),
    checklistControllers.createChecklist);

router.delete("/checklists/:id", checklistControllers.deleteChecklist);
// For checklist item
router.post("/checklist-items", validateRequest(checklistItemSchema),
    checklistControllers.createChecklistItem);

router.patch("/checklist-items/:id", checklistControllers.updateChecklistItem);

router.delete("/checklist-items/:id", checklistControllers.deleteChecklistItem);

export default router;