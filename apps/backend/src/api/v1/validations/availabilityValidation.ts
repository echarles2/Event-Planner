import Joi, { ObjectSchema } from "joi";

export const availabilitySchema: ObjectSchema = Joi.object({
    date: Joi.date().required().messages({
        "any.required": "Date is required",
        "date.base": "Date must be a valid date"
    }),
    status: Joi.string().valid("available", "unavailable").required().messages({
        "any.required": "Status is required",
        "any.only": "Status must be available or unavailable",
        "string.empty": "Status cannot be empty"
    })
});