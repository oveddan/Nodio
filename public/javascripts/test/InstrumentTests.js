(function(){
    TestCase('InstrumentView', {
        'test should extent Backbone view' : function(){

        }
    });
    TestCase('InstrumentView({el : instrumentElement})', {
        'test should throw error if el is not dom element' : function(){
            expect(function(){
                var view = new NODIO.InstrumentView({el : 'a'});
            }).to.throwError();
        },
        'test should build child views then build instrument model and contain that as collection model' : function(){
            // setup
            // build child views stub
            var expectedViews = {G : "7"}; // build random object to be returned;
            var $el = $(document.createElement('a'));
            var childViewsStub = sinon.stub(NODIO.InstrumentView, "buildChildViews");
            childViewsStub.withArgs($el).returns(expectedViews);
            // build model building stub
            var expectedModel = {d : "5"};
            var buildModelStub = sinon.stub(NODIO.InstrumentView, "buildModel");
            buildModelStub.withArgs(expectedViews).returns(expectedModel);
            // test
            var instrumentView = new NODIO.InstrumentView({el : $el});

            // assert
            expect(instrumentView.collection).to.equal(expectedModel);

            // restore
            childViewsStub.restore();
            buildModelStub.restore();
        }
    });

    TestCase('InstrumentView.buildModel(childViews)', {
        setUp : function(){
        },
        tearDown : function(){
        },
        "test should return instance of InstrumentModel": function(){
            // test
            var model = NODIO.InstrumentView.buildModel([]);

            expect(model).to.be.a(NODIO.InstrumentModel);
        },
        "test should add all models in child views to collection model": function(){

        },
        "test should create instrument model with name from data('name') from view": function(){
        }
    });

    TestCase('InstrumentView.buildChildViews($el)', {
        setUp : function(){
            /*:DOC element = <ul data-name='piano'>
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
