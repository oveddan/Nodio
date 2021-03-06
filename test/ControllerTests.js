var assert = require('chai').assert,
    should = require('should'),
    sinon = require('sinon'),
    socketio = require('socket.io'),
    InstrumentController = require('../controllers/InstrumentController'),
    InstrumentBroadcaster = require('../lib/Utils').InstrumentBroadcaster;

describe('InstrumentController', function(){
    if('should be required to be created via constructor', function(){
        var a = InstrumentController({}, function(error){
            expect(error).to.be.ok;
            done();
        });
    });

//    describe('#constructor(broadcaster)', function(){
//        it('should keep copy of broadcaster', function(){
//            var broadcaster = {a : '7'};
//            var controller = new InstrumentController(broadcaster);
//            controller.broadcaster.should.equal(broadcaster);
//        });
//    });

//    describe('#pressKey(key, instrumentName)', function(){
//        beforeEach(function(){
//            // setup broadcaster
//            var broadcaster = {
//                ensureSocketListening : sinon.spy(),
//                sendKeyPressed : sinon.spy()
//            };
//            // setup controller
//            this.controller = new InstrumentController(broadcaster);
//
//        });
//        it("should call keyPressed(key, instrumentName) on broadcaster", function(){
//            // setup
//            var key = "doh",
//                instrumentName = "piano";
//
//            // test
//            this.controller.pressKey(key, instrumentName);
//
//            // assert
//            this.controller.broadcaster.sendKeyPressed
//                .calledWith(key, instrumentName)
//                .should.be.true;
//        });
//        if('should ensure the socket is listening', function(){
//            // setup
//            var key = "doh",
//                instrumentName = "piano";
//            // test
//            this.controller.pressKey(key, instrumentName);
//
//            // assert
//            this.controller
//                .broadcaster.ensureSocketListening.called
//                .should.be.true;
//        });
//    });

    describe('#viewInstrument(instrumentName, res)', function(){
        beforeEach(function(){
            // setup controller
            this.controller = new InstrumentController({});
        });
        it('should render a view with name Instrument', function(){
            var res = {
              render : sinon.spy()
            };
            // test
            InstrumentController.viewInstrument('guitar', res);

            res.render.calledOnce.should.be.ok;
            res.render.firstCall.args[0].should.equal('instrument');
        });
        it('should return model with instrument name', function(){
            var res = {
                render : sinon.spy()
            };
            // test
            InstrumentController.viewInstrument('guitar', res);

            res.render.calledOnce.should.be.ok;
            res.render.firstCall.args[1].should.eql({instrumentName : 'guitar'});
        });
        // V2: (for keys will be hardcoded in the view)
        it('should return model with available keys', function(){

        });
    });
});

describe('InstrumentListController', function(){
    describe('home()', function(){
        it('should return home view', function(){

        });
    });
    describe('#displayInstruments()', function(){
        it('should return a view that lists all instruments', function(){

        });
        it('should bind existing instruments as array to model', function(){

        });
    });
});