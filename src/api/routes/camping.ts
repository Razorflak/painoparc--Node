import { Router } from 'express';
import { validateToken } from '../../services/authTokenCtrl';
import CampingCtrl from '../../services/campingCtrl';
import HttpStatus from 'http-status-codes';
import { logInfo } from '../../error/logger';

const routeCamping = Router();
export default(app: Router) => {
	app.use('/camping',routeCamping);
	routeCamping.use(validateToken);

	const campingCtrl: CampingCtrl = new CampingCtrl();

	routeCamping.get('/getCampingByUser', async(req, res) => {
		try {
			var result = await campingCtrl.getCampingByUser(req.body.userId);
			res.status(HttpStatus.OK).send(result);
		} catch (error) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
		}
	})
}