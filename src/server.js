//
//  Synergia Grades Manager
//  by Mateusz Henicz
//  27.09.2018
//

//
//		File: server.js
//

 express = require('express'),
	ejs = require('ejs'),
	LRU = require('lru-cache'),
	fs = require("fs"),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	minify = require('express-minify'),
	compression = require('compression'),
	session = require('express-session'),
	FileStore = require('session-file-store')(session),
	http = require("http"),
	db = require('./database');

exports.start = cfg => {
	exports.app = express();
	exports.server = http.createServer(exports.app);
	exports.io = require('socket.io')(exports.server);
	registerRoutes(cfg, exports.app);

	exports.server.listen(cfg.port, () => {
		console.log("Serwer WWW otwarty na porcie :" + cfg.port);
	});


}

function NotFound(msg) {
	this.name = 'NotFound';
	Error.call(this, msg);
	Error.captureStackTrace(this, arguments.callee);
}
NotFound.prototype.__proto__ = Error.prototype;

function registerRoutes(cfg, app) {
	var normalizedPath = path.join(__dirname, "routes");
	/*fs.readdirSync(normalizedPath).forEach(file => {
		if (cfg.debug) console.log("Load route: " + file);
		routes[file] = require("./routes/" + file);
	});*/


	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.set('trust proxy', 1)
	app.use(session({
		store: new FileStore({}),
		secret: cfg['session-secret']
	}));

	app.engine('ejs', require('express-ejs-extend')); // add this line
	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, 'views'));

	app.use(compression());
	app.use(minify({
		cache: path.join(__dirname, '../cache'),
		uglifyJsModule: null,
		errorHandler: null,
		/*jsMatch: /js/,*/
		cssMatch: /css/,
		jsonMatch: /json/,
		lessMatch: /less/
	}));
	app.use(express.static(path.join(__dirname, '../public')));
	app.use('/', require("./routes"));

	app.use((req, res, next) => {
		console.log("Not found");
		var err = new NotFound('Page not found.');
		err.status = 404;
		next(err);
	});

	/*app.use((err, req, res, next) => {
		if (err instanceof NotFound) {
			res.status(404).render('404', { status: 404 });
		} else {
			res.status(500).render('error', { status: 500, message: "Error!", error: err });
			console.log(err);
		}
	});*/
	app.use(function(err, req, res, next) {
		if (!res.headersSent) {
			if (err.status == 404) {
				res.status(404);
				res.render('404', {
				status: 404,
			title: 'Podana strona nie istnieje',
			db: db, 
			session: req.session});
			} else {
				//res.status(err.status || 500);
				res.render('error', {
					status: err.status || 500,
					message: err.message,
					error: {}
				});
			}
		}
	});
}