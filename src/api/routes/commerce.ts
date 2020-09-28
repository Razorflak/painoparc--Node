import { Router } from 'express';
import { validateToken } from "../../services/authTokenCtrl";
import CommerceCtrl from '../../services/commerceCtrl';

const routeCommerce = Router();
export default(app: Router) => {

	app.use('/commerce',routeCommerce);

	const commerceCtrl: CommerceCtrl = new CommerceCtrl();
	routeCommerce.use(validateToken);

	routeCommerce.get("/getCommerceUser", async(req, res) => {
		try{
			console.log(req.body);
			var lstCommerce = await commerceCtrl.getLstCommerceForUser(parseInt(req.body.userId));
			return res.status(200).send(lstCommerce);
		}catch(e){
			res.status(500).send(e.message);
		}
	});
	

}
