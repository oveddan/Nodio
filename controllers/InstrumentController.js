var InstrumentController = function(broadcaster, callback){
    if(!(this instanceof InstrumentController))
        callback(new TypeError('must be called via constructor'));
    else
  this.broadcaster = broadcaster;
};

module.exports = InstrumentController;