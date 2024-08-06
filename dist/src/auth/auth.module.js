"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const google_strategy_1 = require("./google.strategy");
const config_1 = require("@nestjs/config");
const auth_config_1 = require("../../configs/auth.config");
const user_service_1 = require("../models/users/user.service");
const user_model_1 = require("../../models/user.model");
const sequelize_1 = require("@nestjs/sequelize");
const user_module_1 = require("../models/users/user.module");
const auth_service_1 = require("./auth.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'google' }),
            config_1.ConfigModule.forFeature(auth_config_1.default),
            sequelize_1.SequelizeModule.forFeature([user_model_1.User]),
            user_module_1.UserModule
        ],
        providers: [
            google_strategy_1.GoogleStrategy,
            auth_service_1.AuthService,
            user_service_1.UserService
        ],
        exports: [passport_1.PassportModule, auth_service_1.AuthService, user_service_1.UserService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map