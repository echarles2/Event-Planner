import Joi, { ObjectSchema } from "joi";

/**
 * Defines the shape of a Checklist object received in JSON
 */
export const checklistSchema: ObjectSchema = Joi.object({
    eventId: Joi.string().optional().allow(null, "")
});

/**
 * Defines the shape of a checklist item received in JSON
 */
export const checklistItemSchema: ObjectSchema = Joi.object({
    item: Joi.string().required().messages({
        "any.required": "Checklist item is required",
        "string.empty": "Checklist item cannot be empty"
    }),
    completed: Joi.boolean().optional()
});