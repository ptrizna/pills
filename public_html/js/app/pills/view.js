define(["backbone","jquery", "app/pills/model"], function(b, $, model){

    var recipes = new model.Prescriptions();
    
    var PillView = Backbone.View.extend({
        tagName: "div",
        PillTemplate: _.template($('#pill-template').html()),
        initialize: function(){
            //_.bindAll(this, 'render', 'close');
            //this.model.bind('change', this.render);
            this.model.view = this;
        },
        events: {
            "click .delete": "removeone",
            "click .edit": "edititem",
        },
        removeone: function(href, i) {
            this.model.clear();
            return false;
        },
        render: function() {
            this.$el.html(this.PillTemplate(this.model.toJSON()));
            return this;
        }
    });

    var PrescriptionsView = Backbone.View.extend({
        el: $("#prescriptions"),        
        tagName: "div",
        initialize: function(){
            _.bindAll(this, 'addOne', 'refresh', 'render');
            recipes.bind('refresh', this.refresh);
            recipes.bind('change', this.refresh);
            recipes.bind('add', this.addOne);
            recipes.fetch();
        },
        events: {
            "click .add-pill": "addFromForm",
        },
        addFromForm: function() {
            recipes.create(this.newAttributes());
            $('.modal').modal('hide');
            return false;
        },
        newAttributes: function() {
            var param = {id: recipes.nextID()};
            $('.modal-body input').each(function(attr){
                param[$(this).attr('name')] = $(this).val();
            });
            return param;
        },
        addOne: function(pill){
            var OnePillView = new PillView({model: pill});
            this.$("#list").append(OnePillView.render().el);
        },
        refresh: function(){
            //console.log('refresh');
            _.each(recipes.models, function(element, list, index){
                this.addOne(index[list]);
            }, this);
        }
    }); 

    var IngredientsView = Backbone.View.extend({
        el: $("#list"),        
        tagName: "div",
        newItemForm: _.template($('#new-ingredient-form').html()),
        listItems: _.template($('#list-ingredients').html()),
        initialize: function(){
            ingredients = new model.Ingredients();
            ingredients.bind('add', this.addOne);
            this.render();
        },
        events: {
            "keypress .new-item" : "listenAdd"
        },
        listenAdd: function(e) {
            if(e.which == 13) {
                ingredients.create({ 'title': $('.new-item').val() });
            }
        },
        addOne: function(ingredient) {
            $(".ingredients-list").prepend(new IngredientView({model:ingredient}).render().el);
            ingredient
        },
        render: function() {  
            this.$el.empty().html(this.newItemForm() + this.listItems());
        }
        
    });
    
    var IngredientView = Backbone.View.extend({
        tagName: "li",
        template: _.template($('#item-title').html()),
        initialize: function(){
        },
        render: function() {  
            this.$el.html(this.template(this.model.toJSON()));
            return this;    
        }
        
    });
    
    return { model: recipes, IngredientsView: IngredientsView };
    
});