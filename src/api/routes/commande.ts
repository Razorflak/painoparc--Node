import HttpStatus from 'http-status-codes';
import { Router } from 'express';
import { validateToken } from '../../services/authTokenCtrl';
import CommandeCrtl from '../../services/commandeCtrl';


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

	routeCommande.post('/postCreateCommandeFromPanier', async(req,res) => {
		try {
			if(commandeCtrl.createCommandeFromPanier(req.body.panier,req.body.dateLivraison)){
				res.status(HttpStatus.OK).send('ok');
			}
		} catch (error) {
			res.status(error.httpCodeError).send(error.message);
		}
	})
}