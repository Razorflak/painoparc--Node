"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const logger_1 = __importDefault(require("./logger"));
exports.default = () => {
    console.log("test");
    logger_1.default.info("MAIS T OU???");
    typedi_1.Container.set('logger', logger_1.default);
    //Container.set('pgSequelize', pgSequelizeInstance);
    console.log("ttttt");
};
//# sourceMappingURL=dependencyInjector.js.map