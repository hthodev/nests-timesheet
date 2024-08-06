"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWorkingTime = calculateWorkingTime;
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.signToken = signToken;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
function calculateWorkingTime(startTime, endTime) {
    const start = startTime.split(':');
    const end = endTime.split(':');
    const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
    const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);
    const diffMinutes = endMinutes - startMinutes;
    const diffHours = diffMinutes / 60;
    return diffHours;
}
function hashPassword(password) {
    const saltRounds = 10;
    const salt = (0, bcrypt_1.genSaltSync)(saltRounds);
    return (0, bcrypt_1.hashSync)(password, salt);
}
function comparePassword(password, hashPassworded) {
    return (0, bcrypt_1.compareSync)(password, hashPassworded);
}
function signToken(user) {
    const privateKey = process.env.PRIVATE_KEY;
    return (0, jsonwebtoken_1.sign)({
        data: {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: user
        }
    }, privateKey, { algorithm: 'RS256' });
}
//# sourceMappingURL=ultis.js.map