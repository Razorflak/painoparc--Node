import { ITheme } from './ITheme';
export interface ICategorie{
	id?: number;
	idTheme: number;
	libelle: string;
	Theme?: ITheme;
}