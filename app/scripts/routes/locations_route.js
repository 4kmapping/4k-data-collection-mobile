DataCollectionApp.LocationsRoute = Ember.Route.extend({
  model: function() {
    return DataCollectionApp.Location.find();
  }
});