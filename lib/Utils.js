var socketio = require('socket.io');

var InstrumentBroadcaster = function(app, callback){
    if(!(this instanceof InstrumentBroadcaster))
        callback(new TypeError('must be called via constructor'));
    else
        this.app = app;
};

InstrumentBroadcaster.prototype.listenForRequestsToHearInstrument = function(){
    this.ensureSocketListening();
};

InstrumentBroadcaster.prototype.ensureSocketListening = function(){
    this.socket = socketio.listen(this.app);
};

exports.InstrumentBroadcaster = InstrumentBroadcaster;