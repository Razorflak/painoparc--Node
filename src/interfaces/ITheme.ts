import { ICategorie } from './ICategorie';
export interface ITheme {
  id?: number;
  nom: string;
  Categories?: ICategorie[];
}
