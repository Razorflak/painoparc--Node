import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../../config'
import routes from '../api';
import { logInfo } from '../error/logger';
import * as appRoutePath from 'app-root-path';

export default ({ app }: { app: express.Application }) => {

	app.get('/status', (req, res) => {
	  res.status(200).end();
	});
	app.head('/status', (req, res) => {
	  res.status(200).end();
	});
   
	// Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
	// It shows the real origin IP in the heroku or Cloudwatch logs
	app.enable('trust proxy');
   
	// The magic package that prevents frontend developers going nuts
	// Alternate description:
	// Enable Cross Origin Resource Sharing to all origins by default
	app.use(cors());
   
	// Some sauce that always add since 2014
	// "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
	// Maybe not needed anymore ?
	app.use(require('method-override')());
   
	// Middleware that transforms the raw string of req.body into json
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
	//app.use(bodyParser.json());
	
	// Load API routes
	app.use(config.api.prefix, routes());

	// Stockage des images pour l'application
	logInfo(`${appRoutePath}/public`);
	app.use(express.static(`${appRoutePath}/public`));
   
	/// catch 404 and forward to error handler
	app.use((req, res, next) => {
	  const err = new Error('Not Found');
	  err['status'] = 404;
	  next(err);
	});
   
	/// error handlers
	app.use((err, req, res, next) => {
	  /**
	   * Handle 401 thrown by express-jwt library
	   */
	  logInfo('ya une couille dans le potage pas traité');
	  logInfo(err);
	  logInfo(err.message)
	  logInfo(err.status);
	  if (err.name === 'UnauthorizedError') {
	    return res
		 .status(err.status)
		 .send({ message: err.message })
		 .end();
	  }
	  return next(err);
	});
	app.use((err, req, res, next) => {
	  res.status(err.status || 500);
	  res.json({
	    errors: {
		 message: err.message,
	    },
	  });
	});
   };