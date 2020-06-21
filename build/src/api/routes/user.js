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
const express_1 = require("express");
const authCtrl_1 = __importDefault(require("../../services/authCtrl"));
const authCtrl_2 = __importDefault(require("../../services/authCtrl"));
const authTokenCtrl_1 = require("../../services/authTokenCtrl");
const route = express_1.Router();
exports.default = (app) => {
    //Initialisation des instance de controleur
    var ctrlUser = new authCtrl_1.default();
    var ctrlAuth = new authCtrl_2.default();
    app.use('/user', route);
    route.use(authTokenCtrl_1.validateToken);
    route.get("/profil", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfil = yield ctrlUser.getProfil(req);
            return res.status(200).json(userProfil);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }));
};
//# sourceMappingURL=user.js.map