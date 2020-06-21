import express from 'express';
import logger from './loaders/logger';
import config from '../config';
import { logError, logInfo, typeMessage } from './error/logger';
import { GeneralError } from './error/generalError';
import { insertDonneesTest } from './dev/insertDonneesTest';

async function startServer() {
	const app = express();
   
	/**
	 * A little hack here
	 * Import/Export can only be used in 'top-level code'
	 * Well, at least in node 10 without babel and at the time of writing
	 * So we are using good old require.
	 **/
	//await require('./loaders/index').default({ expressApp: app })
	//await require('./loaders/')

	// Pour le moment on fait les appels 1 à 1
	//TODO Revoir pour factoriser ça quand ça deviendra charger...
	await require('./loaders/express').default({ app });
	await require('./loaders/dbPostgres');
	//await insertDonneesTest();
	
	app.listen(config.port, err => {
	  if (err) {
		logger.error(err);
	    process.exit(1);
	    return;
	  }

	  logInfo('##########Server listening on port: '+config.port+'##########', typeMessage.Succesful);
	});
   }
   
   startServer();
   