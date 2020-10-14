import { ITheme } from './ITheme';
import { IProduit } from "./IProduit";
import Commerce_JourNonLivraison from "../models/commerce_jourNonLivraison.modele";
import Commerce_JourLivraisonHebdo from "../models/commerce_jourLivraisonHebdo.modele";

export interface ICommerce{
	id?: number;
	nomCommerce: string;
	emailCommande: string;
	description?:string;
	Produits?: Array<IProduit>;

	// Adresse
	numeroVoie?: string;
	libelleVoie?: string;
	BP?: string;
	codePostal?: string;
	commune?: string;
	pays?: string;

	Commerce_JourNonLivraisons?: Commerce_JourNonLivraison[];
	Commerce_JourLivraisonHebdos? : Commerce_JourLivraisonHebdo[];
	Themes?: ITheme[];
}