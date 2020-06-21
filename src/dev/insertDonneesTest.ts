import { IPanier } from './../interfaces/IPanier';
import { ICommande_Produit } from './../interfaces/ICommande_Produit';
import { ICommande } from './../interfaces/ICommande';
import { IProduit } from './../interfaces/IProduit';
import { typeMessage } from './../error/logger';
import { IUser } from './../interfaces/IUser';
import { IPanier_Produit } from './../interfaces/IPanier_Produit';
import AuthCtrl from "../services/authCtrl";
import UserInformation from '../models/userInformation.model';
import User from '../models/user.model';
import { logInfo } from '../error/logger';
import Camping from '../models/camping.model';
import { ICommerce } from '../interfaces/ICommerce';
import Commercant from '../models/commerce.model';
import Produit from '../models/produit.model';
import Commande from '../models/commande.model';
import Commande_Produit from '../models/commande_produit.modele';
import Panier from '../models/panier.model';
import Panier_Produit from '../models/panier_produit.modele';

export async function insertDonneesTest (){
	try {
		logInfo("Insertion des données de test", typeMessage.Info)
		const authInst: AuthCtrl = new AuthCtrl();
		var {newUser} = await authInst.register({
			email: 'tanguyj35@gmail.com',
			firstName: 'Julien',
			lastName: 'Tanguy',
			password: 'azerty'
		} as IUser);
		
		UserInformation.create({
			idUser: newUser.id,
			bio: "Ceci est une bio sur une ligne unique",
			emplacement: "80a",
			adresse: "94 avenue de la Baraudière"
		});

		Camping.create({
			id: 1,
			nom: 'Parc des Rosalières'
		});

		var commerce:ICommerce = {
			emailCommande: 'Email@commercant.fr',
			nomCommerce: 'Boulangerie de Sion'
		}
		commerce = await Commercant.create(commerce);

		var produit: Array<IProduit> = [{
			idCommerce: commerce.id,
			nom: 'Baguette traditionnelle',
			prix: 1.20,
			description: 'une description MEGA longue car le mec à beaucoup de chose à dire sur sont produit de merde !!!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nsqdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd\nffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
			commission: 0.1,
			stock: 10000,
			isAvailable: true
		},{
			idCommerce: commerce.id,
			nom: 'La boule !',
			prix: 10,
			description: 'une description MEGA longue car le mec à beaucoup de chose à dire sur sont produit de merde !!!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nsqdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd\nffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
			commission: 0.1,
			stock: 2,
			isAvailable: true
			}];

		var retProd:Produit[] = await Produit.bulkCreate(produit);

		var date:Date = new Date();
		var commande: ICommande = await {
			idUser: newUser.id,
			dateCommande: new Date,
			dateLivraisonPrevu: date,
			dateReception: date,
			idCommercant: commerce.id
		};
		commande = await Commande.create(commande);

		var commandeProduit: ICommande_Produit = {
			CommandeId: commande.id,
			ProduitId: retProd[0].id,
			nbrProduit: 10
		};
		Commande_Produit.create(commandeProduit); 
		
		//Model d'Obj recu pour la création/MAJ d'un panier
		var panier:IPanier = {
			dateCreation: new Date(),
			dateMiseAJour: new Date(),
			isFavori: false,
			idUser: 1
		}
		panier = await Panier.create(panier);

		var panierProduits:IPanier_Produit = {
			PanierId: panier.id,
			ProduitId: 1,
			nbrProduit: 10
		}

		Panier_Produit.create(panierProduits);






	} catch (error) {
		logInfo("Erreur lors de l'insertion des données test: " + error.message, typeMessage.Error)
	}
	
}