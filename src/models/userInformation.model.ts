import { type } from 'os';

import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, DataType } from 'sequelize-typescript';
import { IUserInformation } from '../interfaces/IUserInformation';

   @Table(
	   {
		   tableName: "userinformation",
		   timestamps: true
	   }
   )
   export default class UserInformation extends Model implements IUserInformation{
	
	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;

	@AllowNull(false)
	@NotEmpty
	@Column
	idUser: number;

	@AllowNull(true)
	@Column({
		type: DataType.TEXT
	})
	bio: string;

	@AllowNull(true)
	@NotEmpty
	@Column
	emplacement: string;

	@AllowNull(true)
	@NotEmpty
	@Column
	adresse: string;

	@AllowNull(false)
	@NotEmpty
	@Column
	qualite: string;
	
	@AllowNull(false)
	@NotEmpty
	@Column
	nom: string;

	@AllowNull(false)
	@NotEmpty
	@Column
	prenom: string;
	   
	   
   }