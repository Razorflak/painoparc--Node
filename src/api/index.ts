import { Router } from 'express';
import user from './routes/user';
import auth from './routes/auth';
import produit from './routes/produit';
import panier from './routes/panier';
import commande from './routes/commande';
import dev from './routes/dev';

export default () => {
	const app = Router();
	user(app);
	auth(app);
	produit(app);
	panier(app);
	commande(app);
	//camping(app);
  return app;
}