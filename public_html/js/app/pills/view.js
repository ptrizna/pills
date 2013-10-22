define(["backbone","jquery", "app/pills/model"], function(b, $, model){
    
    var recipes = new model.Prescriptions();
    
    var PrescriptionsView = Backbone.View.extend({
        el: $("#prescriptions"),        
        tagName: "div",
        pillTemplate: _.template($("#pill-template").html()),
        initialize: function(){
            this.listenTo(recipes, "all", this.render);
            
            recipes.fetch();
        },  
        events: {
            "click .newpill": "opennewpillform",
        },
        opennewpillform: function(){
            alert(1);
        },
        render: function(){
            this.$el.find('#list').empty();
            for(var i = 0; i < recipes.length; i++){
                this.$el.find('#list').append(this.pillTemplate(recipes.toJSON()[i]));                
            }
        }
        
    });
    
    var prescriptionsView = new PrescriptionsView(); 
    
    return { model: recipes };
    
});

