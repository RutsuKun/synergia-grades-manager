//
//  Synergia Grades Manager
//  by Mateusz Henicz
//  27.09.2018
//

//
//		File: routes.js
//

const express = require('express'),
	db = require('./database'),
	server = require('./server'),
	config = require('./config'),
	exec = require('child_process').exec,
	scrypt = require('scryptsy');

	var router = express.Router();

router.get('/', function(req, res, next) {
					res.render('index', {
						title: 'Strona główna',
						db: db, 
						session: req.session
					});
});

router.get('/login', function(req, res, next) {
					res.render('login', {
						title: 'Logowanie do Librus Synergia',
						db: db, 
						session: req.session,
						uid:req.query.uid,
						code:req.query.code
					});
});



router.post('/addaccount', async function(req, res, next) {
var uid = req.body.uid;
var code = req.body.code;
var codehash = scrypt(uid.normalize('NFKC'), "sgm", 16384, 8, 1, 64).toString('hex');
  if(codehash === code){
					console.log("Zgadza się code");
					res.render('addaccount', {
						title: 'Dodaj dane',
						db: db, 
						session: req.session,
						email:req.body.user,
						pass:req.body.pass,
         uid:req.body.uid,
						code:req.body.code
					});
  } else {
					console.log("Nie zgadza się code");
					res.render('addaccounterror', {
						title: 'Błąd - nieprawidłowy code',
						db: db, 
						session: req.session,
						error:"Nieprawidłowy code"
					});
  }
});

module.exports = router;