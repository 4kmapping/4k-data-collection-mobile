DataCollectionApp.SettingsSyncController = Ember.ObjectController.extend({

  server_root_address: 'http://192.237.166.7/api/0.1/',

  locations: [],

  isSyncing: true,

  withErrors: false,
  lastError: '',

  totalLocationsToBeSynced: 0,
  locationsAlreadySynced: 0,

  percentageComplete: function(){
    return (this.totalLocationsToBeSynced > 0) ? Math.round(this.locationsAlreadySynced / this.totalLocationsToBeSynced * 100) : 0 ;
  }.property('totalLocationsToBeSynced', 'locationsAlreadySynced'),

  inlineStyleWithPercentageCompleted: function(){
    return 'width: ' + this.get('percentageComplete') + '%;' ;
  }.property('percentageComplete'),

  startSyncing: function() {

    //reset from last sync
    this.set('withErrors', false) ;

    var given = this ;

    DataCollectionApp.Location.all().filter('syncedWithServer', '=', false).list(function(locations){

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

    DataCollectionApp.Setting.all().one(function(setting){

      $.ajax({
        url: given.server_root_address + 'location/',
        method: 'post',
        data: JSON.stringify(locationObject),
        crossDomain: true,
        contentType: 'application/json',
        beforeSend: function(request){
          request.setRequestHeader('Authorization', 'ApiKey ' + setting.appUser + ':' + setting.appCode);
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

        },
        error: function(object, type, error){
          given.set('withErrors', true) ;
          given.set('lastError', error) ;
        }
      }) ;

    }) ;

  },

  syncIsCompleted: function(){
    console.log('sync is done!') ;
    this.set('isSyncing', false) ;
  }

});