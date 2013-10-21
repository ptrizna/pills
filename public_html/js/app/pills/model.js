define(["backbone"], function(backbone) {
    
    var Pill = Backbone.Model.extend({
        defaults: function() {
            return {
                title: "Pill",
                doze: "doze"
            };
        }
    });

    var Prescriptions = Backbone.Collection.extend({
        model: Pill,
        url: "data/pills.json"
    });

    return {
        Pill: Pill,
        Prescriptions: Prescriptions
    };
});

