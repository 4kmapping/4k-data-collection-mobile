DataCollectionApp.SettingsSyncController = Ember.ObjectController.extend({

  server_root_address: 'http://192.237.166.7/api/0.1/',

  locations: [],

  isSyncing: true,

  totalLocationsToBeSynced: 0,
  locationsAlreadySynced: 0,

  percentageComplete: function(){
    return (this.totalLocationsToBeSynced > 0) ? Math.round(this.locationsAlreadySynced / this.totalLocationsToBeSynced * 100) : 0 ;
  }.property('totalLocationsToBeSynced', 'locationsAlreadySynced'),

  inlineStyleWithPercentageCompleted: function(){
    return 'width: ' + this.get('percentageComplete') + '%;' ;
  }.property('percentageComplete'),

  startSyncing: function() {

    console.log('starting sync') ;

    var given = this ;

    DataCollectionApp.Location.all().list(function(locations){

      console.log(locations) ;

      given.set('locations', locations);
      console.log('locs', given.locations) ;
      given.set('totalLocationsToBeSynced', given.locations.length) ;

      given.syncNextLocation() ;

      console.log('Sent ' + given.locationsAlreadySynced + '/' + given.totalLocationsToBeSynced + ' to the server.') ;

    });

  },

  syncNextLocation: function(){

    console.log('syncing next location') ;

    if(this.locationsAlreadySynced > 0
    && this.locationsAlreadySynced == this.totalLocationsToBeSynced) {
      this.syncIsCompleted() ;
      return true ;
    }

    var location = this.locations[this.locationsAlreadySynced],
        locationObject = {
          orig_id: location.id,
          lat: location.lat,
          lon: location.lon,
          desc: location.desc,
          tags: location.tags,
        },
        given = this ;

    $.ajax({
      url: this.server_root_address + 'location/',
      method: 'post',
      data: JSON.stringify(locationObject),
      crossDomain: true,
      contentType: 'application/json',
      beforeSend: function(request){
        request.setRequestHeader('Authorization', 'ApiKey admin:5e4d3c2b1a');
      },
      success: function(){
  
        location.syncedWithServer = true ;

        //save it to the settings instance
        persistence.transaction(function(tx) {
          persistence.flush(tx, function(){
            console.log('noted as synced') ;
          });
        });

      },
      complete: function(){

        given.set('locationsAlreadySynced', parseInt(given.locationsAlreadySynced) + 1) ;
        console.log('current', given.locationsAlreadySynced, given.percentageComplete) ;

        given.syncNextLocation() ;

      }
    }) ;

  },

  syncIsCompleted: function(){
    console.log('sync is done!') ;
    this.set('isSyncing', false) ;
  }

});