import HttpStatus from 'http-status-codes';
import { IProduit } from './../../interfaces/IProduit';
import { GeneralError } from './../../error/generalError';
import { Router, Request, Response } from 'express';
import { validateToken } from '../../services/authTokenCtrl';
import Produit from '../../models/produit.model';
import ProduitCtrl from '../../services/produitCtrl';
import { logInfo } from '../../error/logger';

const routeProduit = Router();
export default(app: Router) => {

app.use('/produit',routeProduit);

const produitCtrl: ProduitCtrl = new ProduitCtrl();
routeProduit.use(validateToken);



routeProduit.post('/createupdate', async(req, res) => {
	try {
		var ok:boolean = await produitCtrl.postProduit(req.body);
		res.status(HttpStatus.OK).send();
	} catch (error) {
		res.status(error.httpCodeError).send(error.message);
	}
});

/**
 * Route poiur retourner tous les produits possiblement commandable par l'utilisateur du token
 */
routeProduit.get('/allProduitPourCommande',async(req, res) => {
	
	try{
		var result = await produitCtrl.getAllProduitPourCommande(parseInt(req.body.userId));
		res.status(HttpStatus.OK).send(result);
	}catch(error){
		res.status(error.httpCodeError | 500).send(error.message);
	}
});

/**
 * TODO; Sans doute à changer, car ça intercepte tout et donc pas de possibilité de 404... C'est naze!
 */
routeProduit.get('/:id',async (req: Request, res: Response) => {
	try {
		var id = req.params.id;
		var produit: IProduit = await produitCtrl.getProduitById(id);
		res.status(HttpStatus.OK).send(produit);
	} catch (error) {
		throw new GeneralError(999,'Erreur lors de l\'appel produit/id: ' + error.message,500)
	}
});


}