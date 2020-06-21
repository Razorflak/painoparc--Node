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
const camping_model_1 = __importDefault(require("../models/camping.model"));
const commercant_model_1 = __importDefault(require("../models/commercant.model"));
const produit_model_1 = __importDefault(require("../models/produit.model"));
const commande_model_1 = __importDefault(require("../models/commande.model"));
const commande_produit_modele_1 = __importDefault(require("../models/commande_produit.modele"));
const panier_model_1 = __importDefault(require("../models/panier.model"));
const panier_produit_modele_1 = __importDefault(require("../models/panier_produit.modele"));
function insertDonneesTest() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_2.logInfo("Insertion des données de test", logger_1.typeMessage.Info);
            const authInst = new authCtrl_1.default();
            var { newUser } = yield authInst.register({
                email: 'tanguyj35@gmail.com',
                firstName: 'Julien',
                lastName: 'Tanguy',
                password: 'azerty'
            });
            userInformation_model_1.default.create({
                idUser: newUser.id,
                bio: "Ceci est une bio sur une ligne unique",
                emplacement: "80a",
                adresse: "94 avenue de la Baraudière"
            });
            camping_model_1.default.create({
                id: 1,
                nom: 'Parc des Rosalières'
            });
            var commercant = {
                emailCommande: 'Email@commercant.fr',
                nomCommerce: 'Boulangerie de Sion'
            };
            commercant = yield commercant_model_1.default.create(commercant);
            var produit = [{
                    idCommercant: commercant.id,
                    nom: 'Baguette traditionnelle',
                    prix: 1.20,
                    description: 'une description MEGA longue car le mec à beaucoup de chose à dire sur sont produit de merde !!!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nsqdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd\nffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                    commission: 0.1,
                    stock: 10000
                }, {
                    idCommercant: commercant.id,
                    nom: 'La boule !',
                    prix: 10,
                    description: 'une description MEGA longue car le mec à beaucoup de chose à dire sur sont produit de merde !!!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nsqdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd\nffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                    commission: 0.1,
                    stock: 2
                }];
            var retProd = yield produit_model_1.default.bulkCreate(produit);
            var date = new Date();
            var commande = yield {
                idUser: newUser.id,
                dateCommande: new Date,
                dateLivraisonPrevu: date,
                dateReception: date,
                idCommercant: commercant.id
            };
            commande = yield commande_model_1.default.create(commande);
            var commandeProduit = {
                CommandeId: commande.id,
                ProduitId: retProd[0].id,
                nbrProduit: 10
            };
            commande_produit_modele_1.default.create(commandeProduit);
            //Model d'Obj recu pour la création/MAJ d'un panier
            var panier = {
                dateCreation: new Date(),
                dateMiseAJour: new Date(),
                isFavori: false,
                idUser: 1
            };
            panier = yield panier_model_1.default.create(panier);
            var panierProduits = {
                PanierId: panier.id,
                ProduitId: 1,
                nbrProduit: 10
            };
            panier_produit_modele_1.default.create(panierProduits);
        }
        catch (error) {
            logger_2.logInfo("Erreur lors de l'insertion des données test: " + error.message, logger_1.typeMessage.Error);
        }
    });
}
exports.insertDonneesTest = insertDonneesTest;
//# sourceMappingURL=insertDonneesTest.js.map