import { IUser } from './IUser';
import { ICommande_Produit } from './ICommande_Produit';
export interface ICommande {
	id?: number;
	idUser: number;
	dateCommande: Date;
	dateLivraisonPrevu: Date;
	dateReception: Date;

	//En fonction des retour de sequelize, les array qui peuvent venir avec les Commande
	Commande_Produit?: ICommande_Produit;
	User?:IUser;
}