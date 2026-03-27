import express, { Router } from "express";
import * as eventController from "../controllers/createEventController";
import { validateRequest } from "../middleware/validate";
import { eventSchema } from "../validations/eventValidation";

const router: Router = express.Router();

router.get("/create-event", eventController.getAllEvents);
router.post("/create-event", validateRequest(eventSchema), eventController.createEvent);

export default router;