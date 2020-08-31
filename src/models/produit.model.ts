import { IProduit } from './../interfaces/IProduit';
import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, DataType } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "produit",
		   timestamps: true
	   }
   )
   export default class Produit extends Model implements IProduit{
	
	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;

	@AllowNull(false)
	@NotEmpty
	@Column
	nom: string;

	@AllowNull(false)
	@NotEmpty
	@Column
	idCommerce: number;

	@AllowNull(false)
	@NotEmpty
	@Column
	idCategorie: number;

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
	@Column
	stock: number;

	@AllowNull(true)
	@Column({
		type: DataType.FLOAT
	})
	commission: number;
	
	@AllowNull(false)
	@NotEmpty
	@Column({
		type: DataType.BOOLEAN
	})
	isAvailable: boolean;

	@AllowNull(true)
	@Column({
		type: DataType.INTEGER
	})
	delaiProduction: number;

	@AllowNull(true)
	@Column
	imgFileName:String;

	   
   }