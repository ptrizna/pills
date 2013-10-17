define(["backbone","jquery", "app/pills/model"], function(b, $, model){
    
    var recipes = new model.Prescriptions();
    
    var PillView = Backbone.View.extend({
        tagName: "div",
        template: _.template($("#pill-template").html()),
        
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
    var PrescriptionsView = Backbone.View.extend({
        el: $("#prescriptions"),
        
        initialize: function(){
            this.listenTo(recipes, "add", this.addOne);
            this.listenTo(recipes, "change", this.render);
            
            recipes.fetch();
        },
        addOne: function(pill){
            var view = new PillView({model: pill});
            this.$el.append(view.render().el);
        },
        render: function(){
            this.$el.empty();
            for(var i = 0; i < recipes.length; i++){
                var view = new PillView({model: recipes.get(i)});
                this.$el.append(view.render().el);                
            }
        }
        
    });
    
    var prescriptionsView = new PrescriptionsView(); 
    
    return { model: recipes };
    
});

