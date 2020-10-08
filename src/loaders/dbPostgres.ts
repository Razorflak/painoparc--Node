import {Sequelize, BelongsTo} from "sequelize-typescript"
import term from 'terminal-kit';
import { logInfo, typeMessage, logError } from "../error/logger";
import User from "../models/user.model";
import Camping from "../models/camping.model";
import Commerce from "../models/commerce.model";
import Commande from "../models/commande.model";
import Categorie from "../models/categorie.model";
import Produit from "../models/produit.model";
import Panier from "../models/panier.model";
import UserInformation from "../models/userInformation.model";
import { insertDonneesTest } from '../dev/insertDonneesTest';
import Panier_Produit from '../models/panier_produit.modele';
import User_Commerce_droit from '../models/user_commerce_droit.modele';
import User_Camping_Droit from "../models/user_camping_droit.modele";
import Commerce_Camping from "../models/commerce_camping.model";
import config from "../../config";
import Commerce_JourLivraisonHebdo from "../models/commerce_jourLivraisonHebdo.modele";
import Commerce_JourNonLivraison from "../models/commerce_jourNonLivraison.modele";
import Livraison from "../models/livraison.model";
import LivraisonProduit from "../models/livraisonproduit.modele";
import Theme from "../models/theme.model";



var t =__dirname + '../models';
/**
 * Initialisation de la connexion sequelize
 * TODO: Remplacer les variables de connexion et les mettre dans le .env
 */
console.log(`postgres://${config.dbPostgres.user}:${config.dbPostgres.userPwd}@${config.dbPostgres.host}:${config.dbPostgres.port}/${config.dbPostgres.name}`);
export const sequelize: Sequelize = new Sequelize(`postgres://${config.dbPostgres.user}:${config.dbPostgres.userPwd}@${config.dbPostgres.host}:${config.dbPostgres.port}/${config.dbPostgres.name}`,{
	dialect: 'postgres',
    models: [__dirname + '/../models'],
    logging: true
});    

//initialisation des jointures 
User.belongsToMany(Camping,{through: User_Camping_Droit});
Camping.belongsToMany(User,{through: User_Camping_Droit});

Camping.belongsToMany(Commerce,{through: Commerce_Camping});
Commerce.belongsToMany(Camping,{through: Commerce_Camping});


Panier.belongsToMany(Produit,{through: Panier_Produit});
Produit.belongsToMany(Panier,{through: Panier_Produit});

Commerce.belongsToMany(User,{through: User_Commerce_droit});
User.belongsToMany(Commerce,{through: User_Commerce_droit});

Produit.belongsTo(Categorie,{
	foreignKey: {
		name: 'idCategorie'
	}
});
Categorie.hasMany(Produit,{
	foreignKey: 'idCategorie'
});

Categorie.belongsTo(Theme,{
	foreignKey: {
		name: 'idTheme'
	}
});
Theme.hasMany(Categorie,{
	foreignKey: 'idTheme'
});

Livraison.belongsTo(Commande, {
	foreignKey: {
		name: 'idCommande'
	}
});
Commande.hasMany(Livraison, {
	foreignKey: {
		name: 'idCommande'
	}
});

LivraisonProduit.belongsTo(Livraison, {
	foreignKey: {
		name: 'idLivraison'
	}
});
Livraison.hasMany(LivraisonProduit, {
	foreignKey: {
		name: 'idLivraison'
	}
});


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
		name: 'idCommerce'
	}
});
Produit.belongsTo(Commerce,{
	foreignKey:{
		name: 'idCommerce'
	}
});

Commerce.hasMany(Commerce_JourLivraisonHebdo, {
	foreignKey:{
		name: 'idCommerce'
	}
});
Commerce_JourLivraisonHebdo.belongsTo(Commerce,{
	foreignKey:{
		name: 'idCommerce'
	}
});


Commerce.hasMany(Commerce_JourNonLivraison, {
	foreignKey:{
		name: 'idCommerce'
	}
});
Commerce_JourNonLivraison.belongsTo(Commerce,{
	foreignKey:{
		name: 'idCommerce'
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
/*Commerce.hasMany(Commande,{
	foreignKey: {
		name: 'idCommerce'
	}
});
Commande.belongsTo(Commerce,{
	foreignKey: {
		name: 'idCommerce'
	}
});*/


const reloadDataBase: boolean = true;
const alterDataBase: boolean = false;
const insererJeuDonneesTest: boolean = true;


sequelize
  .authenticate()
  .then(async() => {
    logInfo('--Connection has been established successfully.--',typeMessage.Succesful);
    try {
	    await sequelize.sync({alter: alterDataBase, force: reloadDataBase});
	    if(insererJeuDonneesTest && reloadDataBase){
		await insertDonneesTest();
	    }
    } catch (error) {
	logInfo('Erreur de synchro avec la base:' + error.message,typeMessage.Error);
    }
  })
  .catch(function (err) {
	  logInfo(err);
    logInfo('!!!!!!!!!!!!!!!!!!!!!!!!!!!! Unable to connect to the database !!!!!!!!!!!!!!!!!!!!!!!!!!!!',typeMessage.Error);
	term.terminal()
  });


/*if(insererJeuDonneesTest && reloadDataBase){
	//Si on regénére la base et que l'on souhaite injecter les données test:
	logInfo("Insertion des données de test", typeMessage.Info)
	insertDonneesTest();
}
 */