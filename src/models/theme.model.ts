import { ITheme } from './../interfaces/ITheme';
import { Table, Model, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';
import { ICategorie } from '../interfaces/ICategorie';
@Table(
	{
		tableName: "theme",
		timestamps: true
	}
)
export default class Theme extends Model implements ITheme{

	@AutoIncrement
	@PrimaryKey
	@Column
	id: number;


	@AllowNull(false)
	@NotEmpty
	@Column
	nom: string;

}