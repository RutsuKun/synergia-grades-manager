//
//  Synergia Grades Manager
//  by Mateusz Henicz
//  25.09.2018
//

//
//		File: database.js
//

const Sequelize = require('sequelize'),
	config = require('./config'),
	crypto = require('crypto'),
	scrypt = require('scryptsy');


var exports = module.exports = {};
var db = {};

exports.dbConnect = cfg => {
	try {
		switch (cfg.database.type) {
			case "sqlite":
				db = new Sequelize('sgm', null, null, {
					dialect: "sqlite",
					pool: {
						max: 5,
						min: 0,
						acquire: 30000,
						idle: 10000
					},
					storage: cfg.database.sqlite.file,
				});
				break;
			case "mysql":
				db = new Sequelize(cfg.database.mysql.database, cfg.database.mysql.username, cfg.database.mysql.password, {
					dialect: "mysql",
					pool: {
						max: 5,
						min: 0,
						acquire: 30000,
						idle: 10000
					},
				});
				break;
			default:
				throw new Error("Nieznany typ bazy danych!");
		}
		db.authenticate()
			.then(() => {
				console.log("Połączono z bazą danych!");
				/*exports.loadData();*/
			})
			.catch(err => {
				throw err;
			});
	} catch (e) {
		console.error("Wystapił błąd podczas łączenia się z bazą danych!");
		console.error(e);
		process.exit(1);
	}

};