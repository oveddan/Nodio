var NODIO = NODIO || {};

(function($, Backbone){
    NODIO.InstrumentView = Backbone.View.extend({
        initialize : function(){
            if(!this.el)
                throw('must bind dom element to property el in constructor');
            this.bindInstrumentModel();
        },
        bindInstrumentModel : function(){
            var views = this.$el.find('.key');
            for(var i = 0, max = views.length; i < max; i++){
                var keyView = new NODIO.KeyView({el : views[i]});
            }

            this.collection = new NODIO.InstrumentModel();
        }
    });

    NODIO.InstrumentModel = Backbone.Collection.extend({

    });

    NODIO.KeyView = Backbone.View.extend({

    });


}(jQuery, Backbone));

