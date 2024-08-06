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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../../models/user.model");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("@nestjs/sequelize");
let AuthService = class AuthService {
    verifyLogin(user) {
        const domainEmail = process.env.DOMAIN_EMAIL || 'ts@gmail.com';
        if (user?.email?.match(domainEmail)) {
            return user;
        }
        throw new common_1.HttpException("Can't login", 400);
    }
    authenticate(body) {
        const user = this.userModel.findOne({
            where: {
                [sequelize_1.Op.or]: {
                    email: body.userNameOrEmailAddress,
                    userName: body.userNameOrEmailAddress,
                },
            }
        });
        return user;
    }
};
exports.AuthService = AuthService;
__decorate([
    (0, sequelize_2.InjectModel)(user_model_1.User),
    __metadata("design:type", Object)
], AuthService.prototype, "userModel", void 0);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map