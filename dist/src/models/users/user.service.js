"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../../../models/user.model");
const ultis_1 = require("../../shares/ultis");
const workingTime_model_1 = require("../../../models/workingTime.model");
const uuid_1 = require("uuid");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createNewUser(body) {
        const transaction = await this.sequelize.transaction();
        try {
            const userId = (0, uuid_1.v4)();
            const workingTime = {
                userId,
                morningStartAt: body.morningStartAt,
                morningEndAt: body.morningEndAt,
                morningWorking: (0, ultis_1.calculateWorkingTime)(body.morningStartAt, body.morningEndAt),
                afternoonStartAt: body.afternoonStartAt,
                afternoonEndAt: body.afternoonEndAt,
                afternoonWorking: (0, ultis_1.calculateWorkingTime)(body.afternoonStartAt, body.afternoonEndAt),
            };
            const user = {
                isActive: body.isActive,
                allowedLeaveDay: body.allowedLeaveDay,
                branchId: body.branchId,
                email: body.email,
                type: body.type,
                firstName: body.firstName,
                lastName: body.lastName,
                sex: body.sex,
                level: body.level,
                salary: body.salary,
                address: body.address,
                phoneNumber: body.phoneNumber,
                userName: body.userName,
                password: (0, ultis_1.hashPassword)(body.password),
            };
            await this.workingTimeModel.create(workingTime, { transaction });
            const createdUser = await this.userModel.create(user, { transaction });
            await transaction.commit();
            return createdUser;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async findAll() {
        return this.userModel.findAll();
    }
    async findOne(id) {
        return this.userModel.findByPk(id);
    }
    async remove(id) {
        const user = await this.findOne(id);
        await user.destroy();
    }
};
exports.UserService = UserService;
__decorate([
    (0, common_1.Inject)('SEQUELIZE'),
    __metadata("design:type", sequelize_typescript_1.Sequelize)
], UserService.prototype, "sequelize", void 0);
__decorate([
    (0, sequelize_1.InjectModel)(workingTime_model_1.WorkingTime),
    __metadata("design:type", Object)
], UserService.prototype, "workingTimeModel", void 0);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
//# sourceMappingURL=user.service.js.map