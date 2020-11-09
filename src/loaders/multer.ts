import { Multer } from "multer";
import { logInfo } from "../error/logger";
import * as appRoutePath from 'app-root-path';


export const multer = require('multer');
var path = require('path');

var storageImgCommerce = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, `${appRoutePath}/tmp/img`);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
	   }
});

const destImgCommerce = multer({
	storage: storageImgCommerce
});

export function fileUpload(req, res, next){
	destImgCommerce.single('file')(req,res,next);
}

logInfo('####### MULTER Loaded #######');