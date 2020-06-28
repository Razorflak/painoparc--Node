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

	public async generateMailCommande(dateLivraison?:Date):Promise<String[]>{
		if(dateLivraison == null){
			dateLivraison = new Date();
			dateLivraison.setDate(dateLivraison.getDate() + 1)
		}

		var lstCommerce = await Commerce.findAll({
			include: [{
				model: Produit,
				required: true,
				include: [{
					model: Commande,
					required: true,
					where: {
						dateLivraisonPrevu: dateLivraison
					}
				}]
				
			}]
		});

		var arrayMails = new Array<String>();
		var mailResult: String = "";
		mailResult += "Bonjour,\n";
		mailResult += "Voici la commandes pour demain (" + dateLivraison.toString() + "): \n";
		
		lstCommerce.forEach(commerce => {
			(commerce as ICommerce)
		});
		return null;
	}
}