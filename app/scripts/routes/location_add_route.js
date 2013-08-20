DataCollectionApp.LocationAddRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('location_add', {
      into: 'application',
      outlet: 'modal'
    });
  }
});
