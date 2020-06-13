export interface ICommande {
	id?: number;
	idUser: number;
	idCommercant: number;
	dateCommande: Date;
	dateLivraisonPrevu: Date;
	dateReception: Date;

}