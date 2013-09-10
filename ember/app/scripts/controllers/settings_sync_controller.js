DataCollectionApp.SettingsSyncController = Ember.ObjectController.extend({

  server_root_address: 'http://192.237.166.7/api/0.1/',

  locations: [],

  totalLocationsToBeSynced: 0,
  locationsAlreadySynced: 0,

  percentageComplete: function(){
    console.log('updating percentageComplete') ;
    return (this.totalLocationsToBeSynced > 0) ? this.totalLocationsToBeSynced / this.locationsAlreadySynced : 0 ;
  }.property('totalLocationsToBeSynced', 'locationsAlreadySynced'),

  inlineStyleWithPercentageCompleted: function(){
    return 'width: ' + this.percentageComplete + '%;' ;
  }.property('percentageComplete'),


  syncNextLocation: function(){

    console.log('this = ', this) ;

    console.log('syncing next location') ;

    var location = this.locations[this.locationsAlreadySynced];
    console.log('loc', location) ;
    console.log('locs', this.locations)

        locationObject = {
          orig_id: location.get('id'),
          lat: location.get('lat'),
          lon: location.get('lon'),
          desc: location.get('desc'),
          tags: location.get('tags'),
        } ;


    $.ajax({
      url: this.server_root_address + 'location/',
      method: 'post',
      data: JSON.stringify(locationObject),
      crossDomain: true,
      contentType: 'application/json',
      beforeSend: function(request){
        request.setRequestHeader('Authorization', 'ApiKey admin:5e4d3c2b1a');
      },
      complete: function(){
        // set 'saved' status
        // update ui
        // console.log(arguments) ;

        this.set('locationsAlreadySynced', parseInt(this.locationsAlreadySynced) + 1) ;
        console.log('current', this.locationsAlreadySynced, this.percentageComplete) ;

        this.syncNextLocation() ;
      }
    }) ;

  },

  startSyncing: function() {

    console.log('starting sync') ;

    this.set('locations', DataCollectionApp.Location.find());
    console.log(DataCollectionApp.Location.find().toArray()) ;
    console.log(this.locations) ;
    this.set('totalLocationsToBeSynced', this.locations.toArray().length) ;

    this.syncNextLocation() ;

    console.log('Sent ' + this.locationsAlreadySynced + '/' + this.totalLocationsToBeSynced + ' to the server.') ;

  } //sync


});