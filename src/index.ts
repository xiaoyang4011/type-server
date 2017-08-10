import "reflect-metadata";
import 'source-map-support/register';
import * as path from 'path';
import * as config from 'config';
import * as log4js from 'log4js';
import { createConnection, useContainer as useContainerForOrm } from "typeorm";
import { Container } from "typedi";
import { createExpressServer, useContainer as useContainerForRouting } from "routing-controllers";
const packagejson = require('../package.json');

log4js.configure(config['log4js']);

useContainerForOrm(Container);
useContainerForRouting(Container);
createConnection({
	driver: config['database'],
	logging: {
		logger: (level, message) => log4js.getLogger('debug').debug(message),
		logQueries: true,
		logFailedQueryError: true,
	},
	entities: [
		__dirname + "/entities/{*.js}"
	],
	autoSchemaSync: true,
}).then(() => {
	const app = createExpressServer({
		routePrefix: "/api",
		controllers: [__dirname + "/controllers/*.js"],
		middlewares: [__dirname + "/middlewares/*.js"],
	});
	app.use(log4js.connectLogger(log4js.getLogger(), { level: 'auto' }));
	app.listen(config['port']);
	log4js.getLogger('debug').info(`${packagejson['name']}@${packagejson['version']} started at port ${config['port']}`);
}).catch((e) => log4js.getLogger('error').error(e));