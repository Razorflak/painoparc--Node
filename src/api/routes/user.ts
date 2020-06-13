import { Router, Request, Response } from 'express';
import Logger from '../../loaders/logger';
import UserCtrl from '../../services/authCtrl';
import { IUser } from '../../interfaces/IUser';
import User from '../../models/user.model';
import { error } from 'winston';
import AuthCtrl from '../../services/authCtrl';

const route = Router();
export default (app: Router) => {

	//Initialisation des instance de controleur
	var ctrlUser: UserCtrl = new UserCtrl();
	var ctrlAuth: AuthCtrl = new AuthCtrl();


	app.use('/users', route);
	app.get('/test',(req,res) => {
		Logger.info("Wd??");
		res.status(500).send('Something broke!');
	});


	app.post("/register",(req: Request, res: Response) => {
		
		const userPromise = ctrlUser.register(req.body as IUser);	
		userPromise.then(newUser =>{
			return res.status(200).json(newUser);
		}).catch (err =>{
			return res.status(err.httpCodeError).json(err.message);
		});
	});
	
	app.post("/login", async (req: Request, res: Response) => {
		try {
			const {user, token} = await ctrlUser.login(req.body as IUser);
			return res.status(200).json({
				user: user,
				token: token
			})
		} catch (error) {
			return res.status(error.httpCodeError).json(error.message);
		}
		
		/*loginPromise.then(token =>{
			return res.status(200).json(token);
		}).catch(error => {
			return res.status(500).json(error.message);
		})*/
	});

	app.get("/profil",async(req: Request, res: Response) => {
		try {
			const userProfil:User = await ctrlUser.getProfil(req);
			return res.status(200).json(userProfil);
		} catch (error) {
			return res.status(500).json(error.message);
		}
		
	});
   
}