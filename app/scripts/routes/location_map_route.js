DataCollectionApp.LocationMapRoute = Ember.Route.extend({
  model: function() {
    return DataCollectionApp.Location.find();
  },
  renderTemplate: function() {

    //rendering the topbar
    this.render('location_topbar', {
      into: 'application',
      outlet: 'topbar'
    });

    //rendering the main thing
    this.render('location_map');

  }
});