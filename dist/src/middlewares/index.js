"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcludePrefixMiddleware = void 0;
const common_1 = require("@nestjs/common");
let ExcludePrefixMiddleware = class ExcludePrefixMiddleware {
    use(req, res, next) {
        console.log("req", req.path);
        const excludedRoutes = ['Authenticate'];
        if (excludedRoutes.includes(req.path)) {
            req.url = req.url.replace('/api/services/app', '');
        }
        next();
    }
};
exports.ExcludePrefixMiddleware = ExcludePrefixMiddleware;
exports.ExcludePrefixMiddleware = ExcludePrefixMiddleware = __decorate([
    (0, common_1.Injectable)()
], ExcludePrefixMiddleware);
//# sourceMappingURL=index.js.map