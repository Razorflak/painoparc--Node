import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "commerce_camping",
		   timestamps: true
	   }
   )
   export default class Commerce_Camping extends Model{
	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;
	
	@AllowNull(false)
	@NotEmpty
	@Column   
	CampingId: number;

	@AllowNull(false)
	@NotEmpty
	@Column   
	CommerceId: number;

   }