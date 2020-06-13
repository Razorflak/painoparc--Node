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
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const terminal_kit_1 = __importDefault(require("terminal-kit"));
const logger_1 = require("../error/logger");
const user_model_1 = __importDefault(require("../models/user.model"));
const camping_model_1 = __importDefault(require("../models/camping.model"));
const commercant_model_1 = __importDefault(require("../models/commercant.model"));
const commande_model_1 = __importDefault(require("../models/commande.model"));
const produit_model_1 = __importDefault(require("../models/produit.model"));
const userInformation_model_1 = __importDefault(require("../models/userInformation.model"));
var t = __dirname + '../models';
exports.sequelize = new sequelize_typescript_1.Sequelize('postgres://postgres:postgres@localhost:5433/breaddelivery', {
    dialect: 'postgres',
    models: [__dirname + '/../models'],
    logging: false
});
//initialisation des jointures 
user_model_1.default.belongsToMany(camping_model_1.default, { through: 'User_Camping' });
camping_model_1.default.belongsToMany(user_model_1.default, { through: 'User_Camping' });
camping_model_1.default.belongsToMany(commercant_model_1.default, { through: 'Commercant_Camping' });
commercant_model_1.default.belongsToMany(camping_model_1.default, { through: 'Commercant_Camping' });
commande_model_1.default.belongsToMany(produit_model_1.default, { through: 'Commande_Product' });
produit_model_1.default.belongsToMany(commande_model_1.default, { through: 'Commande_Product' });
userInformation_model_1.default.belongsTo(user_model_1.default, {
    foreignKey: {
        name: 'idUser'
    }
});
const reloadDataBase = true;
exports.sequelize
    .authenticate()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logInfo('--Connection has been established successfully.--', logger_1.typeMessage.Succesful);
    try {
        yield exports.sequelize.sync({ force: reloadDataBase });
    }
    catch (error) {
        logger_1.logInfo('Erreur de synchro avec la base:' + error.message, logger_1.typeMessage.Error);
    }
}))
    .catch(function (err) {
    logger_1.logInfo('!!!!!!!!!!!!!!!!!!!!!!!!!!!! Unable to connect to the database !!!!!!!!!!!!!!!!!!!!!!!!!!!!', logger_1.typeMessage.Error);
    terminal_kit_1.default.terminal();
});
const insererJeuDonneesTest = true;
/*if(insererJeuDonneesTest && reloadDataBase){
    //Si on regénére la base et que l'on souhaite injecter les données test:
    logInfo("Insertion des données de test", typeMessage.Info)
    insertDonneesTest();
}
 */ 
//# sourceMappingURL=dbPostgres.js.map