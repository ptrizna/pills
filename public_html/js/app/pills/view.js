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
            "click .delete": "removeone"
        },
        removeone: function(href, i) {
            //console.log(href.target);
            //recipes.remove(undefined, {index, href.data('pid')}); 
        },
        addone: function() {
            var param = {}, newPill = new model.Pill();
            $('.modal-body input').each(function(attr){
                newPill.set($(this).attr('name'), $(this).val());
                param[$(this).attr('name')] = $(this).val();
            });
            recipes.add(param);
            $('.modal').modal('hide');
            newPill.toJSON();
            newPill.save();
        },
        render: function() {
            this.$el.find('#list').empty().append(_.template($("#pill-template").html(), {recipesList: recipes.toJSON()}));
            return this;
        }
    });
    
    var prescriptionsView = new PrescriptionsView(); 
    
    return { model: recipes };
    
});