import { ITheme } from './ITheme';
import { IProduit } from "./IProduit";
import Commerce_JourNonLivraison from "../models/commerce_jourNonLivraison.modele";
import Commerce_JourLivraisonHebdo from "../models/commerce_jourLivraisonHebdo.modele";

export interface ICommerce{
	id?: number;
	nomCommerce: string;
	emailCommande: string;
	Produits?: Array<IProduit>;
	Commerce_JourNonLivraisons?: Commerce_JourNonLivraison[];
	Commerce_JourLivraisonHebdos? : Commerce_JourLivraisonHebdo[];
	Themes?: ITheme[];
}