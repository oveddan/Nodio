var InstrumentController = function(callback){
    if(!(this instanceof InstrumentController))
        callback(new TypeError('must be called via constructor'));
};

InstrumentController.viewInstrument = function(instrumentName, res){
    res.render('Instrument', {instrumentName : instrumentName});
};

module.exports = InstrumentController;