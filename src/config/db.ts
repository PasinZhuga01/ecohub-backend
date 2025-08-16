import mysql from 'mysql2/promise';

import env from './env';

export default mysql.createPool({
	host: env.database.host,
	port: env.database.port,
	user: env.database.user,
	password: env.database.password,
	database: env.database.name
});
