import { IUserInformation } from './IUserInformation';
export interface IUser {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
  isCommercant: boolean;

  //En fonction des retour de sequelize, les array qui peuvent venir avec les user
  UserInformation?: IUserInformation;

}

