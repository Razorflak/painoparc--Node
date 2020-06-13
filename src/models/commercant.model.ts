import { ICommercant } from './../interfaces/ICommercant';
import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "commercant",
		   timestamps: true
	   }
   )
   export default class Commercant extends Model implements ICommercant{
	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;
	
	@AllowNull(false)
	@NotEmpty
	@Column
	nomCommerce: string;

	@AllowNull(false)
	@NotEmpty
	@Column
	emailCommande: string;
	   
	   
   }