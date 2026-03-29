import Joi, { ObjectSchema } from "joi";

export const availabilitySchema: ObjectSchema = Joi.object({
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
        "any.required": "Date is required",
        "string.empty": "Date cannot be empty",
        "string.pattern.base": "Date must be in YYYY-MM-DD format"
    }),
    status: Joi.string().valid("available", "unavailable").required().messages({
        "any.required": "Status is required",
        "any.only": "Status must be available or unavailable",
        "string.empty": "Status cannot be empty"
    })
});