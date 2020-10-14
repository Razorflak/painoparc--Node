import { Multer } from "multer";
import { logInfo } from "../error/logger";


export const multer = require('multer');
var path = require('path');

var storageImgCommerce = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './tmp/img');
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