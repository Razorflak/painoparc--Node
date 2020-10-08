import { ICategorie } from './ICategorie';
export interface ITheme {
  id?: number;
  nom: string;
  ordre: number;
  Categories?: ICategorie[];
}
