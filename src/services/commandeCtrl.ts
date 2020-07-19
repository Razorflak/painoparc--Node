import { IProduit } from './../interfaces/IProduit';
import { ICommerce } from './../interfaces/ICommerce';
import { ICommande_Produit } from './../interfaces/ICommande_Produit';
import HttpStatus from 'http-status-codes';
import { GeneralError } from './../error/generalError';
import { ICommande } from './../interfaces/ICommande';
import { IPanier } from './../interfaces/IPanier';
import Commande from '../models/commande.model';
import Commande_Produit from '../models/commande_produit.modele';
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

export default class CommandeCrtl{
	/**
	 * 
	 * @param panier 
	 * @param dateLivraison 
	 * 
	 *Création d'un commande à partir d'un item panier
	 */
	public async createCommandeFromPanier (panier:IPanier, dateLivraison:Date): Promise<Boolean>{
		try {
			var newCommande:ICommande = await Commande.create({
				dateCommande: new Date(),
				dateLivraisonPrevu: dateLivraison,
				idUser: panier.idUser	
			} as ICommande)
		} catch (error) {
			throw new GeneralError(999, 'Erreur lors createCommandeFromPanier sur la création de la nouvelle commande: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		try {
			panier.Produits.forEach(produit => {
				Commande_Produit.create({
					CommandeId: newCommande.id,
					ProduitId: produit.id,
					nbrProduit: produit.Panier_Produit.nbrProduit
				})
			});	
		} catch (error) {
			throw new GeneralError(999, 'Erreur lors createCommandeFromPanier sur la création des lignes Commande_Porduit: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}	
		return true;
	}

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
					totalNbrProduit += commande.Commande_Produit.nbrProduit;
					lstProduitCommande += "Emplacement: " + commande.User.UserInformation.emplacement + " Qte: " +commande.Commande_Produit.nbrProduit + '\n' ;
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