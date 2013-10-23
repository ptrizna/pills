define(["backbone"], function(backbone) {
    var Pill = Backbone.Model.extend({
        defaults: function() {
            return {
                title: "Pill",
                doze: "doze",
                time: new Date()
            };
        },
        parse: function(data){
            if (data.time){
                data.time = new Date(data.time);
            }
            return data; 
        },
        clear: function() {
            this.destroy();
            this.view.remove();
        },
        url: "backend/"
        
    });

    var Prescriptions = Backbone.Collection.extend({
        model: Pill,
        url: "data/pills.json?"  + (new Date()).getTime()
    });

    return {
        Pill: Pill,
        Prescriptions: Prescriptions
    };
});

