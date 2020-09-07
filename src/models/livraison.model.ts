import { ILivraison } from './../interfaces/ILivraison';
import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "livraison",
		   timestamps: true
	   }
   )
   export default class Livraison extends Model implements ILivraison{

		@AutoIncrement
		@PrimaryKey
		@Column
		id: number;

		@AllowNull(false)
		@Column
		idCommande: number;

		@AllowNull(true)
		@Column
		dateReception: Date;
		
		@AllowNull(true)
		@Column
		dateLivraisonPrevu: Date;

		@AllowNull(true)
		@Column
		idUtilisateurReception?: number;
   }