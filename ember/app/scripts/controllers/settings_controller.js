DataCollectionApp.SettingsController = Ember.ObjectController.extend({

  offlineMode: false,

  server_root_address: 'http://192.237.166.7/api/0.1/',

  sync: function() {

    var locations = DataCollectionApp.Location.find(),
        i = 0,
        given = this ;

    console.log(this.server_root_address, this) ;

    console.log('Sending ' + locations.toArray().length + ' to the server.') ;

    locations.forEach(function(location){

      var locationObject = {
        orig_id: location.get('id'),
        lat: location.get('lat'),
        lon: location.get('lon'),
        desc: location.get('desc'),
        tags: location.get('tags'),
      } ;

      // console.log(locationObject) ;

      $.ajax({
        url: given.server_root_address + 'location/',
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
        }
      }) ;

      i++;

    }); //locations.foreach

    console.log('Sent ' + i + '/' + locations.toArray().length + ' to the server.') ;

  } //sync


});