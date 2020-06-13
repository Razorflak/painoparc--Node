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
const user_model_1 = __importDefault(require("../models/user.model"));
//import models from '../models'
//var models  = require('../models');
//var userModele = require('../models/user');
class UserCtrl {
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
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
                    console.log('On a pas trouver');
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
                    console.log('trouver Error');
                    var err = new Error('Utilisateur déjà inscrit');
                    err.name = '500';
                    throw err;
                }
            }
            catch (error) {
                console.log('Error' + error.message);
                throw new Error('Impossible d\'ajouter l\'utilisateur');
            }
            ;
            return null;
        });
    }
}
exports.default = UserCtrl;
//# sourceMappingURL=usersCtrl.js.map