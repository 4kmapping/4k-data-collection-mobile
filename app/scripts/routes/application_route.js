DataCollectionApp.ApplicationRoute = Ember.Route.extend({

  server_root_address: 'http://192.237.166.7/api/0.1/',

  showingSettings: false,

  events: {
    toggleSettings: function() {
      if(!this.showingSettings) {
        this.render('settings', { into: 'application', outlet: 'modalOutlet' });      
        this.showingSettings = true ;
      }
      else {
        this.render('nothing', { into: 'application', outlet: 'modalOutlet' });      
        this.showingSettings = false ;        
      }
    },
    sync: function() {

      var locations = DataCollectionApp.Location.find(),
          i = 1,
          given = this ;

      console.log('Sending ' + locations.toArray().length + ' to the server.') ;

      locations.forEach(function(location){

        var locationObject = {
          orig_id: location.get('id'),
          lat: location.get('lat'),
          long: location.get('long'),
          desc: location.get('desc'),
          tags: location.get('tags'),
        } ;

        $.ajax({
          url: given.server_root_address + 'location/',
          method: 'post',
          data: locationObject,
          crossDomain: true,
          // contentType: 'application/json',
          beforeSend: function(request){
            request.setRequestHeader('Authorization', 'ApiKey admin:5e4d3c2b1a');
          },
          complete: function(){
            console.log(arguments) ;
          }
        }) ;

        console.log('Sent ' + i + '/' + locations.toArray().length + ' to the server.') ;

        i++;

      });

    }
  }
});
