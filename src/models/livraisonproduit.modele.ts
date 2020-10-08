import { ILivraisonProduit } from '../interfaces/ILivraisonProduit';
import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, DataType } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "livraison_produit",
		   timestamps: true
	   }
   )
   export default class LivraisonProduit extends Model implements ILivraisonProduit{

	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;

	@AllowNull(false)
	@NotEmpty
	@Column   
	idLivraison: number;

	//Copie de l'id du produit d'origine pour gardé un lien
	@AllowNull(false)
	@NotEmpty
	@Column 
	idProduit?: number;
	
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