define(["backbone", "app/pills/view"], function(backbone, views) {
    var Controller = Backbone.Router.extend({
        routes: {
            "": "showpage",
            "view/:page": "showpage",
            "ingredients": "ingredients"
            //"!/error": "error"
        },
        showpage: function (page_id) {
            page_id = page_id || "start";            
            var prescriptionsView = new views.PrescriptionsView();
            $(".block").hide();
            $("#" + page_id).show();
        },
        ingredients: function() {
            var view = new views.IngredientsView();
            
        }
    });
    
    var controller = new Controller();
    backbone.history.start();
    
    return {
        controller : controller,
        
    };  
});