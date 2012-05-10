(function(){
    TestCase('InstrumentView({el : instrumentElement})', {
        setUp : function(){
            this.childViewsStub = sinon.stub(NODIO.InstrumentView, "buildChildViews");
            this.buildModelStub = sinon.stub(NODIO.InstrumentView, "buildModel");
            this.getInstrumentNameStub = sinon.stub(NODIO.InstrumentView, "getInstrumentName");
        },
        tearDown : function(){
            this.childViewsStub.restore();
            this.buildModelStub.restore();
            this.getInstrumentNameStub.restore();
        },
        'test should throw error if el is not dom element' : function(){
            expect(function(){
                var view = new NODIO.InstrumentView({el : 'a'});
            }).to.throwError();
        },
        'test should build instrument model instrument name and childViews and contain that as collection model' : function(){
            // setup
            // build child views stub
            var expectedViews = {G : "7"}; // build random object to be returned;
            var $el = $(document.createElement('a'));
            this.childViewsStub.withArgs($el).returns(expectedViews);
            // build getInstrumentName stub
            var expectedName = "drums and bass";
            this.getInstrumentNameStub.withArgs($el).returns(expectedName);
            // build model building stub
            var expectedModel = {d : "5"};
            this.buildModelStub.withArgs(expectedName, expectedViews).returns(expectedModel);
            // test
            var instrumentView = new NODIO.InstrumentView({el : $el});

            // assert
            expect(instrumentView.collection).to.equal(expectedModel);
        }
    });

    TestCase('InstrumentView.buildChildViews($el)', {
        setUp : function(){
            /*:DOC element = <ul>
             <li class='key'>a</li>
             <li class='notKey'>b</li>
             <li class='key'>c</li>
             <li class='key'>d</li>
             </ul>  */
        },
        "test should return key views from all elements in view with class='key'" : function(){
            var $el = $(this.elements);

            var elementsWithKey = $el.find('.key');

            var expectedViews = {};

            for(var i = 0; i < elementsWithKey.length; i++){
                var childView = new NODIO.KeyView({
                    el : elementsWithKey[i]
                });
                expectedViews.push(childView);
            }

            var actualViews = NODIO.InstrumentView.buildChildViews($el);

            var instrumentView = new NODIO.InstrumentView({el : this.element});

            expect(expectedViews).to.eql(actualViews);
        }
    });

    TestCase('InstrumentView.getInstrumentName($el)', {
       'test should grab data-name attribute from element' : function(){
           /*:DOC element = <ul data-name='guitar' /> */
           var $el = $(this.element);
           var expected = 'guitar';
           var actual = NODIO.InstrumentView.getInstrumentName($el);
           expect(expected).to.equal(actual);
       }
    });

    TestCase('InstrumentView.buildModel(childViews)', {
        "test should return instance of InstrumentModel": function(){
            // test
            var model = NODIO.InstrumentView.buildModel(null, []);

            expect(model).to.be.a(NODIO.InstrumentModel);
        },
        "test should add all models in child views to collection model": function(){
            var views = [
                {model : {a : '6'}},
                {model : {g : '9'}},
                {model : {fd : '45'}},
                {model : {fd : '99'}}
            ];

            var addSpy = sinon.spy(NODIO.InstrumentModel.prototype, "add");

            var model = NODIO.InstrumentView.buildModel('piano', views);

            for(var i = 0; i < views.length; i++){
                expect(addSpy.calledWith(views[i].model)).to.equal(true);
            }

            addSpy.restore();
        },
        "test model should have instrument name": function(){
            var model = NODIO.InstrumentView.buildModel('piano', []);

            expect(model.getInstrumentName()).to.be('piano');
        }
    });
}());

