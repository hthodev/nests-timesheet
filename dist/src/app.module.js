"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_config_1 = require("../configs/auth.config");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const database_module_1 = require("../databases/database.module");
const user_module_1 = require("./models/users/user.module");
const user_controller_1 = require("./models/users/user.controller");
const branch_module_1 = require("./models/branches/branch.module");
const workingTime_module_1 = require("./models/workingTimes/workingTime.module");
const session_controller_1 = require("./auth/session.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [auth_config_1.default],
            }),
            database_module_1.DatabaseModule,
            user_module_1.UserModule,
            branch_module_1.BranchModule,
            workingTime_module_1.WorkingTimeModule,
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, session_controller_1.SessionController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, auth_service_1.AuthService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map