"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralError = void 0;
let GeneralError = /** @class */ (() => {
    class GeneralError extends Error {
        constructor(code, message, httpCodeError = null, level = GeneralError.CRITICAL_ERROR) {
            super(message);
            this.code = code;
            this.level = level;
            this.httpCodeError = httpCodeError;
        }
        ;
    }
    GeneralError.CRITICAL_ERROR = 'critical';
    GeneralError.WARNING_ERROR = 'warning';
    return GeneralError;
})();
exports.GeneralError = GeneralError;
//# sourceMappingURL=generalError.js.map