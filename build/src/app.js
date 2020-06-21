"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./loaders/logger"));
const config_1 = __importDefault(require("../config"));
const logger_2 = require("./error/logger");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        /**
         * A little hack here
         * Import/Export can only be used in 'top-level code'
         * Well, at least in node 10 without babel and at the time of writing
         * So we are using good old require.
         **/
        //await require('./loaders/index').default({ expressApp: app })
        //await require('./loaders/')
        // Pour le moment on fait les appels 1 à 1
        //TODO Revoir pour factoriser ça quand ça deviendra charger...
        yield require('./loaders/express').default({ app });
        yield require('./loaders/dbPostgres');
        //await insertDonneesTest();
        app.listen(config_1.default.port, err => {
            if (err) {
                logger_1.default.error(err);
                process.exit(1);
                return;
            }
            logger_2.logInfo('##########Server listening on port: ' + config_1.default.port + '##########', logger_2.typeMessage.Succesful);
        });
    });
}
startServer();
//# sourceMappingURL=app.js.map