require.config({
   baseUrl: "js/lib",
   paths: {
       app: "../app",
       util: "../util"
   },
   shim: {
       "bootstrap/js/bootstrap": {
           deps: ["jquery"]
       },
       "underscore": {
           exports: "_"
       },
       "backbone": {
           deps: ["underscore", "jquery"],
           exports: "Backbone"
       }
   }
});

require(["bootstrap/js/bootstrap"]);

