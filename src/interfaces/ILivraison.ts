import { ILivraisonProduit } from './ILivraisonProduit';
import { IUser } from './IUser';
export interface ILivraison {
	id?: number;
	idCommande: number;
	dateLivraisonPrevu: Date;
	dateReception?: Date;
	idUtilisateurReception?: number;

	LivraisonProduits?: ILivraisonProduit[];
}