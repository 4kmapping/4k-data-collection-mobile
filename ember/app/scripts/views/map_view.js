DataCollectionApp.MapView = Ember.CollectionView.extend({

  map: null,

  classNames: ['google-maps'],

  didInsertElement: function() {

    console.log('for some reason being called') ;

    var mapOptions = {
      //UI's are for desktops, ieuw.
      disableDefaultUI: true,
      zoom: 14,
      //set to amsterdam by default.
      //TODO: less biased default location? :)
      center: new google.maps.LatLng(52.370216, 4.895168),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    given = this ;

    //set the map as a controller property
    this.set('map', new google.maps.Map(this.$()[0], mapOptions));

    //set to current location
    navigator.geolocation.getCurrentPosition(function(pos){
      given.get('map').setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    }) ;

    //continue to render them markers!
    this.renderMarkers() ;

  },

  renderMarkers: function(){

    //cb context!
    var given = this ;

    //for every location
    DataCollectionApp.Location.all().each(function(location){

      // create a new marker
      new google.maps.Marker({
        position: new google.maps.LatLng(location.lat, location.lon),
        map: given.get('map'),
        title: location.desc
      }) ;

    });

  }

});
