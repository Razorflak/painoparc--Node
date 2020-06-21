import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "panier_produit",
		   timestamps: true
	   }
   )
   export default class Panier_Produit extends Model{
	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;
	
	@AllowNull(true)
	@NotEmpty
	@Column   
	nbrProduit: number;
	   
   }