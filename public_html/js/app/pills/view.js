define(["backbone","jquery", "app/pills/model"], function(b, $, model){
    
    var recipes = new model.Prescriptions();
    
    var PrescriptionsView = Backbone.View.extend({
        el: $("#prescriptions"),        
        tagName: "div",
        initialize: function(){
            this.listenTo(recipes, "all", this.render);
            recipes.fetch();
        },  
        events: {
            "click .add-pill": "addone",
        },
        addone: function(pill) {
            //var newPill = new model.Pill();
            var param = {};
            $('.modal-body input').each(function(attr){
                //newPill.set($(this).attr('name'), $(this).val());
                param[$(this).attr('name')] = $(this).val();
            });
            recipes.add(param);
            $('.modal').modal('hide');
        },
        render: function() {
            this.$el.find('#list').empty().append(_.template($("#pill-template").html(), {recipesList: recipes.toJSON()}));
            return this;
        }
    });
    
    var prescriptionsView = new PrescriptionsView(); 
    
    return { model: recipes };
    
});