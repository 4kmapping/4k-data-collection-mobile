DataCollectionApp.Router.map(function () {

  this.resource('location', { path: '/location/:location_id' });

  this.resource('locations', { path: '/' }, function() {

    this.resource('location.add', { path: '/location/add' });
  
  });

});
