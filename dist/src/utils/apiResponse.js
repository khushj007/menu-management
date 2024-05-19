"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(res) {
        this.res = res;
    }
    message(success = true, message = "Success", statusCode = 200, data) {
        this.res.status(statusCode).json({
            success,
            message,
            data,
        });
    }
}
exports.default = ApiResponse;
