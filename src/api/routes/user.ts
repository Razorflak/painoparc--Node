import { Router, Request, Response } from 'express';
import UserCtrl from '../../services/authCtrl';
import User from '../../models/user.model';
import { validateToken } from '../../services/authTokenCtrl';


const routeUser = Router();
export default (app: Router) => {

	//Initialisation des instance de controleur
	var ctrlUser: UserCtrl = new UserCtrl();


	app.use('/user', routeUser);

	/**
	 * validateToken Vérifie que le Token est valide.
	 * Est à appliquer sur toutes les routes de user
	 * Cette fonction ajoute aussi l'id du user du Token dans le body de la Request (req.body.id)
	 */
	routeUser.use(validateToken);

	
	/**
	 * Récupération du profil via l'id récupérer dans le Token
	 */
	routeUser.get("/profil",async(req: Request, res: Response) => {
		try {
			const userProfil:User = await ctrlUser.getProfil(req);
			return res.status(200).json(userProfil);
		} catch (error) {
			return res.status(500).json(error.message);
		}
		
	});

	/**
	 * Mise à jour des information de l'utilisateur
	 * Les données arrivent dans le body sous cette forme:
	 * 	{	
	 * 		id:
	 * 		data:{
	 * 			<IUserInformation>
	 * 			}
	 * 	}
	 */
	routeUser.post('/profil', async(req: Request, res: Response) => {
		try {
			const ok:boolean = await ctrlUser.postProfil(req);
			if(ok){
				res.status(200).send();
			}else{
				res.status(500).send("Ret Post Profil false");
			}
		} catch (error) {
			res.status(error.httpCodeError).send(error.message);
		}
	});
	
	/**
	 * Plus un test que autre chose.
	 * Pas util de voir le profil des autres utilisateurs dans cette app pour le moment
	 */
	routeUser.get('/:id', async(req: Request, res: Response) => {
		try {
			const idUser: number = parseInt(req.params.id);
			res.status(200).send(ctrlUser.getPublicProfil(idUser));
		} catch (error) {
			res.status(error.httpCodeError).send(error.message);
		}
	});
   
}