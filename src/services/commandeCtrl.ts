import { ILivraison_Produit } from './../interfaces/ILivraison_Produit';
import { IProduit } from './../interfaces/IProduit';
import { ICommerce } from './../interfaces/ICommerce';
import HttpStatus from 'http-status-codes';
import { GeneralError } from './../error/generalError';
import { ICommande } from './../interfaces/ICommande';
import { IPanier } from './../interfaces/IPanier';
import Commande from '../models/commande.model';
import Commande_Produit from '../models/livraison_produit.modele';
import Produit from '../models/produit.model';
import Commerce from '../models/commerce.model';
import { where } from 'sequelize';
import { Op } from 'sequelize';
import { logInfo, logDev } from '../error/logger';
import produit from '../api/routes/produit';
import User from '../models/user.model';
import user from '../api/routes/user';
import UserInformation from '../models/userInformation.model';
import moment from 'moment';
import { ILivraison } from '../interfaces/ILivraison';
import Livraison from '../models/livraison.model';
import Livraison_Produit from '../models/livraison_produit.modele';

export default class CommandeCrtl{
	/**
	 * 
	 * @param panier 
	 * @param dateLivraison 
	 * 
	 *Création d'un commande à partir d'un item panier
	 */
	public async createCommande (lstProduits: ILivraison_Produit[], idUser: number): Promise<Boolean>{
		if (lstProduits.length == 0){
			return false;
		}
		try {
			var newCommande:ICommande = await Commande.create({
				dateCommande: new Date(),
				idUser: idUser	
			} as ICommande)
		} catch (error) {
			throw new GeneralError(999, 'Erreur lors createCommandeFromPanier sur la création de la nouvelle commande: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		const lstLivraisons: ILivraison[] = new Array();
		lstProduits.forEach(produit => {
			//Recherche d'une livraison avec la même date que celle indiqué sur le produit
			let existLivraison: ILivraison = lstLivraisons.find(livraison => livraison.dateLivraisonPrevu === produit.dateLivraison);
			//Si elle n'existe pas on créer une nouvelle livraison
			if ( existLivraison === undefined) {
				existLivraison = {
					dateLivraisonPrevu: produit.dateLivraison,
					idCommande: newCommande.id,  
				}
			}

			if ( existLivraison.Livraison_Produits === undefined) {
				existLivraison.Livraison_Produits = new Array();
			}

			existLivraison.Livraison_Produits.push(produit);
		});

		Livraison.bulkCreate(lstLivraisons);
		lstLivraisons.forEach(element => {
			Livraison_Produit.bulkCreate(element.Livraison_Produits);
		});
	}

	// TODO: Peut être à déplacer ailleur dans une class Util plus générique

	/**
	 * Génération du mail mail de commande à envoyer au Commerce.
	 * @param dateLivraison date pour laquelle on souahite générer le mail. Si null, la date est celle de demain
	 */
	public async generateMailCommande(dateLivraison?:Date):Promise<String[]>{
		if(dateLivraison == null){
			dateLivraison = new Date();
			dateLivraison.setDate(dateLivraison.getDate() + 1)
		}

		//TODO: Fonctionne comme ça, mais sera sans doute à revoir pour les date, ça semble être le bordel avec UTC+2
		var lstCommerce:Array<ICommerce> = await Commerce.findAll({
			include: [{
				model: Produit,
				required: true,
				include: [{
					model: Commande,
					required: true,
					where: {
						dateLivraisonPrevu: {
							[Op.between]: [moment(dateLivraison).hours(0).minutes(1).toString(),moment(dateLivraison).hours(23).minutes(59).toString()]
						}
					},
					include: [{
						model: User,
						include: [UserInformation]
					}]
				}]
				
			}]
		});

		var arrayMails = new Array<String>();
		var mailResult: String = "";
		
		
		lstCommerce.forEach(commerce => {
			mailResult += "Bonjour,\n";
			mailResult += "Voici la commande pour demain (" + dateLivraison.toString() + "): \n";
			commerce.Produits.forEach(produit =>{
				
				var totalNbrProduit: number = 0;
				var lstProduitCommande: String = "";
				produit.Commandes.forEach(commande => {
					//totalNbrProduit += commande.Commande_Produit.nbrProduit;
					//lstProduitCommande += "Emplacement: " + commande.User.UserInformation.emplacement + " Qte: " +commande.Commande_Produit.nbrProduit + '\n' ;
				});
				mailResult += produit.nom + " Qte Total: " + totalNbrProduit + "\n";
				mailResult += lstProduitCommande.toString();
			});
			mailResult += "Merci ! \n";
			arrayMails.push(mailResult);
		});

		logInfo(JSON.stringify(arrayMails));
		return arrayMails;
	}
}