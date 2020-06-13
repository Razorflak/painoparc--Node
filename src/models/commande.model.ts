import { ICommande } from './../interfaces/ICommande';
import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "commande",
		   timestamps: true
	   }
   )
   export default class Commande extends Model implements ICommande{
	   

		@AutoIncrement
		@PrimaryKey
		@Column
		id: number;

		@AllowNull(false)
		@NotEmpty
		@Column
		idUser: number;

		@AllowNull(false)
		@NotEmpty
		@Column
		idCommercant: number;

		@AllowNull(true)
		@Column
		dateCommande: Date;

		@AllowNull(true)
		@Column
		dateLivraisonPrevu: Date;

		@AllowNull(true)
		@Column
		dateReception: Date;
   }