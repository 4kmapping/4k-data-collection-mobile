DataCollectionApp.LocationAddController = Ember.Controller.extend({

  types: [ { type:'Training' }, { type: 'Mercy' }, { type: 'Evangelism' } ],
  areas: [ { area:'Youth/Children' }, { area: 'Campus Ministry' }, { area: 'Indigenous Ministry' }, { area: 'Prison Ministry' }, { area: 'Prostitutes Ministry' }, { area: 'Orphanage' }, { area: 'Women' }, { area: 'Urban' }, { area: 'Hospital' }, { area: 'Media/Communications' }, { area: 'Worship' }, { area: 'Community Development' }, { area: 'Bible Studies' }, { area: 'Church Planting' }, { area: 'Arts/Entertainment/Sports' }, { area: 'Counseling' }, { area: 'Healthcare' }, { area: 'Maintenance/Construction' } ],

  createLocation: function () {

    var location = {
      tags: [],
      desc: 'No description given',
      lat: 0.1,
      lon: 0.1
    } ;

    if(this.get('desc') !== undefined) location.desc = this.get('desc') ;

    if(this.get('tags') !== undefined) location.tags = this.get('tags').split(', ') ;

    //check for current location.
    //needs replacement with phonegap api
    // navigator.geolocation.getCurrentPosition(function(pos){
    //   location.lat = pos.coords.latitude ;
    //   location.lon = pos.coords.longitude ;
    // }) ;

    DataCollectionApp.Location.createRecord(location).save();

    this.transitionToRoute('/') ;
  }

});
