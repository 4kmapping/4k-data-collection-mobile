DataCollectionApp.LocationAddController = Ember.Controller.extend({

  createLocation: function () {

    var location = {
      tags: [],
      desc: 'No description given',
      lat: 0,
      long: 0
    } ;

    if(this.get('desc') !== undefined) location.desc = this.get('desc') ;

    if(this.get('tags') !== undefined) location.tags = this.get('tags').split(', ') ;

    //check for current location.
    //needs replacement with phonegap api
    navigator.geolocation.getCurrentPosition(function(pos){
      location.lat = pos.coords.latitude ;
      location.long = pos.coords.longitude ;
    }) ;

    DataCollectionApp.Location.createRecord(location).save();

    this.transitionToRoute('/') ;
  }

});
