import { IUser } from './../interfaces/IUser';
import {Sequelize, BelongsTo} from "sequelize-typescript"
import term from 'terminal-kit';
import { logInfo, typeMessage, logError } from "../error/logger";
import User from "../models/user.model";
import Camping from "../models/camping.model";
import Commercant from "../models/commercant.model"
import Commande from "../models/commande.model";
import Produit from "../models/produit.model";
import UserInformation from "../models/userInformation.model";
import AuthCtrl from "../services/authCtrl";
import { insertDonneesTest } from '../dev/insertDonneesTest';
import { type } from 'os';
import Commande_Produit from '../models/commande_product.modele';


var t =__dirname + '../models';
/**
 * Initialisation de la connexion sequelize
 * TODO: Remplacer les variables de connexion et les mettre dans le .env
 */
export const sequelize: Sequelize = new Sequelize('postgres://postgres:postgres@localhost:5433/breaddelivery',{
	dialect: 'postgres',
    models: [__dirname + '/../models'],
    logging: false
});    

//initialisation des jointures 
User.belongsToMany(Camping, {through: 'User_Camping'});
Camping.belongsToMany(User, {through: 'User_Camping'});

Camping.belongsToMany(Commercant, {through: 'Commercant_Camping'});
Commercant.belongsToMany(Camping, {through: 'Commercant_Camping'});

Commande.belongsToMany(Produit, {through : Commande_Produit});
Produit.belongsToMany(Commande, {through : Commande_Produit});

//Note pour les jointure 1-1 la table BelongTo contient la clé parent
//On définit la foreing Key pour s'assurer que c'est une colonne défini du modèle qui est utilisé
//TODO Déplacer l'inittialisation des jointures dans un fichier

//User <--> UnserInformation
User.hasOne(UserInformation, {
	foreignKey :{
		name: 'idUser'
	}
});
UserInformation.belongsTo(User,{
	foreignKey :{
		name: 'idUser'
	}
});

//Commercant <-n> Produit
Commercant.hasMany(Produit, {
	foreignKey:{
		name: 'idCommercant'
	}
});
Produit.belongsTo(Commercant,{
	foreignKey:{
		name: 'idCommercant'
	}
});

//User <--> Commande
User.hasMany(Commande,{
	foreignKey: {
		name: 'idUser'
	}
});
Commande.belongsTo(User,{
	foreignKey: {
		name: 'idUser'
	}
});

//User <--> Commande
Commercant.hasMany(Commande,{
	foreignKey: {
		name: 'idCommercant'
	}
});
Commande.belongsTo(Commercant,{
	foreignKey: {
		name: 'idCommercant'
	}
});


const reloadDataBase: boolean = true;
const insererJeuDonneesTest: boolean = true;


sequelize
  .authenticate()
  .then(async() => {
    logInfo('--Connection has been established successfully.--',typeMessage.Succesful);
    try {
	    await sequelize.sync({force: reloadDataBase});
	    if(insererJeuDonneesTest && reloadDataBase){
		await insertDonneesTest();
	    }
    } catch (error) {
	logInfo('Erreur de synchro avec la base:' + error.message,typeMessage.Error);
    }
  })
  .catch(function (err) {
    logInfo('!!!!!!!!!!!!!!!!!!!!!!!!!!!! Unable to connect to the database !!!!!!!!!!!!!!!!!!!!!!!!!!!!',typeMessage.Error);
	term.terminal()
  });


/*if(insererJeuDonneesTest && reloadDataBase){
	//Si on regénére la base et que l'on souhaite injecter les données test:
	logInfo("Insertion des données de test", typeMessage.Info)
	insertDonneesTest();
}
 */