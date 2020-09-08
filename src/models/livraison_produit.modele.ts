import { ILivraison_Produit } from '../interfaces/ILivraison_Produit';
import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, DataType } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "livraison_produit",
		   timestamps: true
	   }
   )
   export default class Livraison_Produit extends Model implements ILivraison_Produit{

	
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
	nom: string;

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