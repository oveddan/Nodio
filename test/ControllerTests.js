var assert = require('chai').assert,
    all = require('node-promise').all,
    Promise = require('node-promise').Promise,
    sinon = require('sinon');

describe('InstrumentController', function(){
    if('should throw error if not called via constructor', function(){

    });

    describe('#constructor(broadcaster)', function(){
        it('should keep copy of broadcaster', function(){

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