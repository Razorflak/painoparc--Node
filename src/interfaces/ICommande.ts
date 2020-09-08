import { ILivraison } from './ILivraison';
import { IUser } from './IUser';
export interface ICommande {
	id?: number;
	idUser: number;
	dateCommande: Date;

	User?:IUser;

	Livraisons?: ILivraison[];
}