import { ICommerce } from '../interfaces/ICommerce';
import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "commerce",
		   timestamps: true
	   }
   )
   export default class Commerce extends Model implements ICommerce{
	
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

	@AllowNull(true)
	@Column
	description: string;

	@AllowNull(false)
	@NotEmpty
	@Column
	numeroVoie?: string;

	@AllowNull(false)
	@NotEmpty
	@Column
	libelleVoie?: string;

	@AllowNull(true)
	@Column
	BP?: string;

	@AllowNull(false)
	@NotEmpty
	@Column
	codePostal?: string;

	@AllowNull(false)
	@NotEmpty
	@Column
	commune?: string;

	@AllowNull(false)
	@NotEmpty
	@Column
	pays?: string;

	   
	   
   }