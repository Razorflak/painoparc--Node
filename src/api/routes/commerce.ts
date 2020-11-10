import { Router } from 'express';
import { fileUpload } from '../../loaders/multer';
import { validateToken } from "../../services/authTokenCtrl";
import CommerceCtrl from '../../services/commerceCtrl';
import  * as fs from 'fs';
import gm from 'gm';
import { logInfo, typeMessage } from '../../error/logger';
import * as path from 'path';
import * as appRoutePath from 'app-root-path';

const routeCommerce = Router();
var url = require('url')
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
		let dirImgCommerce: string = `${appRoutePath}/public/assets/img/commerce/${idCommerce}/`;
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
			//Récupération de la liste des images du répertoire commerce
			let result = fs.readdirSync(dirImgCommerce).filter( fileName => 
				fileName.indexOf('_200.') !== -1
			);
			res.status(200).send({filesCommerce: result});
		});
		// Ecriture de l'image à la taille d'origine
		gm(imgOrig).setFormat('jpg').write(`${dirImgCommerce}${baseNameOrigFile}.jpg`, function(error) {
			if(error){
				logInfo(error.message, typeMessage.Error);
			}
			
		});
		
		//Suppression de l'image temp
		fs.unlinkSync(req.file.path);

		
	})

	routeCommerce.get('/lstImagesMiniatureCommerce', async (req, res) => {
		let dirImgCommerce: string = `${appRoutePath}/public/assets/img/commerce/${'1'}/`;
		let result = fs.readdirSync(dirImgCommerce).filter( fileName => 
			fileName.indexOf('_200.') !== -1
		);
		res.status(200).send(result);
	});

	routeCommerce.post('/setMainImg', async (req, res) => {
		// TODO ajout d'une vérification pour s'assurer que l'utilisateur à les droits sur ce commerce !
		const imgPath = `${appRoutePath}/public/assets${req.body.path}`;
		// Rename du fichier main.* actuel
		const folderCommerce = path.dirname(path.normalize(imgPath));
		const randomNumber = Date.now();
		try {
			fs.renameSync(path.normalize(`${folderCommerce}/main.jpg`),path.normalize(`${folderCommerce}/${randomNumber}.jpg`));
			fs.renameSync(path.normalize(`${folderCommerce}/main_200.jpg`),path.normalize(`${folderCommerce}/${randomNumber}_200.jpg`));	
		} catch (error) {
			
		}
		// Rennomage du nouveau fichier main
		fs.renameSync(path.normalize(`${imgPath}`),path.normalize(`${folderCommerce}/main_200.jpg`));
		fs.renameSync(path.normalize(`${imgPath.replace('_200', '')}`),path.normalize(`${folderCommerce}/main.jpg`));
		res.status(200).send();
	});

	routeCommerce.delete('/deleteImg', async(req, res) => {
		// TODO ajout d'une vérification pour s'assurer que l'utilisateur à les droits sur ce commerce !
		var parts = url.parse(req.url, true);
		var query = parts.query;
		let imgPath = `${appRoutePath}/public/assets${query.path}`;
		//Dans le cas ou l'utilisateur supprime le main
		const indxDummy = imgPath.indexOf('?dummy=');
		if(indxDummy > 0){
			imgPath = imgPath.substr(0, indxDummy);
		}
		fs.unlinkSync(path.normalize(imgPath));
		fs.unlinkSync(path.normalize(imgPath.replace('_200', '')));
		res.status(200).send();
	})
}
