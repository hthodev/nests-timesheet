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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const endpoint_1 = require("../responses/endpoint");
const ultis_1 = require("../shares/ultis");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async googleAuth(req) { }
    googleAuthRedirect(req) {
        const user = this.authService.verifyLogin(req.user);
        return (0, endpoint_1.responseEndpoint)({ result: user });
    }
    async authenticate(body) {
        const user = await this.authService.authenticate(body);
        if (!user)
            throw new common_1.HttpException("wrong user or password", 400);
        if ((0, ultis_1.comparePassword)(body.password, user?.password)) {
            return (0, endpoint_1.responseEndpoint)({
                result: {
                    accessToken: await (0, ultis_1.signToken)(user),
                    userId: user.id,
                    expireInSeconds: Math.floor(Date.now() / 1000) + (60 * 60)
                }
            });
        }
        throw new common_1.HttpException("wrong user or password", 400);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Post)('Authenticate'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authenticate", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('TokenAuth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map