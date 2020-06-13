import { ICommande } from './../interfaces/ICommande';
import { IProduit } from './../interfaces/IProduit';
import { typeMessage } from './../error/logger';
import { IUser } from './../interfaces/IUser';
import AuthCtrl from "../services/authCtrl";
import UserInformation from '../models/userInformation.model';
import User from '../models/user.model';
import { logInfo } from '../error/logger';
import Camping from '../models/camping.model';
import { ICommercant } from '../interfaces/ICommercant';
import Commercant from '../models/commercant.model';
import Produit from '../models/produit.model';
import Commande from '../models/commande.model';
import Commane_Produit from '../models/commande_product.modele';
import Commande_Produit from '../models/commande_product.modele';

export async function insertDonneesTest (){
	try {
		logInfo("Insertion des données de test", typeMessage.Info)
		const authInst: AuthCtrl = new AuthCtrl();
		var {newUser} = await authInst.register({
			email: 'julien.tanguy35@gmail.com',
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

		var commercant:ICommercant = {
			emailCommande: 'Email@commercant.fr',
			nomCommerce: 'Boulangerie de Sion'
		}
		commercant = await Commercant.create(commercant);

		var produit:IProduit = {
			idCommercant: commercant.id,
			nom: 'Baguette traditionnelle',
			prix: 1.20,
			description: 'une description MEGA longue car le mec à beaucoup de chose à dire sur sont produit de merde !!!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nsqdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd\nffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
			commission: 0.1,
			stock: 10000
		};

		var retProd:Produit = await Produit.create(produit);

		var date:Date = new Date();
		var commande: ICommande = {
			idUser: newUser.id,
			dateCommande: new Date,
			dateLivraisonPrevu: date,
			dateReception: date,
			idCommercant: commercant.id
		};
		commande = await Commande.create(commande);
		Commande_Produit.create(commande);
		

		

	} catch (error) {
		logInfo("Erreur lors de l'insertion des données test: " + error.message, typeMessage.Error)
	}
	
}