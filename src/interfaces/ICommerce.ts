import { IProduit } from "./IProduit";

export interface ICommerce{
	id?: number;
	nomCommerce: string;
	emailCommande: string;
	Produits?: Array<IProduit>
}