DataCollectionApp.LocationsController = Ember.ArrayController.extend({

  //start off with a map
  listView: false,

  //to toggle 'round
  toggleView: function(){
    this.set('listView', (this.get('listView') ? false : true)) ;
  }

});