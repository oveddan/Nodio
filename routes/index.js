
/*
 * GET home page.
 */
var InstrumentController = require('../controllers/InstrumentController');

exports.registerControllerRoutes = function(app, broadcaster){
  app.get('/:instrumentName', function(req, res){
     InstrumentController.viewInstrument(req.instrumentName, res);
  });
};