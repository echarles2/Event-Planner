import express, { Router } from "express";
import * as eventController from "../controllers/createEventController";

const router: Router = express.Router();

router.get("/create-event", eventController.getAllEvents);
router.post("/create-event", eventController.createEvent);

export default router;