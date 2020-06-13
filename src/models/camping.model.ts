import { ICamping } from './../interfaces/ICamping';
import { IUser } from '../interfaces/IUser';
import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "camping",
		   timestamps: true
	   }
   )
   export default class Camping extends Model implements ICamping{
	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;

	@AllowNull(false)
	@NotEmpty
	@Column
	nom: string;
	   
	   
   }