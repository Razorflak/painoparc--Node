import { ICategorie } from './../interfaces/ICategorie';
import { IUser_Commerce_Droits } from './../interfaces/IUser_Commerce_Droit';
import { ICamping } from './../interfaces/ICamping';
import { ICommerce_Camping } from './../interfaces/ICommerce_Camping';
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
import Produit from '../models/produit.model';
import Commande from '../models/commande.model';
import Commande_Produit from '../models/commande_produit.modele';
import Panier from '../models/panier.model';
import Panier_Produit from '../models/panier_produit.modele';
import Commerce_Camping from '../models/commerce_camping.model';
import User_Camping_Droit from '../models/user_camping_droit.modele';
import Commerce from '../models/commerce.model';
import Categorie from '../models/categorie.model';

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

		var camping:ICamping = await Camping.create({
			id: 1,
			nom: 'Parc des Rosalières'
		});

		Camping.create({
			id: 2,
			nom: 'Parc des Rosalières'
		});

		var commerce: ICommerce = await Commerce.create({
			emailCommande: 'Email@commercant.fr',
			nomCommerce: 'Boulangerie de Sion'
		});

		var categoriePain:ICategorie = await Categorie.create({
			libelle: 'Pain'
		} as ICategorie);

		var categorieVienposerie:ICategorie = await Categorie.create({
			libelle: 'Viennoiseries'
		} as ICategorie);

		var produit: Array<IProduit> = [{
			idCommerce: commerce.id,
			idCategorie: categoriePain.id,
			nom: 'Baguette traditionnelle',
			prix: 1.20,
			description: 'une description MEGA longue car le mec à beaucoup de chose à dire sur sont produit de merde !!!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nsqdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd\nffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
			commission: 0.1,
			stock: 10000,
			isAvailable: true
		},{
			idCommerce: commerce.id,
			idCategorie: categoriePain.id,
			nom: 'La boule !',
			prix: 10,
			description: 'une description MEGA longue car le mec à beaucoup de chose à dire sur sont produit de merde !!!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nsqdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd\nffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
			commission: 0.1,
			stock: 2,
			isAvailable: true
			},{
			idCommerce: commerce.id,
			idCategorie: categorieVienposerie.id,
			nom: 'Les bon pain au chocolat',
			prix: 1.2,
			description: 'une description MEGA longue car le mec à beaucoup de chose à dire sur sont produit de merde !!!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nsqdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd\nffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
			commission: 0.1,
			stock: 100000000,
			isAvailable: true
			}];

		var retProd:Produit[] = await Produit.bulkCreate(produit);

		var date:Date = new Date();
		date.setDate(date.getDate() + 1);
		var commande: ICommande = await {
			idUser: newUser.id,
			dateCommande: new Date,
			dateLivraisonPrevu: date,
			dateReception: date
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
			idUser: 1,
			isEnCours: true
		}
		panier = await Panier.create(panier);

		var panierProduits:IPanier_Produit = {
			PanierId: panier.id,
			ProduitId: 1,
			nbrProduit: 10
		}

		Panier_Produit.create(panierProduits);
		Commerce_Camping.create({
			CampingId: camping.id,
			CommerceId: commerce.id
		} as ICommerce_Camping);
		User_Camping_Droit.create({
			CampingId: camping.id,
			UserId: newUser.id,
			droit: 0
		});

		




	} catch (error) {
		logInfo("Erreur lors de l'insertion des données test: " + error.message, typeMessage.Error)
	}
	
}