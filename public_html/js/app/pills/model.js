define(["backbone"], function(backbone){   
   var Pill = Backbone.Model.extend({
       defaults: function(){
           return {
               title: "Ibuprom Max",
               doze: "1 pill",
               time: new Date()
           };
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

