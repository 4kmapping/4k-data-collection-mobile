DataCollectionApp.LocationAddRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('location.add', {
      into: 'application',
      outlet: 'modalOutlet'
    });
  }
});
