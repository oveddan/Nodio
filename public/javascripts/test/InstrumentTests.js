(function(){
    TestCase('InstrumentView', {
        'test should extent Backbone view' : function(){
        }
    });
    TestCase('InstrumentView.initialize()', {
        'test should bindInstrumentModel()' : function(){
        }
    });
    TestCase('InstrumentView.bindInstrumentModel()', {
        "test should create key views from all elements in view with class='key'" : function(){

        },
        "test should create and contain instrument model containing all key models": function(){

        },
        "test should create instrument model with name from data('name') from view": function(){

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
       }
    });

    TestCase('KeyView.pressKey()' ,{
       'test should call pressKey(this.keyName) on model' : function(){
       }
    });

    TestCase('KeyView.play()', {
        "test should call play() on 'sound'" : function(){
        }
    });
}());_

(function(){
    TestCase('KeyModel', {
       'test should extend Backbone model': function(){

       }
    });

    TestCase('KeyModel.play()', {
       "test should fire 'play' event" : function(){

       }
    });

    TestCase('KeyModel.pressKey()', {
       "test should fire 'keyPressed' event with key name": function(){
       }
    });
})
