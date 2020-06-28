import { IPanier_Produit } from './IPanier_Produit';
export interface IProduit{
	id?: number;
	idCommerce: number;
	idCategorie: number;
	nom: string;
	description: string;
	prix: number;
	stock: number;
	commission: number;
	isAvailable: boolean;
	Panier_Produit?: IPanier_Produit;
}