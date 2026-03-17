import express, {Router} from "express";
import * as checklistControllers from "../controllers/checklistControllers";
import { validateRequest } from "../middleware/validate";
import { checklistSchema } from "../validations/checklistValidation";

const router: Router = express.Router();
