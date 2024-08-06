"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkingTimeModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const workingTime_model_1 = require("../../../models/workingTime.model");
const workingTime_service_1 = require("./workingTime.service");
let WorkingTimeModule = class WorkingTimeModule {
};
exports.WorkingTimeModule = WorkingTimeModule;
exports.WorkingTimeModule = WorkingTimeModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([workingTime_model_1.WorkingTime])],
        providers: [workingTime_service_1.WorkingTimeService],
        exports: [workingTime_service_1.WorkingTimeService],
    })
], WorkingTimeModule);
//# sourceMappingURL=workingTime.module.js.map