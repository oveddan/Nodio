var NODIO = NODIO || {};

(function($, Backbone){
    var InstrumentView = NODIO.InstrumentView = Backbone.View.extend({
        initialize : function(){
            if(!this.el)
                throw('must bind dom element to property el in constructor');
            var childViews = InstrumentView.buildChildViews(this.$el);
            this.collection = InstrumentView .buildModel(childViews);
        }
    });

    InstrumentView.buildChildViews = function($el){
        var childViews = [],
            elementsWithKey = $el.find('.key');
        for(var i = 0; i < elementsWithKey.length; i++){
            childViews.push(
                new NODIO.KeyView({
                el : elementsWithKey[i]
            }));
        }
        return childViews;
    };

    InstrumentView.buildModel = function(childViews){
        return new NODIO.InstrumentModel();
    };

    NODIO.InstrumentModel = Backbone.Collection.extend({

    });

    NODIO.KeyView = Backbone.View.extend({

    });


}(jQuery, Backbone));

