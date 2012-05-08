var NODIO = NODIO || {};

(function(View){
    NODIO.InstrumentView = View.extend({
        initialize : function(){
            if(!this.el)
                throw('must bind el on load');
            this.bindInstrumentModel();
        },
        bindInstrumentModel : function(){
            var views = this.$el.find('.key');
            for(var i = 0, max = views.length; i < max; i++){
                var keyView = new NODIO.KeyView({el : views[i]});
            }
        }
    });

    NODIO.KeyView = View.extend({

    });


}(Backbone.View));

