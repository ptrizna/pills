define(["backbone"], function(backbone){   
   var Pill = Backbone.Model.extend({       
       parse: function(response){           
           this.set("title", response.title);
           this.set("doze", response.doze);
           this.set("time", new Date(response.time));
       }
       
   });
   
   var Prescriptions = Backbone.Collection.extend({
       model: Pill,
       url: "data/pills.json"
   });
   
   return {
       Pill: Pill,
       Prescriptions: Prescriptions
   };
});

