import { ICommande_Produit } from './../interfaces/ICommande_Produit';
import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, DataType } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "commande_produit",
		   timestamps: true
	   }
   )
   export default class Commande_Produit extends Model implements ICommande_Produit{

	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;
	
	@AllowNull(true)
	@NotEmpty
	@Column   
	nbrProduit: number;

	@AllowNull(false)
	@NotEmpty
	@Column
	nom: String;

	@AllowNull(true)
	@Column({
		type: DataType.TEXT
	})
	description: string;

	@AllowNull(false)
	@NotEmpty
	@Column({
		type: DataType.FLOAT
	})
	prix: number;

	@AllowNull(true)
	@Column({
		type: DataType.FLOAT
	})
	commission: number;
	   
   }