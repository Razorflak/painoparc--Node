import { IUser } from './../interfaces/IUser';
import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "user",
		   timestamps: true
	   }
   )
   export default class User extends Model implements IUser{
	   
	   @AutoIncrement
	   @PrimaryKey
	   @Column
	   id: number;

	   @AllowNull(false)
	   @NotEmpty
	   @Column
	   firstName: string;

	   @AllowNull(false)
	   @NotEmpty
	   @Column
	   lastName: string;

	   @AllowNull(false)
	   @NotEmpty
	   @Column
	   email!: string;

	   @AllowNull(false)
	   @NotEmpty
	   @Column
	   password: string;

	   isAdmin: number;
   }