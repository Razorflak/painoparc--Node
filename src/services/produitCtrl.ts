import { IUser_Commerce_Droits } from './../interfaces/IUser_Commerce_Droit';
import HttpStatus from 'http-status-codes';
import { GeneralError } from './../error/generalError';
import { IProduit } from './../interfaces/IProduit';
import Produit from '../models/produit.model';
import User_Commerce_droit from '../models/user_commerce_droit.modele';
import Commerce from '../models/commerce.model';
import Camping from '../models/camping.model';
import User_Camping_Droit from '../models/user_camping_droit.modele';
import { logInfo } from '../error/logger';


export default class ProduitCtrl{

	/**
	 * Recupération de tous les produits commandable par l'utilisateur
	 */
	public async getAllProduitPourCommande(userId: number): Promise<Produit[]> {
		logInfo(userId.toString());
		try {
			/**
			 * TODO vérifier le SQL généré et ajouter des données dans le jeu de test pour vir si c'est OK
			 * SELECT "Produit"."id", "Produit"."nom", "Produit"."idCommerce", "Produit"."description", "Produit"."prix", "Produit"."stock", "Produit"."commission", "Produit"."isAvailable", "Produit"."createdAt", "Produit"."updatedAt", "Produit"."idCommercant", "Commerce"."id" AS "Commerce.id", "Commerce"."nomCommerce" AS "Commerce.nomCommerce", "Commerce"."emailCommande" AS "Commerce.emailCommande", "Commerce"."createdAt" AS "Commerce.createdAt", "Commerce"."updatedAt" AS "Commerce.updatedAt", "Commerce->Campings"."id" AS "Commerce.Campings.id", "Commerce->Campings"."nom" AS "Commerce.Campings.nom", "Commerce->Campings"."createdAt" AS "Commerce.Campings.createdAt", "Commerce->Campings"."updatedAt" AS "Commerce.Campings.updatedAt", "Commerce->Campings->commerce_camping"."createdAt" AS "Commerce.Campings.commerce_camping.createdAt", "Commerce->Campings->commerce_camping"."updatedAt" AS "Commerce.Campings.commerce_camping.updatedAt", "Commerce->Campings->commerce_camping"."CampingId" AS "Commerce.Campings.commerce_camping.CampingId", "Commerce->Campings->commerce_camping"."CommerceId" AS "Commerce.Campings.commerce_camping.CommerceId", "Commerce->Campings->User_Camping_Droits"."id" AS "Commerce.Campings.User_Camping_Droits.id", "Commerce->Campings->User_Camping_Droits"."UserId" AS "Commerce.Campings.User_Camping_Droits.UserId", "Commerce->Campings->User_Camping_Droits"."CampingId" AS "Commerce.Campings.User_Camping_Droits.CampingId", "Commerce->Campings->User_Camping_Droits"."droit" AS "Commerce.Campings.User_Camping_Droits.droit", "Commerce->Campings->User_Camping_Droits"."dateArrivee" AS "Commerce.Campings.User_Camping_Droits.dateArrivee", "Commerce->Campings->User_Camping_Droits"."dateDepart" AS "Commerce.Campings.User_Camping_Droits.dateDepart", "Commerce->Campings->User_Camping_Droits"."createdAt" AS "Commerce.Campings.User_Camping_Droits.createdAt", "Commerce->Campings->User_Camping_Droits"."updatedAt" AS "Commerce.Campings.User_Camping_Droits.updatedAt" 
FROM "produit" AS "Produit" 
INNER JOIN "commerce" AS "Commerce" ON "Produit"."idCommercant" = "Commerce"."id" 
INNER JOIN ( "commerce_camping" AS "Commerce->Campings->commerce_camping" 
INNER JOIN "camping" AS "Commerce->Campings" ON "Commerce->Campings"."id" = "Commerce->Campings->commerce_camping"."CampingId") ON "Commerce"."id" = "Commerce->Campings->commerce_camping"."CommerceId" 
INNER JOIN "user_camping_droit" AS "Commerce->Campings->User_Camping_Droits" ON "Commerce->Campings"."id" = "Commerce->Campings->User_Camping_Droits"."CampingId";
			 */
			var result = await Produit.findAll({
				/*where: {
					id: userId,
					isAvailable: true
				},*/
				include:[{
					model: Commerce,
					required: true,
					include: [
						{
							model: Camping,
							required: true,
							include: [
								{
									model: User_Camping_Droit,
									required: true
								}
							]
						}
					]
				}]
			});
		} catch (error) {
			throw new GeneralError(999,'Erreur dans getAllProduitPourCommande: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return result;
	}

	public async postProduit(body): Promise<boolean> {
		try {
			//TODO; Vérifier si le user à les droits pour créer ou modifier sur ce marchand
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

		if(userCommerceDroit == null){
			throw new GeneralError(999, 'Vous n\'êtes pas autorisé à créer ou modifier un produit sur ce commerce.', HttpStatus.UNAUTHORIZED);
		}
		return await Produit.upsert(body.data);
		
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