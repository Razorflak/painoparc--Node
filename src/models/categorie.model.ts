import { ICategorie } from './../interfaces/ICategorie';
import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, DataType } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "categorie",
		   timestamps: true
	   }
   )
   export default class Categorie extends Model implements ICategorie{
	
	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;

	@AllowNull(false)
	@NotEmpty
	@Column
	idTheme: number;

	@AllowNull(false)
	@NotEmpty
	@Column
	libelle: string;


	   
   }