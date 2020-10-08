import { GeneralError } from './../error/generalError';
import { Op } from "sequelize";
import user from "../api/routes/user";
import { ICamping } from "../interfaces/ICamping";
import { sequelize } from "../loaders/dbPostgres";
import Camping from "../models/camping.model";
import User_Camping_Droit from "../models/user_camping_droit.modele";
import { logInfo } from '../error/logger';
import User from '../models/user.model';

export default class CampingCtrl{


	public async getCampingByUser(userId: string): Promise<ICamping> {
		if (userId === undefined){
			return;
		}
		try {
			var result = await Camping.findOne({
				include: [{
					model: User,
					attributes: [],
					where: {
						id: userId
						//droit: {[Op.gte]: 0}
					}
				}]
			});
		} catch (error) {
			throw new GeneralError(999, 'Erreur lors de getCampingByUser' + error);
			
		}
		return result;
	}

}