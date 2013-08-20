DataCollectionApp.LocationsMapView = Ember.CollectionView.extend({

  map: null,

  classNames: ['google-maps'],

  didInsertElement: function() {

    var mapOptions = {
        disableDefaultUI: true,
        zoom: 15,
        center: new google.maps.LatLng(52.370216, 4.895168),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.set('map', new google.maps.Map(this.$()[0], mapOptions));

    this.renderMarkers() ;

  },

  renderMarkers: function(){

    var given = this ;

    this.get('controller.content').forEach(function(location){

      new google.maps.Marker({
          position: new google.maps.LatLng(location.get('lat'), location.get('lon')),
          map: given.get('map'),
          title: location.desc
      }) ;

    });

  }.observes('controller.content.@each')

});
