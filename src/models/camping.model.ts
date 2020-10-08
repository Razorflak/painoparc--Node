import { ICamping } from './../interfaces/ICamping';
import { IUser } from '../interfaces/IUser';
import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "camping",
		   timestamps: true
	   }
   )
   export default class Camping extends Model implements ICamping{
	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;

	@AllowNull(false)
	@NotEmpty
	@Column
	nom: string;
	
	@AllowNull(true)
	@Column
	lieuReceptionCommande?: string;

	//Heures de réception
	@AllowNull(true)
	@Column
	reception_debut?: string; //exemple: '9' = 9h00  '9.30' = 9h30
	@AllowNull(true)
	@Column
	reception_fin?: string;

	// Adresse
	@AllowNull(true)
	@Column
	adresse_numero?: string;
	@AllowNull(true)
	@Column
	adresse_rue?: string;
	@AllowNull(true)
	@Column
	adresse_codePostal?:string;
	@AllowNull(true)
	@Column
	adresse_ville?:string;
	@AllowNull(true)
	@Column
	adresse_pays?:string;
	   
	   
   }