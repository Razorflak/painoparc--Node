import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "commerce_journonlivraison",
		   timestamps: true
	   }
   )
   export default class Commerce_JourNonLivraison extends Model {
	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;
	
	@AllowNull(false)
	@NotEmpty
	@Column
	CommerceId: number;

	//Jour de non livraison exceptionnel (Vancances ou autre)
	@AllowNull(false)
	@NotEmpty
	@Column
	date: Date;

	@AllowNull(false)
	@NotEmpty
	@Column
	isLivrable: boolean;
	   
	   
   }