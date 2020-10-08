import jwt from 'jsonwebtoken';
import { IUser } from './../interfaces/IUser';
import config from '../../config'
import { nextTick } from 'process';
import { REQUESTED_RANGE_NOT_SATISFIABLE } from 'http-status-codes';
import { logInfo } from '../error/logger';

export function generateTokenForUser (user: IUser):string{
		
	return jwt.sign({
		userId: user.id,
		isAdmin: false
	}
	,config.jwtSecret,
	{
		expiresIn: '1d'
	});
}

/**
	 * validateToken Vérifie que le Token est valide.
	 * Est à appliquer sur toutes les routes de user
	 * Cette fonction ajoute aussi l'id du user du Token dans le body de la Request (req.body.userId) dans userId
	 */
export function validateToken (req,res,next){
	var headerAuth:String = req.get('authorization');
	const token = (headerAuth != null ) ? headerAuth.replace('Bearer ', '') : null;
	if(!token){
		throw new Error ("Missing TOKEN !");
	};
	var userId = -1;
	 //Validation du TOKEN
	 var jwtToken = jwt.verify(token, config.jwtSecret);
	 if (jwtToken){
		req.body.userId = parseInt(jwtToken["userId"]);
		next();
	 }else{
		 throw new Error ("TOKEN invalid");
	 }
	 

}