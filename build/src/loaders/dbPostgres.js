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
const panier_model_1 = __importDefault(require("../models/panier.model"));
const userInformation_model_1 = __importDefault(require("../models/userInformation.model"));
const insertDonneesTest_1 = require("../dev/insertDonneesTest");
const commande_produit_modele_1 = __importDefault(require("../models/commande_produit.modele"));
const panier_produit_modele_1 = __importDefault(require("../models/panier_produit.modele"));
var t = __dirname + '../models';
/**
 * Initialisation de la connexion sequelize
 * TODO: Remplacer les variables de connexion et les mettre dans le .env
 */
exports.sequelize = new sequelize_typescript_1.Sequelize('postgres://postgres:postgres@localhost:5433/breaddelivery', {
    dialect: 'postgres',
    models: [__dirname + '/../models'],
    logging: true
});
//initialisation des jointures 
user_model_1.default.belongsToMany(camping_model_1.default, { through: 'user_camping' });
camping_model_1.default.belongsToMany(user_model_1.default, { through: 'user_Camping' });
camping_model_1.default.belongsToMany(commercant_model_1.default, { through: 'commercant_camping' });
commercant_model_1.default.belongsToMany(camping_model_1.default, { through: 'commercant_camping' });
commande_model_1.default.belongsToMany(produit_model_1.default, {
    through: commande_produit_modele_1.default
});
produit_model_1.default.belongsToMany(commande_model_1.default, {
    through: commande_produit_modele_1.default
});
/*Panier_Produit.belongsToMany(Produit, {
    through : Panier_Produit
});
Panier_Produit.belongsToMany(Panier, {
    through : Panier_Produit
});*/
panier_model_1.default.hasMany(panier_produit_modele_1.default);
produit_model_1.default.hasMany(panier_produit_modele_1.default);
//Note pour les jointure 1-1 la table BelongTo contient la clé parent
//On définit la foreing Key pour s'assurer que c'est une colonne défini du modèle qui est utilisé
//TODO Déplacer l'inittialisation des jointures dans un fichier
//User <--> UnserInformation
user_model_1.default.hasOne(userInformation_model_1.default, {
    foreignKey: {
        name: 'idUser'
    }
});
userInformation_model_1.default.belongsTo(user_model_1.default, {
    foreignKey: {
        name: 'idUser'
    }
});
//Commercant <-n> Produit
commercant_model_1.default.hasMany(produit_model_1.default, {
    foreignKey: {
        name: 'idCommercant'
    }
});
produit_model_1.default.belongsTo(commercant_model_1.default, {
    foreignKey: {
        name: 'idCommercant'
    }
});
//User <--> Commande
user_model_1.default.hasMany(commande_model_1.default, {
    foreignKey: {
        name: 'idUser'
    }
});
commande_model_1.default.belongsTo(user_model_1.default, {
    foreignKey: {
        name: 'idUser'
    }
});
//User <--> Panier
user_model_1.default.hasMany(panier_model_1.default, {
    foreignKey: {
        name: 'idUser'
    }
});
panier_model_1.default.belongsTo(user_model_1.default, {
    foreignKey: {
        name: 'idUser'
    }
});
//Commercant <--> Commande
commercant_model_1.default.hasMany(commande_model_1.default, {
    foreignKey: {
        name: 'idCommercant'
    }
});
commande_model_1.default.belongsTo(commercant_model_1.default, {
    foreignKey: {
        name: 'idCommercant'
    }
});
const reloadDataBase = true;
const insererJeuDonneesTest = true;
exports.sequelize
    .authenticate()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logInfo('--Connection has been established successfully.--', logger_1.typeMessage.Succesful);
    try {
        yield exports.sequelize.sync({ force: reloadDataBase });
        if (insererJeuDonneesTest && reloadDataBase) {
            yield insertDonneesTest_1.insertDonneesTest();
        }
    }
    catch (error) {
        logger_1.logInfo('Erreur de synchro avec la base:' + error.message, logger_1.typeMessage.Error);
    }
}))
    .catch(function (err) {
    logger_1.logInfo('!!!!!!!!!!!!!!!!!!!!!!!!!!!! Unable to connect to the database !!!!!!!!!!!!!!!!!!!!!!!!!!!!', logger_1.typeMessage.Error);
    terminal_kit_1.default.terminal();
});
/*if(insererJeuDonneesTest && reloadDataBase){
    //Si on regénére la base et que l'on souhaite injecter les données test:
    logInfo("Insertion des données de test", typeMessage.Info)
    insertDonneesTest();
}
 */ 
//# sourceMappingURL=dbPostgres.js.map