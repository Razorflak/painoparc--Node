import  HttpStatus  from 'http-status-codes';
import { Router } from 'express';
import { validateToken } from '../../services/authTokenCtrl';
import PanierCtrl from '../../services/panierCtrl';

const routePanier = Router();
export default(app: Router) => {


app.use('/panier',routePanier);

const panierCtrl: PanierCtrl = new PanierCtrl();
routePanier.use(validateToken);

routePanier.get('/getCurrentPanier', async(req,res) => {
	try {
		var panier = await panierCtrl.getCurrentPanier(parseInt(req.body.userId));	
		res.status(HttpStatus.OK).send(panier);
	} catch (error) {
		res.status(error.httpCodeError | 500).send(error.message);
	}
});

routePanier.post('/savePanier', async(req, res) => {
	try {
		var panier = await panierCtrl.setPanier(req.body);
		res.status(HttpStatus.OK).send(panier);
	} catch (error) {
		res.status(error.httpCodeError | 500).send(error.message);
	}
})

routePanier.post('/majInfoPanier', async(req, res) => {
	try {
		var panier = await panierCtrl.majInfoPanier(req.body.Produits);
		res.status(HttpStatus.OK).send(panier);
	} catch (error) {
		res.status(error.httpCodeError | 500).send(error.message);
	}
})

}