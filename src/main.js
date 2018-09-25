//
//  Synergia Grades Manager
//  by Mateusz Henicz
//  25.09.2018
//

//
//		File: main.js
//


const os = require("os"),
	config = require('./config.js'),
	database = require('./database.js'),
	server = require('./server.js');

var exports = module.exports = {};

exports.start = () => {
	if (!version) version = "unknown";
	platform = {
		os: os.platform(),
		version: os.release(),
		hostname: os.hostname(),
		arch: os.arch()
	}
	console.log("Project Synergia Grades Manager v" + version + " // Created by RukashiChan");
	config.loadConfig();
	
	process.env.NODE_ENV = config.cfg.debug ? 'development' : 'production';
	
	debug = config.cfg.debug;

	database.dbConnect(config.cfg);
	exports.db = database.db;
	server.start(config.cfg);
};
