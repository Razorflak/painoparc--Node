import { IProduit } from './IProduit';
export interface IPanier {
	id?: number;
	idUser: number;
	nom?: string;
	dateCreation: Date;
	dateMiseAJour: Date;
	isFavori: Boolean;
	isEnCours: Boolean;
	Produits?: Array<IProduit>
}