import { Router, Request, Response } from 'express';
import Logger from '../../loaders/logger';
import UserCtrl from '../../services/authCtrl';
import { IUser } from '../../interfaces/IUser';
import User from '../../models/user.model';
import { error } from 'winston';
import AuthCtrl from '../../services/authCtrl';
import { consoleLog, logInfo } from '../../error/logger';

const routeCamping = Router();
export default (app: Router) => {
	app.use('/camping', routeCamping);
	
	routeCamping.get('/getCampingLst', async(req,res) => {
		try {
			var result = await commandeCtrl.generateMailCommande();
			res.status(HttpStatus.OK).send(result);
		} catch (error) {
			res.status(error.httpCodeError).send(error.message);
		}
	});
}