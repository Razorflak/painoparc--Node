import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';
import { ICommerce_JourLivraisonHebdo } from '../interfaces/ICommerce_JourLivraisonHebdo';

   @Table(
	   {
		   tableName: "commerce_jourlivraisonhebdo",
		   timestamps: true
	   }
   )
   export default class Commerce_JourLivraisonHebdo extends Model implements ICommerce_JourLivraisonHebdo{
	
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