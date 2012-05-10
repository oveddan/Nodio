var NODIO = NODIO || {};

(function($, Backbone, io){
    var InstrumentView = NODIO.InstrumentView = Backbone.View.extend({
        initialize : function(){
            if(!this.el)
                throw('must bind dom element to property el in constructor');
            var childViews = InstrumentView.buildChildViews(this.$el);
            var instrumentName = InstrumentView.getInstrumentName(this.$el);
            this.collection = InstrumentView.buildModel(instrumentName, childViews);
        }
    });

    InstrumentView.buildChildViews = function($el){
        var childViews = [],
            elementsWithKey = $el.find('.key');
        for(var i = 0, max = elementsWithKey.length; i < max; i++){
            childViews.push(
                new NODIO.KeyView({
                el : elementsWithKey[i]
            }));
        }
        return childViews;
    };

    InstrumentView.getInstrumentName = function($el){
        return $el.data('name');
    };

    InstrumentView.buildModel = function(instrumentName, childViews){
        var model = new NODIO.InstrumentModel();
        model.setInstrumentName(instrumentName);
        for(var i = 0; i < childViews.length; i++){
            model.add(childViews[i].model);
        }
        return model;
    };

    NODIO.InstrumentModel = Backbone.Collection.extend({
        initialize : function(){
            this.socket = io.connect();
        },
        listenToInstrument : function(instrumentName){
            console.log(instrumentName);
            this.socket.emit('listenToInstrument', {instrumentName : instrumentName});
        },
        listenForPressedKeys : function(){
            var self = this;
            this.socket.on('keyPressed', function(data){
               self.keyPressed(data.key);
            });
        },
        setInstrumentName : function(name){
            this.instrumentName = name;
            this.listenToInstrument(name);
        },
        getInstrumentName: function(){
            return this.instrumentName;
        }
    });

    NODIO.KeyView = Backbone.View.extend({

    });


}(jQuery, Backbone, io));

