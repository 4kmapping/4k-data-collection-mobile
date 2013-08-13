DataCollectionApp.LocationsMapView = Ember.CollectionView.extend({

  map: null,

  classNames: ['google-maps'],

  didInsertElement: function() {

    var mapOptions = {
        disableDefaultUI: true,
        zoom: 14,
        center: new google.maps.LatLng(0, 0), //somewhere in togo, idk
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.set('map', new google.maps.Map(this.$()[0], mapOptions));

    this.renderMarkers() ;

  },

  renderMarkers: function(){

    var given = this ;

    this.get('controller.content').forEach(function(location){

      new google.maps.Marker({
          position: new google.maps.LatLng(location.get('lat'), location.get('long')),
          map: given.get('map'),
          title: location.desc
      }) ;

    });

  }.observes('controller.content.@each')

});
