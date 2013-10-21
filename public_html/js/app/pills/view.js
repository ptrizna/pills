define(["backbone","jquery", "app/pills/model"], function(b, $, model){
    
    var recipes = new model.Prescriptions();
    
    var PillView = Backbone.View.extend({
        tagName: "div",
        template: _.template($("#pill-template").html()),
                        
        render: function(){
            this.$el.html(this.template(this.model));
            return this;
        }
    });
    
    var PrescriptionsView = Backbone.View.extend({
        el: $("#prescriptions div.row"),        
        
        initialize: function(){
            this.listenTo(recipes, "all", this.render);
            
            recipes.fetch();
        },        
        render: function(){
            this.$el.empty();
            for(var i = 0; i < recipes.length; i++){
                var view = new PillView({model: recipes.toJSON()[i]});
                this.$el.append(view.render().el);                
            }
        }
        
    });
    
    var prescriptionsView = new PrescriptionsView(); 
    
    return { model: recipes };
    
});

