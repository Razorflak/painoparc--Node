import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "commerce_jourlivraisonhebdo",
		   timestamps: true
	   }
   )
   export default class Commerce_JourLivraisonHebdo extends Model {
	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;
	
	@AllowNull(false)
	@NotEmpty
	@Column
	CommerceId: number;

	//Jour de la semain en number en partant de 0 = Dimanche, jusqu'a 6 = Samedi
	@AllowNull(false)
	@NotEmpty
	@Column
	jour: number;

	@AllowNull(false)
	@NotEmpty
	@Column
	isLivrable: boolean;
	   
	   
   }