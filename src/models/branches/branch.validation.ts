import * as Joi from 'joi';

export const updateOrCreateBranch = Joi.object({
    id: Joi.string().uuid().optional(),
    name: Joi.string().required(),
    morningStartAt: Joi.string().required(),
    morningEndAt: Joi.string().required(),
    afternoonStartAt: Joi.string().required(),
    afternoonEndAt: Joi.string().required(),
    officeManagerId: Joi.string().uuid().required(),
})