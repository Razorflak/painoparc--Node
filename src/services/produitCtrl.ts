import { ITheme } from './../interfaces/ITheme';
import { ICommerce } from './../interfaces/ICommerce';
import { IUser_Commerce_Droits } from './../interfaces/IUser_Commerce_Droit';
import HttpStatus from 'http-status-codes';
import { GeneralError } from './../error/generalError';
import { IProduit } from './../interfaces/IProduit';
import Produit from '../models/produit.model';
import User_Commerce_droit from '../models/user_commerce_droit.modele';
import Commerce from '../models/commerce.model';
import Camping from '../models/camping.model';
import User_Camping_Droit from '../models/user_camping_droit.modele';
import { logInfo, typeMessage, logError } from "../error/logger";
import Commerce_Camping from '../models/commerce_camping.model';
import User from '../models/user.model';
import Categorie from '../models/categorie.model';
import Theme from '../models/theme.model';


export default class ProduitCtrl{

	/**
	 * Recupération de tous les produits commandable par l'utilisateur
	 */
	public async getProduitByCommerce(userId: number, idCommerce: number): Promise<any> {
		try {
			//TODO Définir les champs de Commerce et Porduit à afficher à afficher une fois le modèle complet
			/**
			 * Récupération des produit commandable sur le camping de l'utilisateur
			 */
			var arrayFieldsComerce = ['id','nomCommerce'];
			var arrayFieldsProduit = ['id','nom','description','prix','stock'];
			var resultCommerce: ICommerce = await Commerce.findOne({
				include: [{
					model: Camping,
					required: true,
					include: [{
						model: User,
						required: true,
						where: {
							id: userId
						}
					}]
				}],
				where: {
					id: idCommerce
				}
			});

			var resultThemeProd: ITheme[];
			if (resultCommerce !== undefined){
				resultThemeProd = await Theme.findAll({
					include: [{
						model: Categorie,
						include: [{
							model: Produit,
							include: [{
								attributes: [],
								model: Commerce,
								required: true,
								where: {
									id: idCommerce
								}
							}]
						}]
					}],
					order: ['ordre']
				});
				//resultCommerce.Themes = resultThemeProd;

			}

		} catch (error) {
			logInfo(error.message,typeMessage.Error);
			throw new GeneralError(999,'Erreur dans getAllProduitPourCommande: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		var result = {
			Commerce: resultCommerce,
			Themes: resultThemeProd
		}
		resultCommerce.Themes = await new Array();
		resultCommerce.Produits = new Array();
		return result;
	}

	public async postProduit(body): Promise<boolean> {
		try {
			var produit:IProduit = body.produit;
			var commerceId: number = produit.idCommerce;
			var userId: number = body.userId;

			//Récupération de la ligne de droit pour l'utilisateur du token et le commerce lié au produit
			var userCommerceDroit: IUser_Commerce_Droits = await User_Commerce_droit.findOne({
				where: {
					UserId: userId,
					CommerceId: commerceId
				}
			});
		} catch (error) {
			throw new GeneralError(999,'Erreur lors du postProduit: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if(userCommerceDroit == null || userCommerceDroit.droit < 2){
			throw new GeneralError(999, 'Vous n\'êtes pas autorisé à créer ou modifier un produit sur ce commerce.', HttpStatus.UNAUTHORIZED);
		}
		return await Produit.upsert(produit);
		
	}

	public async getProduitById(id):Promise<IProduit>{
		try {
			return Produit.findOne({
				where:{
					id: id
				}
			});
		} catch (error) {
			throw new GeneralError(999,'Erreur lors de l\'appel produit/id: ' + error.message,HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
