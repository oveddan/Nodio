var assert = require('chai').assert,
    should = require('should'),
    InstrumentController = require('../controllers/InstrumentController');

describe('InstrumentController', function(){
    if('should be required to be created via constructor', function(){
        var a = InstrumentController({}, function(error){
            expect(null).to.not.be.ok;
            done();
        });
    });

    describe('#constructor(broadcaster)', function(){
        it('should keep copy of broadcaster', function(){
            var broadcaster = {a : '7'};
            var controller = new InstrumentController(broadcaster);
            controller.broadcaster.should.equal(broadcaster);
        });
    });

    describe('#pressKey(key, instrumentName)', function(){
        it("should fire keyPressed(key) in room for instrumentName on broadcaster", function(){

        });
    });

    describe('#viewInstrument()', function(){
        it('should render a view with name Instrument', function(){

        });
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