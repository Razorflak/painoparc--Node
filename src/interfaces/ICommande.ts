export interface ICommande {
	id?: number;
	idUser: number;
	idCommerce: number;
	dateCommande: Date;
	dateLivraisonPrevu: Date;
	dateReception: Date;

}