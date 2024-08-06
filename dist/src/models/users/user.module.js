"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../../../models/user.model");
const user_service_1 = require("./user.service");
const sequelize_typescript_1 = require("sequelize-typescript");
const workingTime_service_1 = require("../workingTimes/workingTime.service");
const workingTime_model_1 = require("../../../models/workingTime.model");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([user_model_1.User]), sequelize_1.SequelizeModule.forFeature([workingTime_model_1.WorkingTime])],
        providers: [
            user_service_1.UserService,
            {
                provide: 'SEQUELIZE',
                useExisting: sequelize_typescript_1.Sequelize,
            },
            workingTime_service_1.WorkingTimeService
        ],
        exports: [user_service_1.UserService, 'SEQUELIZE', workingTime_service_1.WorkingTimeService, sequelize_1.SequelizeModule],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map