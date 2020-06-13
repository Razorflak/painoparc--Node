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
exports.insertDonneesTest = void 0;
const logger_1 = require("./../error/logger");
const authCtrl_1 = __importDefault(require("../services/authCtrl"));
const userInformation_model_1 = __importDefault(require("../models/userInformation.model"));
const logger_2 = require("../error/logger");
function insertDonneesTest() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authInst = new authCtrl_1.default();
            var { newUser } = yield authInst.register({
                email: 'julien.tanguy35@gmail.com',
                firstName: 'Julien',
                lastName: 'Tanguy',
                password: 'azerty'
            });
            userInformation_model_1.default.create({
                idUser: newUser.id,
                bio: "Ceci est une boi sur une ligne unique",
                emplacement: "80a",
                adresse: "94 avenue de la Baraudière"
            });
        }
        catch (error) {
            logger_2.logInfo("Erreur lors de l'insertion des données test: " + error.Message, logger_1.typeMessage.Error);
        }
    });
}
exports.insertDonneesTest = insertDonneesTest;
//# sourceMappingURL=insertDonneesTest.js.map