(function(){
    TestCase('InstrumentModel.setInstrumentName()', {
        'test should listen to instrument with name' : function(){
            // setup
            var spy = sinon.spy(NODIO.InstrumentModel.prototype, 'listenToInstrument');
            var instrumentModel = new NODIO.InstrumentModel();

            // test
            instrumentModel.setInstrumentName('bass');

            // expect
            expect(spy.calledWith('bass')).to.be(true);

            // restore
            spy.restore();
        }
    });

    TestCase('InstrumentModel()', {
        setUp : stubConnectAndSocket,
        tearDown: restoreSocket,
        'test should create and contain socket' : function(){
            // setup
            // test
            var instrumentModel = new NODIO.InstrumentModel();

            // assert
            expect(instrumentModel.socket).to.be(this.socket);
        }
    });

    TestCase('InstrumentModel.listenToInstrument(instrumentName)', {
        setUp : stubConnectAndSocket,
        tearDown: restoreSocket,
        'test should emit listenToInstrument with name of instrument' : function(){
            // setup
            var instrumentModel = new NODIO.InstrumentModel();
            // test
            instrumentModel.setInstrumentName('bass');

            // assert
            expect(this.socket.emit.calledWith(
                'listenToInstrument', {instrumentName : 'bass'}))
                .to.be(true);
        },
        'test should listen for pressed keys' : function(){
            // setup
            var instrumentModel = new NODIO.InstrumentModel();
            instrumentModel.listenForPressedKeys = sinon.spy();
            // test
            instrumentModel.setInstrumentName('bass');
            // assert
            expect(instrumentModel.listenForPressedKeys.called).to.be(true);
        }
    });

    TestCase('InstrumentModel.listenForPressedKeyes()', {
        setUp : stubConnectAndSocket,
        tearDown: restoreSocket,
        "test should make 'keyPressed' on model be called when socket emits event 'keyPressed'" : function(){
            // test
            var instrumentModel = new NODIO.InstrumentModel();
            instrumentModel.keyPressed = sinon.spy();

            // start test
            instrumentModel.listenForPressedKeys();
            // invoke second method in 'on', simulating on being fired
            var onFunction = this.socket.on.firstCall.args[1];
            var testKeyPress = {key : 'fa'};
            onFunction(testKeyPress);
            // end test

            // assert
            expect(this.socket.on.firstCall.args[0]).to.be('keyPressed');
            expect(instrumentModel.keyPressed.calledWith(testKeyPress.key)).to.be.true;
            expect(instrumentModel.keyPressed.calledOn(instrumentModel)).to.be.true;
        }
    });

    TestCase('InstrumentModel.add(keyModel)', {
        setUp : stubConnectAndSocket,
        tearDown: restoreSocket,
        "'test should call keyPressed(name) when keyModel emits 'keyPressed'" : function(){
            var keyA = new NODIO.KeyModel({key : "a"})
            ,keyB = new NODIO.KeyModel({key : "C22"})
            ,keyC = new NODIO.KeyModel({key : "943"})
            ,keyD = new NODIO.KeyModel({key : "22"});

           // mock key B and key D's
        }
    });

//    TestCase('InstrumentModel.listenForKeyPress(keyModel)', {
//       "test should invoke keyPressed(name) when keyModel triggers 'keyPressed'" : function(){
//
//       }
//    });

    TestCase('InstrumentModel.keyPressed(name)', {
        "test should emit 'keyPressed' on key with name of contained socket" : function(){

        }
    });

    TestCase("InstrumentModel.playKey(name)", {
        'test should find key with name and call play() on it' : function(){
        }
    });

    function stubConnectAndSocket(){
        this.connectStub = sinon.stub(io, 'connect');

        this.socket = {
            emit : sinon.spy(),
            on : sinon.spy()
        };
        this.connectStub.returns(this.socket);
    }

    function restoreSocket(){
        this.connectStub.restore();
    }

}());

(function(){
    TestCase('KeyView', {
        'test should extend Backbone view': function(){
        }
    });

    TestCase('KeyView.initialize', {
        "test should call play() when model fires 'play'": function(){

        },
        "test should grab audio element in view and assign it to 'sound'": function(){

        },
        "test should grab key name in view and assign it to 'keyName'" : function(){

        }
    });

    TestCase('KeyView.events', {
       'test should call pressKey() when key button clicked' : function(){
       },
       'test when model fires event keyPressed, should call play() on view' : function(){
       }
    });

    TestCase('KeyView.pressKey()' ,{
       'test should fire keyPressed(this.keyName) on model' : function(){
       }
    });

    TestCase('KeyView.play()', {
        "test should call play() on 'sound'" : function(){
        }
    });
}());

(function(){
    TestCase('KeyModel', {
       'test should extend Backbone model': function(){

       }
    });

//    TestCase('KeyModel.play()', {
//       "test should fire 'play' event" : function(){
//
//       }
//    });

    TestCase('KeyModel.pressKey()', {
       "test should fire 'keyPressed' event with key name": function(){
       }
    });
}());
