import * as Joi from 'joi';

export const updateOrCreateTask = Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().required(),
    type: Joi.string().required()
})