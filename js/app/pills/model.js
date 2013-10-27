define(["backbone"], function(backbone) {
    var Pill = Backbone.Model.extend({
        defaults: function() {
            return {
                id: null,
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
        }
    });

    var Prescriptions = Backbone.Collection.extend({
        model: Pill,
        url: "backend/slim/pills"
    });

    var Ingredient = Backbone.Model.extend({
        defaults: function() {
            return {
                title: "New ingredient"
            };
        },
        clear: function() {
            this.destroy();
        }
    });

    
    var Ingredients = Backbone.Collection.extend({
        model: Ingredient        
    });

    return {
        Pill: Pill,
        Prescriptions: Prescriptions,
        Ingredient: Ingredient,
        Ingredients: Ingredients
    };
});

