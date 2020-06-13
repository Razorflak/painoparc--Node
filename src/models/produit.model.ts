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
	idCommercant: number;

	@AllowNull(true)
	@NotEmpty
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
	@NotEmpty
	@Column
	stock: number;

	@AllowNull(true)
	@NotEmpty
	@Column({
		type: DataType.FLOAT
	})
	commission: number;
	   
	   
   }