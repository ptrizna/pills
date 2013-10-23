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
            this.destroy( { url: 'backend/slim/pill/' + this.id } );
            this.view.remove();
            //backbone.emulateHTTP = true;
            //Prescriptions.sync("delete", undefined, {"url" : "backend/", "dataType" : "json", "data" : "id=" + this.id});
        },
        url: "backend/slim/pill/"
        
    });

    var Prescriptions = Backbone.Collection.extend({
        model: Pill,
        url: "backend/slim?"  + (new Date()).getTime(),
        nextID: function() {
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        }
    });

    return {
        Pill: Pill,
        Prescriptions: Prescriptions
    };
});

