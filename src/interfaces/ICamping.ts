export interface ICamping{
	id: number;
	nom: string;
	
	lieuReceptionCommande?: string;

	//Heures de réception
	reception_debut?: string; //exemple: '9' = 9h00  '9.30' = 9h30
	reception_fin?: string;

	// Adresse
	adresse_numero?: string;
	adresse_rue?: string;
	adresse_codePostal?:string;
	adresse_ville?:string;
	adresse_pays?:string;
}