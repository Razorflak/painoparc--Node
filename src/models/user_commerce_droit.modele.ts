import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "user_commerce_droit",
		   timestamps: true
	   }
   )
   export default class User_Commerce_droit extends Model{
	
	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;
	
	@AllowNull(false)
	@NotEmpty
	@Column   
	UserId: number;

	@AllowNull(false)
	@NotEmpty
	@Column   
	CommerceId: number;
	   
	/**
	 * Niveau de droit de l'utilisateur sur le commerce pour l'édition des Porduit et du profil du commerce
	 */
	@AllowNull(false)
	@Column
	droit: number;

   }