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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const config_1 = __importDefault(require("../../config"));
const logger_1 = require("../error/logger");
const generalError_1 = require("../error/generalError");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const userInformation_model_1 = __importDefault(require("../models/userInformation.model"));
//import models from '../models'
//var models  = require('../models');
//var userModele = require('../models/user');
class AuthCtrl {
    login(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({
                    where: {
                        email: userInfo.email
                    }
                });
                if (user) {
                    const passwordMatch = yield bcrypt_1.default.compare(userInfo.password, user.password);
                    if (passwordMatch) {
                        const token = this.generateTokenForUser(user);
                        return { user, token };
                    }
                    else {
                        var err = new generalError_1.GeneralError(500, "Mot de passe invalid", http_status_codes_1.default.UNAUTHORIZED);
                        logger_1.logDev(err.message);
                        throw err;
                    }
                }
                else {
                    var err = new generalError_1.GeneralError(500, "L'utilisateur n'existe pas !", http_status_codes_1.default.UNAUTHORIZED);
                    logger_1.logDev(err.message);
                    throw err;
                }
            }
            catch (error) {
                throw error;
            }
            ;
        });
    }
    ;
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_model_1.default.findOne({
                    attributes: ['email'],
                    where: {
                        email: user.email
                    }
                });
                if (!result) {
                    //Validation du format des données
                    //TODO validation des données commenter car me renvoie fails dans tous les cas....
                    /*let validation = new Validator(user, userRules);
                    if(validation.fails){
                        throw new Error ("Format des données invalid: " + validation.errors.all.toString);
                    }*/
                    const hashedPassword = yield new Promise((resolve, reject) => {
                        bcrypt_1.default.hash(user.password, 5, function (err, hash) {
                            if (err)
                                reject(err);
                            resolve(hash);
                        });
                    });
                    var newUser = yield user_model_1.default.create({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        password: hashedPassword
                    });
                    return { newUser };
                }
                else {
                    logger_1.logDev('Utilisateur déjà inscrit!');
                    var err = new generalError_1.GeneralError(500, 'Utilisateur déjà inscrit', 401);
                    err.name = '500';
                    throw err;
                }
            }
            catch (error) {
                console.log('Error' + error.message);
                throw new Error('Impossible d\'ajouter l\'utilisateur');
            }
            ;
        });
    }
    getProfil(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = this.validateToken(req);
                //TODO Chargement des infos du profil
                //Retour du user 1 pour le moment
                const userProfil = yield user_model_1.default.findOne({
                    where: {
                        id: userId
                    },
                    include: [userInformation_model_1.default]
                });
                return userProfil;
            }
            catch (error) {
                logger_1.logInfo('Erreur getProfil: ' + error.message);
            }
        });
    }
    generateTokenForUser(user) {
        return jsonwebtoken_1.default.sign({
            userId: user.id,
            isAdmin: false
        }, config_1.default.jwtSecret, {
            expiresIn: '1d'
        });
    }
    validateToken(req) {
        var headerAuth = req.get('authorization');
        const token = (headerAuth != null) ? headerAuth.replace('Bearer ', '') : null;
        if (!token) {
            throw new Error("Missing TOKEN !");
        }
        ;
        var userId = -1;
        //Validation du TOKEN
        var jwtToken = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        if (jwtToken) {
            return parseInt(jwtToken["userId"]);
        }
        else {
            throw new Error("TOKEN invalid");
        }
    }
}
exports.default = AuthCtrl;
//# sourceMappingURL=authCtrl.js.map