
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , security = require('./lib/security');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  security.initialize(app);
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
//app.get('/mytweets', security.ensureAuthenticated, routes.tweetsOfMyUser);
app.get('/', routes.index);
// Sockets
require('./appObserver').listenAndObserve(app);




app.listen(3000, '10.0.3.39', function(){
  console.log("Express server listening on port %d on address %s in %s mode", app.address().port, app.address().address, app.settings.env);
});
//app.listen(3000, '127.0.0.1', function(){
//    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
//});
