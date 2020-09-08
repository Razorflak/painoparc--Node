import { ILivraison_Produit } from './ILivraison_Produit';
import { IUser } from './IUser';
export interface ILivraison {
	id?: number;
	idCommande: number;
	dateLivraisonPrevu: Date;
	dateReception?: Date;
	idUtilisateurReception?: number;

	Livraison_Produits?: ILivraison_Produit[];
}