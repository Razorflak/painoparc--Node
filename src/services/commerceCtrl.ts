import HttpStatus from 'http-status-codes';
import { GeneralError } from './../error/generalError';
import { logInfo, typeMessage } from "../error/logger";
import { ICommerce } from "../interfaces/ICommerce";
import Camping from "../models/camping.model";
import Commerce from "../models/commerce.model";
import Produit from "../models/produit.model";
import Categorie from "../models/categorie.model";
import Commerce_JourLivraisonHebdo from "../models/commerce_jourLivraisonHebdo.modele";
import Commerce_JourNonLivraison from "../models/commerce_jourNonLivraison.modele";
import User from "../models/user.model";

export default class CommerceCtrl{
	public async getLstCommerceForUser(userId: number): Promise<ICommerce[]> {
		try {
			var arrayFieldsCommerce = [];
			var result = await Commerce.findAll({
				//attributes: arrayFieldsCommerce,
				include: [{
					model: Commerce_JourLivraisonHebdo
				},
				{
					model: Commerce_JourNonLivraison
				},
				{
					model: Camping,
					include: [{
						model: User,
						where: {
							id: userId
						}
					}]
				},
				{
					model: Produit,
					required: true,
					include: [{
						model: Categorie
					}]
				}
				]
			});
			return result;
		} catch (error) {
			logInfo(error.message,typeMessage.Error);			
			throw new GeneralError(999,'Erreur dans getAllProduitPourCommande: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
