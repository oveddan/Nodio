var InstrumentBroadcaster = require('../lib/Utils').InstrumentBroadcaster,
    expect = require('chai').expect,
    should = require('chai').should,
    sinon = require('sinon'),
    socketio = require('socket.io');

describe('InstrumentBroadcaster', function(){
    it('should require to be created via constructor', function(done){
        var a = InstrumentBroadcaster({}, function(error){
            expect(null).to.not.be.ok;
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

    describe("#listenForRequestsToHearInstrument()", function(){
        beforeEach(function(){
            this.broadCaster = new InstrumentBroadcaster({});
            this.spyIoListener = {
                on : sinon.stub()
            };
            sinon.stub(socketio, 'listen').returns(this.spyIoListener);
            this.spyIoListener.on.withArgs('connection',
                this.spyIoListener.onConnection);
        });
        afterEach(function(){
            socketio.listen.restore();
        });
        it('should ensureSocketListening()', function(){
            this.broadCaster.ensureSocketListening = sinon.spy();
            this.broadCaster.listenForRequestsToHearInstrument();

            expect(this.broadCaster.ensureSocketListening.called).to.be.ok;
        });
        it('should listen for event listenToInstrument on socket.io connection', function(){
            // test
            this.broadCaster.listenForRequestsToHearInstrument();
            // assert
            expect(this.spyIoListener.on.called).to.be.true;
            expect(this.spyIoListener.on.args[0][0]).to.equal('connection');
            expect(this.spyIoListener.on.args[0][1]).to.equal(this.broadCaster.onConnection);
        });
        it('should have socket join room with name of instrument when listenToInstrument fired', function(){

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
    })
});