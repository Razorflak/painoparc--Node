import { Router } from 'express';
import Commerce from '../../models/commerce.model';
import Commerce_JourLivraisonHebdo from '../../models/commerce_jourLivraisonHebdo.modele';
import { Op } from 'sequelize';
import { col } from 'sequelize/types/lib/operators';
import Commerce_JourNonLivraison from '../../models/commerce_jourNonLivraison.modele';


const route = Router();
export default (app: Router) => {

	//Initialisation des instance de controleur


	app.use('/dev', route);

	route.get('/test', async(req, res) => {
		const result = await Commerce.findAll({
			include: [
				{
					model: Commerce_JourNonLivraison,
					on: {
						'$Commerce.id$' : { [Op.col]: 'Commerce_JourNonLivraisons.CommerceId' }
					},
					required: false
				}
			]
		});
		res.send(result);
	})

}