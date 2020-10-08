import { IProduit } from './../../interfaces/IProduit';
import HttpStatus from 'http-status-codes';
import { Router } from 'express';
import { validateToken } from '../../services/authTokenCtrl';
import CommandeCrtl from '../../services/commandeCtrl';
import { consoleLog, logInfo } from '../../error/logger';


const routeCommande = Router();
export default(app: Router) => {
	
	app.use('/commande',routeCommande);
	routeCommande.use(validateToken);

	const commandeCtrl: CommandeCrtl = new CommandeCrtl();

	routeCommande.get('/getMailsCommande', async(req,res) => {
		try {
			var result = await commandeCtrl.generateMailCommande();
			res.status(HttpStatus.OK).send(result);
		} catch (error) {
			res.status(error.httpCodeError).send(error.message);
		}
	});

	routeCommande.post('/valider', async(req,res) => {
		try {
			const lstProduit: IProduit[] = JSON.parse(req.body.Produits);
			commandeCtrl.createCommande(lstProduit, req.body.dateLivraison, req.body.userId).then( result => {
				if(result){
					return res.status(HttpStatus.OK).send({result: true});
				}
			})
		} catch (error) {
			res.status(error.httpCodeError || 500).send(error.message);
		}
	})

	routeCommande.get('/lstCommandeByUser', async(req, res) => {
		const idUser: number = parseInt(req.body.userId);
		var result = await commandeCtrl.getLstCommandeByUser(idUser);
		res.status(HttpStatus.OK).send(result);
	})
}