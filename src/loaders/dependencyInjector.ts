import { Container } from 'typedi';
import LoggerInstance from './logger';
import {sequelize} from './dbPostgres';

export default () => {
	console.log("test");
	LoggerInstance.info("MAIS T OU???");
    Container.set('logger', LoggerInstance);
    //Container.set('pgSequelize', pgSequelizeInstance);
    console.log("ttttt");
};
