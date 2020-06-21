import { Router } from 'express';
import user from './routes/user';
import auth from './routes/auth';
import produit from './routes/produit';

export default () => {
	const app = Router();
	user(app);
	auth(app);
	produit(app);

  return app;
}