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
    if(!this.ioListener)
        this.ioListener = socketio.listen(this.app);

    this.ioListener.on('connection', this.onConnection);
};

InstrumentBroadcaster.onConnection = function(socket){
};

exports.InstrumentBroadcaster = InstrumentBroadcaster;