(function(){
    TestCase('InstrumentView', {
        'test should extent Backbone view' : function(){

        }
    });
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
        },
        "test model should have instrument name": function(){
            var model = NODIO.InstrumentView.buildModel('piano', []);

            expect(model.instrumentName).to.be('piano');
        }
    });
}());

(function(){
    TestCase('InstrumentModel', {
        'should extend backbone collection model' : function(){
        }
    });

    TestCase('InstrumentModel.initialize()', {
        "test should listenForKeyPress(keyModel) on 'add'" : function(){
        },
        'test shouldListenToInstrument()' : function(){
        }
    });

    TestCase('InstrumentModel.listenForKeyPress(keyModel)', {
       "test should invoke keyPressed(name) when keyModel triggers 'keyPressed'" : function(){

       }
    });

    TestCase('InstrumentModel.keyPressed(name)', {
        "test should emit 'keyPressed' with name on contained socket" : function(){

        }
    });

    TestCase('InstrumentModel.listenToInstrument()', {
        'test should connect to socket.io' : function(){
        },
        'test should contain instance of socket' : function(){
        },
        'test should emit listenToInstrument with name of instrument' : function(){
        },
        "test should bind 'keyPressed' event on socket to playKey" : function(){
        }
    });

    TestCase("InstrumentModel.playKey(name)", {
        'test should find key with name and call play() on it' : function(){
        }
    });

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
