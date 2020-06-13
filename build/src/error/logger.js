"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeMessage = exports.logInfo = exports.logDev = exports.logError = exports.consoleLog = void 0;
const generalError_1 = require("./generalError");
///import winston from "winston";
const logger_1 = __importDefault(require("../loaders/logger"));
var term = require('terminal-kit').terminal;
function consoleLog(message) {
}
exports.consoleLog = consoleLog;
function logError(err) {
    if (err.level == generalError_1.GeneralError.CRITICAL_ERROR) {
        term.red(err.message + '\n');
    }
    //Log vers les fichiers (avec winston)
    logger_1.default.error(err.code + " : " + err.message);
}
exports.logError = logError;
function logDev(message) {
    message += "\n";
    term.bgYellow(message);
}
exports.logDev = logDev;
function logInfo(message, type = typeMessage.Info) {
    //Obligé de rajouter le saut d eligne à la main...
    message += "\n";
    switch (type) {
        case typeMessage.Succesful:
            term.green(message);
            break;
        case typeMessage.Error:
            term.red(message);
            break;
        case typeMessage.Info:
            term.blue(message);
            break;
        case typeMessage.Warning:
            term.orange(message);
            break;
    }
}
exports.logInfo = logInfo;
var typeMessage;
(function (typeMessage) {
    typeMessage[typeMessage["Succesful"] = 1] = "Succesful";
    typeMessage[typeMessage["Error"] = 2] = "Error";
    typeMessage[typeMessage["Info"] = 3] = "Info";
    typeMessage[typeMessage["Warning"] = 4] = "Warning";
})(typeMessage = exports.typeMessage || (exports.typeMessage = {}));
//# sourceMappingURL=logger.js.map