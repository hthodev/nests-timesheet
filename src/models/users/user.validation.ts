import * as Joi from 'joi';
import { LEVEL, POSITION, SEX, TYPE } from './user.interface';

export const createNewOrUpdateEmployeeDTO = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    birthday: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    pmId: Joi.string().uuid().optional(),
    position: Joi.string().valid(POSITION.ADMIN, POSITION.BA, POSITION.DA, POSITION.DESIGNER, POSITION.DEV, POSITION.HR, POSITION.PM, POSITION.PO, POSITION.SALE, POSITION.TESTER).required(),
    type: Joi.string().valid(TYPE.INTERN, TYPE.STAFF, TYPE.COLLABORATOR).required(),
    level: Joi.string().valid(LEVEL.INTERN, LEVEL.FRESHER, LEVEL.JUNIOR, LEVEL.SENIOR).required(),
    salary: Joi.number().optional(),
    sex: Joi.string().valid(SEX.MALE, SEX.FEMALE).required(),
    branchId: Joi.string().uuid().required(),
    allowedLeaveDay: Joi.number().optional(),
    isActive: Joi.boolean().required(),
    picture: Joi.string().optional().allow(null),
    workingTime: Joi.object({
        morningStartAt: Joi.string().required(),
        morningEndAt: Joi.string().required(),
        afternoonStartAt: Joi.string().required(),
        afternoonEndAt: Joi.string().required(),
    }).required()
});

export const userIdValid = Joi.object({
    userId: Joi.string().uuid().required(),
});

const filter = {
    key: Joi.string().valid('position', 'type', 'level', 'sex', 'isActive').required(),
    names: Joi.array().items(Joi.valid(
      "Staff", "Intern", "Collaborator", "Fresher", "Junior", "Senior",
      "Male", "Female", "Dev", "PM", "HR", "Admin", "Sale", "Tester", 
      "Designer", "BA", "DA", "PO", true, false
    )).required()
  };
  
  export const allUsersNoPagingDTO = Joi.object({
    currentPage: Joi.number().required(),
    limit: Joi.number().required(),
    search: Joi.string().allow(''),
    filters: Joi.array().items(Joi.object(filter).optional()).optional(),
    pmIds: Joi.array().items(Joi.string().optional()).optional(),
  });
  

