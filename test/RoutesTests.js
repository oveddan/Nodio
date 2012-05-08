var sinon = require('sinon'),
    should = require('should'),
    routes = require('../routes');

describe('routes', function(){
    describe('registerControllerRoutes(app)', function(){
        it("should render / to go to InstrumentListController.home()", function(){
        });
        it('should render /:instrumentName to go to InstrumentController.viewInstrument(name)', function(){
             // setup
             var app = {
                 get : sinon.spy()
             };

            // test
            routes.registerControllerRoutes(app);

            // assert
            app.get.calledWith('/:instrumentName').should.be.true;
            // TEST INCOMPLETE
        });
    });
})