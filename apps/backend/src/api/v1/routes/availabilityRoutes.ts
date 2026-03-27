import { Router } from "express";
import { fetchAvailability, createOrUpdateAvailability, deleteAvailability} from "../controllers/availabilityController";
import { availabilitySchema } from "../validations/availabilityValidation";
import { validateRequest } from "../middleware/validate";

const router = Router();

router.get("/availability", fetchAvailability);
router.post("/availability", validateRequest(availabilitySchema), createOrUpdateAvailability);
router.delete("/availability/:date", deleteAvailability);

export default router;