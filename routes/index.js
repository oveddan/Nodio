
/*
 * GET home page.
 */

exports.registerControllerRoutes = function(app, broadcaster){
  app.get('/:instrumentName', function(req, res){
     var controller = new InstrumentController(broadcaster);
      controller.viewInstrument(req.instrumentName);
  });
};