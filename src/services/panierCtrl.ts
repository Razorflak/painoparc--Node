import  HttpStatus  from 'http-status-codes';
import { GeneralError } from './../error/generalError';
import { IPanier } from './../interfaces/IPanier';
import Panier from '../models/panier.model';
import Produit from '../models/produit.model';
import Panier_Produit from '../models/panier_produit.modele';
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

	public async setPanier(panier:IPanier):Promise<boolean>{
		if(panier.Produits.length == 0){
			return false;
		}
		Panier.upsert(panier);
		panier.Produits.forEach(produit => {
			Panier_Produit.upsert({
				PanierId: panier.id,
				ProduitId: produit.id
			})
		});
		return null;
	}
}