import {Sequelize, BelongsTo} from "sequelize-typescript"
import term from 'terminal-kit';
import { logInfo, typeMessage, logError } from "../error/logger";
import User from "../models/user.model";
import Camping from "../models/camping.model";
import Commerce from "../models/commerce.model";
import Commande from "../models/commande.model";
import Produit from "../models/produit.model";
import Panier from "../models/panier.model";
import UserInformation from "../models/userInformation.model";
import { insertDonneesTest } from '../dev/insertDonneesTest';
import Commande_Produit from '../models/commande_produit.modele';
import Panier_Produit from '../models/panier_produit.modele';
import User_Commerce_droit from '../models/user_commerce_droit.modele';
import User_Camping_Droit from "../models/user_camping_droit.modele";


var t =__dirname + '../models';
/**
 * Initialisation de la connexion sequelize
 * TODO: Remplacer les variables de connexion et les mettre dans le .env
 */
export const sequelize: Sequelize = new Sequelize('postgres://postgres:postgres@localhost:5433/breaddelivery',{
	dialect: 'postgres',
    models: [__dirname + '/../models'],
    logging: true
});    

//initialisation des jointures 
User.hasMany(User_Camping_Droit);
Camping.hasMany(User_Camping_Droit);

Camping.belongsToMany(Commerce, {through: 'commerce_camping'});
Commerce.belongsToMany(Camping, {through: 'commerce_camping'});

Commande.belongsToMany(Produit, {
	through : Commande_Produit
});
Produit.belongsToMany(Commande, {
	through : Commande_Produit
});

/*Panier_Produit.belongsToMany(Produit, {
	through : Panier_Produit
});
Panier_Produit.belongsToMany(Panier, {
	through : Panier_Produit
});*/
Panier.hasMany(Panier_Produit);
Produit.hasMany(Panier_Produit);

Commerce.hasMany(User_Commerce_droit);
User.hasMany(User_Commerce_droit);



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

//Commerce <-n> Produit
Commerce.hasMany(Produit, {
	foreignKey:{
		name: 'idCommercant'
	}
});
Produit.belongsTo(Commerce,{
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

//User <--> Panier
User.hasMany(Panier,{
	foreignKey: {
		name: 'idUser'
	}
});
Panier.belongsTo(User,{
	foreignKey: {
		name: 'idUser'
	}
});

//Commercant <--> Commande
Commerce.hasMany(Commande,{
	foreignKey: {
		name: 'idCommercant'
	}
});
Commande.belongsTo(Commerce,{
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