import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

   @Table(
	   {
		   tableName: "user_camping_droit",
		   timestamps: true
	   }
   )
   export default class User_Camping_Droit extends Model{
	
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
	CampingId: number;
	   
	/**
	 * Niveau de droit de l'utilisateur sur le camping pour l'édition du Camping
	 * TODO définir une énumération pour les droits (visiteur, Gérant, Admin....)
	 */
	@AllowNull(false)
	@Column
	droit: number;

	@AllowNull(true)
	@Column
	dateArrivee: Date;

	@AllowNull(true)
	@Column
	dateDepart: Date;

   }