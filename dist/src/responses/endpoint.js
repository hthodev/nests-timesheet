"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseEndpoint = responseEndpoint;
function responseEndpoint({ result = {}, targetUrl = null, success = true, error = null, unAuthorizedRequest = false, __abp = true }) {
    return {
        result,
        targetUrl,
        success,
        error,
        unAuthorizedRequest,
        __abp
    };
}
//# sourceMappingURL=endpoint.js.map