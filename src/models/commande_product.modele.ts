import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "commande_produit",
		   timestamps: true
	   }
   )
   export default class Commande_Produit extends Model{
	
	
	@AllowNull(true)
	@NotEmpty
	@Column   
	nbrProduit: number;
	   
   }