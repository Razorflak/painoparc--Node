import { Router } from 'express';
import { fileUpload } from '../../loaders/multer';
import { validateToken } from "../../services/authTokenCtrl";
import CommerceCtrl from '../../services/commerceCtrl';
import  * as fs from 'fs';
import gm from 'gm';
import { logInfo, typeMessage } from '../../error/logger';
import * as path from 'path';
import { dir } from 'console';

const routeCommerce = Router();
//const fs = require('fs');
export default(app: Router) => {

	app.use('/commerce',routeCommerce);

	const commerceCtrl: CommerceCtrl = new CommerceCtrl();
	routeCommerce.use(validateToken);

	routeCommerce.get("/getCommerceUser", async(req, res) => {
		try{
			var lstCommerce = await commerceCtrl.getLstCommerceForUser(parseInt(req.body.userId));
			return res.status(200).send(lstCommerce);
		}catch(e){
			res.status(500).send(e.message);
		}
	});

	routeCommerce.post('/uploadImgCommerce', fileUpload, async (req, res) => {
		// TODO déplacement du code dans un service
		// TODO Ajout d'une vérification sur les droits entre entre le user et le commerce.
		// On a l'image dans le répertoire temp, on peut maintenant la manipuler.
		// resize de l'image
		const idCommerce = req.body.idCommerce;
		//Verification de l'existance du répertoire
		// création au besoin
		let dirImgCommerce: string = `assets/img/commerce/${idCommerce}/`;
		if (!fs.existsSync(dirImgCommerce)) {
			fs.mkdirSync(dirImgCommerce, {
				recursive: true
			});
		}
		// récupération de l'image dans le temps
		const imgOrig:Buffer = fs.readFileSync(req.file.path);
		// récupération du nom de l'image sans extension
		const baseNameOrigFile = path.basename(req.file.filename, path.extname(req.file.originalname));
		// Ecriture de l'image miniature
		gm(imgOrig).resize(200).setFormat('jpg').write(`${dirImgCommerce}${baseNameOrigFile}_200.jpg`, function(error) {
			if(error){
				logInfo(error.message, typeMessage.Error);
			}
		});
		// Ecriture de l'image à la taille d'origine
		gm(imgOrig).setFormat('jpg').write(`${dirImgCommerce}${baseNameOrigFile}.jpg`, function(error) {
			if(error){
				logInfo(error.message, typeMessage.Error);
			}
		});
		
		//Suppression de l'image temp
		fs.unlinkSync(req.file.path);
		res.status(200).send({result: req.file});
	})

	routeCommerce.get('/lstImagesMiniatureCommerce', async (req, res) => {
		let dirImgCommerce: string = `assets/img/commerce/${'1'}/`;
		let result = fs.readdirSync(dirImgCommerce).filter( fileName => 
			fileName.indexOf('_200.') !== -1
		);
		res.status(200).send(result);
	})
}
