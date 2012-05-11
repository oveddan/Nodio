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

    TestCase('InstrumentModel.listenForPressedKeys()', {
        setUp : stubConnectAndSocket,
        tearDown: restoreSocket,
        "test should make 'keyPressed(key)' on model be called when socket emits event 'keyPressed'" : function(){
            // test
            var instrumentModel = new NODIO.InstrumentModel();
            instrumentModel.keyPressed = sinon.spy();

            // start test
            instrumentModel.listenForPressedKeys();
            // invoke second method in 'on', simulating 'on' being fired
            var onFunction = this.socket.on.firstCall.args[1];
            var testKeyPress = {key : 'fa'};
            onFunction(testKeyPress);
            // end test

            // assert
            expect(this.socket.on.firstCall.args[0]).to.be('keyPressed');
            expect(instrumentModel.keyPressed.calledWith(testKeyPress.key)).to.be(true);
            expect(instrumentModel.keyPressed.calledOn(instrumentModel)).to.be(true);


        }
    });

    TestCase('InstrumentModel.add(keyModel)', {
        setUp : stubConnectAndSocket,
        tearDown: restoreSocket,
        "test should cause keyPressed(key) to be called on keyModel's 'keyPressed' event" : function(){
            // setup
            var keyB = new NODIO.KeyModel({keyName : "C22"});
            var instrumentModel = new NODIO.InstrumentModel();
            instrumentModel.keyPressed = sinon.spy();
            // test
            instrumentModel.add(keyB);
            // fire event on model
            var data = {key : keyB.keyName};
            keyB.trigger('keyPressed', data);

            // expect
            expect(instrumentModel.keyPressed.called).to.be(true);
            expect(instrumentModel.keyPressed.calledOn(instrumentModel)).to.be(true);
            expect(instrumentModel.keyPressed.calledWith(data));
        }
    });

    TestCase('InstrumentModel.keyPressed({key : keyName})', {
        setUp : stubConnectAndSocket,
        tearDown: restoreSocket,
        "test should raise error if key argument is null": function(){
            // setup
            var instrumentModel = new NODIO.InstrumentModel();
            // test/expect
            expect(function(){
                instrumentModel.keyPressed({key : null});
            }).to.throwError();
        },
        "test should emit 'keyPressed' on socket with key name and instrument name" : function(){
            // setup
            var instrumentModel = new NODIO.InstrumentModel();
            instrumentModel.setInstrumentName('bass');
            // need to reset emit in case called in other methods
            this.socket.emit.reset();
            // test
            instrumentModel.keyPressed({key : 'b9'});

            // expect
            expect(this.socket.emit.calledWith('keyPressed')).to.be(true);
            expect(this.socket.emit.firstCall.args[1]).to.eql({
                instrumentName : 'bass',
                key : 'b9'
            });
        },
        "test should call playKey(keyName)" : function(){
            // setup
            var instrumentModel = new NODIO.InstrumentModel();

            instrumentModel.setInstrumentName('guitar');
            instrumentModel.playKey = sinon.spy();

            // test
            instrumentModel.keyPressed({key: 'g#'});

            // expect
            expect(instrumentModel.playKey.calledWith('g#')).to.be(true);
        }
    });

    TestCase("InstrumentModel.playKey(name)", {
        'test key does not exist should not raise error': function(){
            var key = 'do';
            // setup
            var instrumentModel = new NODIO.InstrumentModel();
            instrumentModel.where = sinon.stub().withArgs({key:key}).returns([]);

            // test
            expect(function(){
                instrumentModel.playKey(key);
            }).to.not.throwException();
        },
        "test should find key with name and trigger 'play' on it" : function(){
            // setup
            var instrumentModel = new NODIO.InstrumentModel();

            var expectedFirsKey = new NODIO.KeyModel();
            expectedFirsKey.trigger = sinon.spy();
            var key = 'do';

            // stub result of where to return collection with 'first' method stubbed
            // out to return key
            instrumentModel.where = sinon.stub().withArgs({key : key}).returns(
                [expectedFirsKey, {}, {}, {}]
            );

            // test
            instrumentModel.playKey(key);

            // expect
            expect(expectedFirsKey.trigger.calledWith('play')).to.be(true);
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

    TestCase('KeyView({el : element}) - good html', {
        setUp : function(){
            /*:DOC element = <li class='key' data-name='do' >
                <audio src='/do.mp3' type='audio/mp3' />
             </li>
             */
            this.keyView = new NODIO.KeyView({el : this.element});
        },
        "test should build and contain model with keyName in element assigned to model" : function(){
            // test
            expect(this.keyView.model != null).to.be(true);
            expect(this.keyView.model.get('keyName')).to.be('do');
        },
        "test should grab audio element in view and assign it to 'sound'": function(){
            expect(this.keyView.audioElement != null).to.be(true);
            expect(this.keyView.audioElement).to.eql($(this.element).find('audio')[0]);
        },
        "test should call play() when model triggers 'play'": function(){
            this.keyView.play = sinon.spy();
            this.keyView.model.trigger('play');

            expect(this.keyView.play.calledOnce).to.be(true);
            expect(this.keyView.play.calledOn(this.keyView));
        },
        "test should call pressKey on model when list element is clicked" : function(){
            // setup
            this.keyView.model.pressKey = sinon.spy();
            var $elementToClick = $(this.element);
            // test
            $elementToClick.click();
            // expect
            expect(this.keyView.model.pressKey.calledOnce).to.be(true);
            expect(this.keyView.model.pressKey.calledOn(this.keyView.model));
        }
    });
    TestCase("KeyView({el : element}) - bad html", {
        "test should not throw error if cannot find key name" : function(){
            expect(function(){
                var keyView = new NODIO.KeyView('<span />');
            }).to.not.throwException();
        },
        "test should not throw error if cannot find audio" : function(){
            expect(function(){
                var $element = $("<li class='key'>" +
                   "</li>");
                var keyView = new NODIO.KeyView($element);
            }).to.not.throwException();
        }
    });

    TestCase('KiewView.parseElementForName($element)', {
        setUp : function(){
            /*:DOC element = <li class='key' data-name='do' >
             <audio src='/do.mp3' type='audio/mp3' />
             </li>
             */
        },
        'test should grab name from data-name attribute and return it' : function(){
            // setup
            var expected = 'do';
            // test
            var actual = NODIO.KeyView.parseName($(this.element));
            // expect
            expect(actual).to.be(expected);
        }
    });

    TestCase('KeyView.play()', {
        "test should call play() on 'audioElement'" : function(){
            // setup
            /*:DOC element = <li class='key' data-name='do' >
             <audio src='/do.mp3' type='audio/mp3' />
             </li>
             */
            var keyView = new NODIO.KeyView({el : this.element});
            keyView.audioElement.play = sinon.spy();
            // test
            keyView.play();
            // expect
            keyView.audioElement.play.called;
        }
    });
}());

(function(){

    TestCase('KeyModel.pressKey()', {
       "test should fire 'keyPressed' event with key name": function(){
           // setup
           var keyModel = new NODIO.KeyModel({
               keyName : 'c7'
           });

           keyModel.trigger = sinon.spy();
           // test
           keyModel.pressKey();
           // expect
           expect(keyModel.trigger.calledOnce).to.be(true);
           expect(keyModel.trigger.firstCall.args[0]).to.be('keyPressed');
           expect(keyModel.trigger.firstCall.args[1]).to.eql({key : keyModel.get('keyName')});
       }
    });
}());
