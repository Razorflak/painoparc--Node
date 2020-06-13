import { Terminal } from 'terminal-kit';
import { GeneralError } from './generalError';
///import winston from "winston";
import logger from '../loaders/logger'

var term = require( 'terminal-kit' ).terminal ;
export function consoleLog (message: string){

}

export function logError (err: GeneralError){
	if(err.level == GeneralError.CRITICAL_ERROR){
		term.red(err.message + '\n');
	}
	//Log vers les fichiers (avec winston)
	logger.error(err.code + " : " + err.message);
}

export function logDev(message: string){
	message += "\n";
	term.bgYellow(message);
}


export function logInfo (message: string, type: number = typeMessage.Info){
	//Obligé de rajouter le saut d eligne à la main...
	message += "\n";
	switch(type){
		case typeMessage.Succesful:
			term.green(message);
		break;
		case typeMessage.Error:
			term.red(message);
		break;
		case typeMessage.Info:
			term.blue(message);
		break;
		case typeMessage.Warning:
			term.orange(message);
		break;
	}
}

export enum typeMessage {
	Succesful = 1,
	Error = 2,
	Info = 3,
	Warning = 4
}