import express, { Router } from "express";
import * as eventController from "../controllers/createEventController.js";
import { validateRequest } from "../middleware/validate.js";
import { eventSchema } from "../validations/eventValidation.js";

const router: Router = express.Router();

router.get("/create-event", eventController.getAllEvents);
router.post("/create-event", validateRequest(eventSchema), eventController.createEvent);

export default router;