//
//  Synergia Grades Manager
//  by Mateusz Henicz
//  25.09.2018
//

//
//		File: routes.js
//

const express = require('express'),
	db = require('./database'),
	server = require('./server'),
	config = require('./config'),
	exec = require('child_process').exec;

	var router = express.Router();

router.get('/', function(req, res, next) {
					res.render('index', {
						title: 'Strona główna',
						db: db, 
						session: req.session
					});
});

module.exports = router;