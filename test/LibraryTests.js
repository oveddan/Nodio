var InstrumentBroadcaster = require('../lib/Utils').InstrumentBroadcaster,
    expect = require('chai').expect,
    sinon = require('sinon'),
    socketio = require('socket.io');


describe('InstrumentBroadcaster', function(){
    it('should be required to be created via constructor', function(done){
        var a = InstrumentBroadcaster({}, function(error){
            expect(error).to.be.ok;
            done();
        });
    });
    describe('#constructor(app)', function(){
        it('should keep copy of app', function(){
            var app = {};
            var instrumentBroadcaster = new InstrumentBroadcaster(app);
            expect(instrumentBroadcaster.app).to.be.equal(app);
        });
    });

    describe('#listen()', function(){
        beforeEach(function(){
            this.broadCaster = new InstrumentBroadcaster({});
            this.broadCaster.ioListener = {
                on : sinon.spy()
            };
        });
        it('should ensureSocketListening()', function(){
            this.broadCaster.ensureSocketListening = sinon.spy();
            this.broadCaster.listen();

            expect(this.broadCaster.ensureSocketListening.called).to.be.ok;
        });
        it('should bind events to socket on socket.io connection', function(){
            // test
            this.broadCaster.listen();
            // assert
            expect(this.broadCaster.ioListener.on.called).to.be.true;
            expect(this.broadCaster.ioListener.on.args[0][0]).to.equal('connection');
            expect(this.broadCaster.ioListener.on.args[0][1]).to.equal(InstrumentBroadcaster.bindEventsToSocket);
        });
    });

    describe("#listenForRequestsToHearInstrument()", function(){
        beforeEach(function(){
            this.broadCaster = new InstrumentBroadcaster({});
            this.broadCaster.ioListener = {
              on : sinon.spy()
            };
        });
    });

    describe('#bindEventsToSocket(socket)', function(){
        it('should listen for requests to hear instrument with socket', function(){
            // setup
            var socket = {
               on : sinon.spy()
            };
            InstrumentBroadcaster.listenForRequestsToHearInstrument = sinon.spy();
            // test
            InstrumentBroadcaster.bindEventsToSocket(socket);
            // expect
            expect(InstrumentBroadcaster.listenForRequestsToHearInstrument.calledWith(socket))
                .to.be.ok;
        });
        it('should listen for key presses with socket', function(){
            // setup
            var socket = {
                on : sinon.spy()
            };
            InstrumentBroadcaster.listenForKeyPresses = sinon.spy();
            // test
            InstrumentBroadcaster.bindEventsToSocket(socket);
            // expect
            expect(InstrumentBroadcaster.listenForKeyPresses.calledWith(socket)).to.be.ok;
        });
    });

    describe('#listenForKeyPresses(socket)', function(){
        it("should listen for event 'keyPressed' on socket", function(){
            var socket = {
                on : sinon.spy()
            };

            InstrumentBroadcaster.listenForKeyPresses(socket);

            expect(socket.on.calledWith('keyPressed')).to.be.ok;
        });
        it("should broadcast key pressed on instrument when 'keyPressed' fired from socket", function(){

        });
    });

    describe("#listenForRequestsToHearInstrument", function(){
        it('should have socket join room with name of instrument when listenToInstrument fired', function(){
            // setup
            var socket = {
                on : sinon.stub(),
                join : sinon.spy()
            };
            var spyForInstrument = socket.on.withArgs('listenToInstrument');

            // test
            InstrumentBroadcaster.listenForRequestsToHearInstrument(socket);

            // get function that was passed as second argument to 'on' and invoke it
            var listenToInstrumentCallback = spyForInstrument.args[0][1];
            expect(listenToInstrumentCallback).to.exist;
            var data = { instrumentName : 'thirdPiano' };
            listenToInstrumentCallback.call(socket, data);
            // end test

            // assert
            expect(socket.join.calledWith(data.instrumentName)).to.be.true;
        });
    });

    describe("#ensureSocketListening()", function(){
        beforeEach(function(){
            this.app = {a : 5};
            this.broadCaster = new InstrumentBroadcaster(this.app);
            this.spyIoListener = {
                on : sinon.stub()
            };
            this.listenStub = sinon.stub(socketio, 'listen')
                .returns(this.spyIoListener);
        });
        afterEach(function(){
            socketio.listen.restore();
        });
        it('should load and listen to listener if listener is null', function(){
            // setup
            this.broadCaster.ioListener = null;

            // test
            this.broadCaster.ensureSocketListening();
            // assert
            expect(this.listenStub.calledWith(this.app)).is.true;
            expect(this.broadCaster.ioListener).to.equal(this.listenStub.returnValues[0]);
        });
        it('should preserve original listener if listener is not null', function(){
            // setup
            this.broadCaster.ensureSocketListening();
            var originalListener = this.broadCaster.ioListener;
            this.listenStub.withArgs(this.app).returns({on : function(){}});

            // test
            this.broadCaster.ensureSocketListening();

            // assert
            expect(originalListener).to.equal(this.broadCaster.ioListener);
        });
    });

    describe('#sendKeyPressed(socket, key, instrumentName)', function(){
        it('should broadcast key in room for instrument', function(){
            // setup
            var socket = {
                in : sinon.stub()
            };

            var instrumentName = 'saxiphone',
                key = 'so';
            var emitSpy = sinon.spy();
            socket.in.withArgs(instrumentName)
                .returns({
                    emit : emitSpy
                });

            // test
            InstrumentBroadcaster.SendKeyPressed(socket, key, instrumentName);

            // assert
            emitSpy.calledWith({key : key}).should.be.ok;
        });
    });
});