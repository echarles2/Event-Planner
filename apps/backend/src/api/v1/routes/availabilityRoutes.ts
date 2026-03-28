import { Router } from "express";
import { fetchAvailability, createOrUpdateAvailability, deleteAvailability} from "../controllers/availabilityController.js";
//import { availabilitySchema } from "../validations/availabilityValidation.js";
//import { validateRequest } from "../middleware/validate.js";

const router = Router();

router.get("/availability", fetchAvailability);
router.post("/availability", createOrUpdateAvailability);
router.delete("/availability/:date", deleteAvailability);

export default router;