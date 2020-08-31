export interface ICommande_Produit{
	nbrProduit: number;
	nom: string;
	description: string;
	prix: number;
	commission: number;
	CommandeId?: number;
	ProduitId?: number;

}