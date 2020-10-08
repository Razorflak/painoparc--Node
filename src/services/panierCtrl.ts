import { ICategorie } from './../interfaces/ICategorie';
import { IProduit } from './../interfaces/IProduit';
import  HttpStatus  from 'http-status-codes';
import { GeneralError } from './../error/generalError';
import { IPanier } from './../interfaces/IPanier';
import Panier from '../models/panier.model';
import Produit from '../models/produit.model';
import Panier_Produit from '../models/panier_produit.modele';
import Categorie from '../models/categorie.model';
import Commerce from '../models/commerce.model';
import { Op } from 'sequelize';
export default class PanierCtrl{
	

	public async getCurrentPanier(idUser:number):Promise<IPanier>{
		try {
			var arrayFieldsProduit = ['id','nom','description','prix','stock'];
			var panier = await Panier.findOne({
				where: {
					isEnCours: true,
					idUser: idUser
				},
				include: [{
					model: Produit,
					attributes: arrayFieldsProduit
				}]
			})
		} catch (error) {
			throw new GeneralError(999,'Erreur lors de getCurrentPanier: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
		return panier;
	}

	public async setPanier(panier:IPanier):Promise<IPanier>{

		/**
		 * Gestion de create et Update différente car on a besoin de retourner l'id du panier lors de la création et upsert ne nous renvoie qu'un boolean...
		 */
		if (panier.id === undefined){
			panier = await Panier.create(panier);
		}else{
			Panier.upsert(panier);
		}
		
		panier.Produits.forEach(produit => {
			Panier_Produit.upsert({
				PanierId: panier.id,
				ProduitId: produit.id,
				nbrProduit: (produit.Panier_Produit.nbrProduit === undefined) ? 0 : produit.Panier_Produit.nbrProduit
			})
		});
		return panier;
	}

	public async getHistoriquePanierUser(idUser:number):Promise<IPanier[]>{
		try {
			var lstPanier:Array<IPanier> = await Panier.findAll({
				where: {
					idUser: idUser
				}
			});
	
			return lstPanier;	
		} catch (error) {
			throw new GeneralError(999,'Erreur lors de getHistoriquePanierUser: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async majInfoPanier(produits: IProduit[]): Promise<ICategorie[]> {

		var arrayIdProduit: number[] = new Array();
		produits.forEach(elem => arrayIdProduit.push(elem.id));
		var result: ICategorie[] = await Categorie.findAll({
			include: [{
				model: Produit,
				include: [{
					model: Commerce
				}],
				where: {
					id: {
						[Op.in]: arrayIdProduit
					}
				}
			}]
		});
		return result;

	}
}