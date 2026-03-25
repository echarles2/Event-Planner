import Joi, { ObjectSchema } from "joi";

// define the correct shape of an event object received in JSON
// Require a valid name and date
export const eventSchema: ObjectSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "any.required": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must be less than 30 characters",
        "string.empty": "Name cannot be empty"
    }),
    date: Joi.date().required().messages({
        "any.required": "Date is required"
    }),
    location: Joi.string().max(5).optional().messages({
        "string.max": "Location must be less than 50 characters"
    }),
    details: Joi.string().optional()
});