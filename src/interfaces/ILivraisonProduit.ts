export interface ILivraisonProduit{
	id?: number;
	nbrProduit: number;
	nom: string;
	description: string;
	prix: number;
	commission: number;
	idProduit?: number;
	idLivraison?: number;
	//Le front nous enverra une liste de produits avec une date de livraison sur chacun.
	// On se charge dans le back de générer la commande ainsi que les livraison qui vont avec (une livraison par date)
	dateLivraison?: Date;

}