define(["backbone","jquery", "app/pills/model", "app/pills/route"], function(b, $, model){

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
            $('.modal').modal('hide');
        },
        refresh: function(){
            console.log('refresh');
            _.each(recipes.models, function(element, list, index){
                this.addOne(index[list]);
            }, this);
        }
    });
    var prescriptionsView = new PrescriptionsView(); 
    
    return { model: recipes };
    
});