DataCollectionApp.LocationListRoute = Ember.Route.extend({
  setupController: function(controller) {

    DataCollectionApp.Location.all().list(function(locations){
      controller.set('locations', locations) ;
    }) ;

  },
  renderTemplate: function() {

    //rendering the topbar
    this.render('location_topbar', {
      into: 'application',
      outlet: 'topbar'
    });

    //rendering the main thing
    this.render('location_list');

  }
});