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
        });
        it('should ensureSocketListening()', function(){
            this.broadCaster.ensureSocketListening = sinon.spy();
            this.broadCaster.listenForRequestsToHearInstrument();

            expect(this.broadCaster.ensureSocketListening.called).to.be.ok;
        });
        it('should wait for socket.io connection', function(){

        });
        it('should listen for event listenToInstrument on socket.io connection', function(){

        });
        it('should have socket join room with name of instrument when listenToInstrument fired', function(){

        });
    });

    describe("#ensureSocketListening()", function(){
        beforeEach(function(){
            this.app = {a : 5};
            this.broadCaster = new InstrumentBroadcaster(this.app);
            this.listenStub = sinon.stub(socketio, 'listen');
        });
        afterEach(function(){
            socketio.listen.restore();
        })
        it('should load and listen to socket if socket is null', function(){
            // setup
            this.broadCaster.socket = null;
            var socket = {b : 6};

            this.listenStub.withArgs(this.app).returns(socket);

            // test
            this.broadCaster.ensureSocketListening();
            // assert
            expect(this.listenStub.calledWith(this.app)).is.true;
            expect(this.broadCaster.socket).to.equal(socket);
        });
        it('should preserve original socket if socket it not null', function(){
            // setup
            var originalSocket = this.broadCaster.socket = {a : 5};

            // test
            this.broadCaster.ensureSocketListening();

            // assert
            expect(originalSocket).to.equal(originalSocket);
        });
    })
});