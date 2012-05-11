var socketio = require('socket.io');

var InstrumentBroadcaster = function(app, callback){
    if(!(this instanceof InstrumentBroadcaster))
        callback(new TypeError('must be called via constructor'));
    else
        this.app = app;
};

InstrumentBroadcaster.prototype.listen = function(){
    this.ensureSocketListening();

    this.ioListener.on('connection', InstrumentBroadcaster.bindEventsToSocket);
};

InstrumentBroadcaster.prototype.ensureSocketListening = function(){
    if(!this.ioListener)
        this.ioListener = socketio.listen(this.app);
};

InstrumentBroadcaster.bindEventsToSocket = function(socket){
    InstrumentBroadcaster.listenForRequestsToHearInstrument(socket);
    InstrumentBroadcaster.listenForKeyPresses(socket);
};

InstrumentBroadcaster.listenForRequestsToHearInstrument = function(socket){
    socket.on('listenToInstrument', function(data){
        console.log('joining - ' + data.instrumentName);
        socket.join(data.instrumentName);
    });
};

InstrumentBroadcaster.listenForKeyPresses = function(socket){
    socket.on('keyPressed', function(data){
        console.log('keyPressed');
        console.log(data);
        InstrumentBroadcaster.sendKeyPressed(socket, data.key, data.instrumentName);
    });
};

InstrumentBroadcaster.sendKeyPressed = function(socket, key, instrumentName){
    console.log('instrument name -  ' + instrumentName);
    socket.broadcast.to(instrumentName).emit('keyPressed', {key : key});
}

exports.InstrumentBroadcaster = InstrumentBroadcaster;