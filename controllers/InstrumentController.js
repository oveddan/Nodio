var InstrumentController = function(broadcaster, callback){
    if(!(this instanceof InstrumentController))
        callback(new TypeError('must be called via constructor'));
    else
  this.broadcaster = broadcaster;
};

InstrumentController.prototype.pressKey = function(key, instrumentName){
  this.broadcaster.sendKeyPressed(key, instrumentName);
};

module.exports = InstrumentController;