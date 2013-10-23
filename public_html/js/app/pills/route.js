define(["backbone"], function(backbone) {
    var Controller = Backbone.Router.extend({
        routes: {
            "": "showpage",
            "view/:page": "showpage",
            //"!/error": "error"
        },
        showpage: function (page_id) {
            page_id = page_id || "start";
            $(".block").hide();
            $("#" + page_id).show();
        }
    });
    
    var controller = new Controller();
    backbone.history.start();
    
    return {
        controller : controller
    };  
});