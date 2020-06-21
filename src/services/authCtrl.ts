import { IUserInformation } from './../interfaces/IUserInformation';
import { IUser } from './../interfaces/IUser';
import { Request } from 'express';
import { userRules } from './../validators/user.validator';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { resolve } from 'dns';
import config from '../../config'
import Validator from 'validatorjs';
import { logDev, logInfo, typeMessage } from '../error/logger';
import { GeneralError } from '../error/generalError';
import HttpStatus  from 'http-status-codes';
import { read } from 'fs';
import UserInformation from '../models/userInformation.model';
import { generateTokenForUser } from './authTokenCtrl';
//import models from '../models'
//var models  = require('../models');
//var userModele = require('../models/user');



export default class AuthCtrl {
	public async getPublicProfil (idUser: number): Promise<UserInformation> {
		try {
			return UserInformation.findOne({
				where: {
					idUser: idUser
				}
			})
		} catch (error) {
			throw new GeneralError(999,"Erreur lors de la récupération du ProfilPublic",500)
		}
	}
	
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
					const token = generateTokenForUser(user);
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
			const userProfil = await User.findOne ({
				where: {
					id: req.body.userId
				},
				include: [UserInformation]
			});
			return userProfil;
		} catch (error) {
			logInfo('Erreur getProfil: ' + error.message, typeMessage.Error);
		}
	}

	public async postProfil(req: Request):Promise<boolean> {
		try {
			var profil: IUserInformation = req.body.profil;
			return await UserInformation.upsert(profil);
		} catch (error) {
			logInfo('Erreur postProfil: ' + error.message, typeMessage.Error);
			throw new GeneralError(999,error.message,500);
			
		}
	}


	

}