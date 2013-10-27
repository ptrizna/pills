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
   },
   urlArgs: "bust=" + (new Date()).getTime()
});

require(["bootstrap/js/bootstrap", "app/pills/route"]);