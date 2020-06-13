import { IUser } from './../interfaces/IUser';
import { Request } from 'express';
import { userRules } from './../validators/user.validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { resolve } from 'dns';
import config from '../../config'
import Validator from 'validatorjs';
import { logDev, logInfo, typeMessage } from '../error/logger';
import { GeneralError } from '../error/generalError';
import HttpStatus  from 'http-status-codes';
import { read } from 'fs';
import UserInformation from '../models/userInformation.model';
//import models from '../models'
//var models  = require('../models');
//var userModele = require('../models/user');



export default class AuthCtrl {
	
	public async login(userInfo: IUser): Promise<{user: User, token: string }> {
		
		try {
			const user = await User.findOne({
				where: {
					email: userInfo.email
				}
			});
	
			if(user){
				const passwordMatch = await bcrypt.compare(userInfo.password,user.password);
				if(passwordMatch){
					const token = this.generateTokenForUser(user);
					return {user,token};
				}else{
					var err:GeneralError = new GeneralError (500,"Mot de passe invalid",HttpStatus.UNAUTHORIZED);
					logDev(err.message);
					throw err;
				}
			}else{
				var err:GeneralError = new GeneralError (500,"L'utilisateur n'existe pas !",HttpStatus.UNAUTHORIZED);
				logDev(err.message);
				throw err;
			}
			
		} catch (error) {
			throw error;
		};
	};

	

	public async register (user: IUser): Promise<{ newUser: User; }> {
		try {
			const result = await User.findOne({
				attributes: ['email'],
				where: {
					email: user.email
				}
			});
	
			if(!result){
				//Validation du format des données
				//TODO validation des données commenter car me renvoie fails dans tous les cas....
				/*let validation = new Validator(user, userRules);
				if(validation.fails){
					throw new Error ("Format des données invalid: " + validation.errors.all.toString);
				}*/
				const hashedPassword: String = await new Promise((resolve, reject) => {
					bcrypt.hash(user.password, 5, function(err, hash) {
					  if (err) reject(err)
					  resolve(hash)
					});
				});
				

				var newUser = await User.create({
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					password: hashedPassword
				});

				return {newUser};
				
			}else{
				logDev('Utilisateur déjà inscrit!');
				var err:GeneralError = new GeneralError (500,'Utilisateur déjà inscrit',401);
				err.name = '500';
				throw err;
			}
			
		} catch (error) {
			console.log('Error' + error.message);
			throw new Error('Impossible d\'ajouter l\'utilisateur');
		};
		
	}

	public async getProfil(req: Request):Promise<User> {
		try {
			const userId = this.validateToken(req);
			//TODO Chargement des infos du profil
			//Retour du user 1 pour le moment
			const userProfil = await User.findOne ({
				where: {
					id: userId
				},
				include: [UserInformation]
			});
			return userProfil;
		} catch (error) {
			logInfo('Erreur getProfil: ' + error.message, typeMessage.Error);
		}
	}


	public generateTokenForUser (user: IUser):string{
		
		return jwt.sign({
			userId: user.id,
			isAdmin: false
		}
		,config.jwtSecret,
		{
			expiresIn: '1d'
		});
	}

	public validateToken (req: Request):number{
		var headerAuth:String = req.get('authorization')
		const token = (headerAuth != null ) ? headerAuth.replace('Bearer ', '') : null;
		if(!token){
			throw new Error ("Missing TOKEN !");
		};
		var userId = -1;
		 //Validation du TOKEN
		 var jwtToken = jwt.verify(token, config.jwtSecret);
		 if (jwtToken){
			return parseInt(jwtToken["userId"]);
		 }else{
			 throw new Error ("TOKEN invalid");
		 }

	}

}