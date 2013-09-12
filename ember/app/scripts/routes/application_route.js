DataCollectionApp.ApplicationRoute = Ember.Route.extend({

  setupController: function(controller){

    $(window).on('offline', function(){
      controller.set('offlineMode', true) ;
    }) ;

    $(window).on('online', function(){
      controller.set('offlineMode', false) ;
    }) ;

  }

});