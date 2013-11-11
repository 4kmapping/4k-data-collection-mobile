DataCollectionApp.LocationAddController = Ember.Controller.extend({

  needs: ['application'],

  types: ['Training', 'Mercy', 'Evangelism'].map(ArrayMapHelpers.stringToTagObject),
  areas: ['Youth/Children', 'Campus Ministry', 'Indigenous Ministry', 'Prison Ministry', 'Prostitutes Ministry', 'Orphanage', 'Women', 'Urban', 'Hospital', 'Media/Communications', 'Worship', 'Community Development', 'Bible Studies', 'Church Planting', 'Arts/Entertainment/Sports', 'Counseling', 'Healthcare', 'Maintenance/Construction', 'Research'].map(ArrayMapHelpers.stringToTagObject),

  security_level_options: [
    Ember.Object.create({ level: 0, name: 'Everybody' }),
    Ember.Object.create({ level: 1, name: 'Only 4k trusted users' }),
    Ember.Object.create({ level: 2, name: 'Only my group' })
  ],

  tags: function() {

    var typesList = this.get('types').filterProperty('checked', true).getEach('tag').toArray(),
        areasList = this.get('areas').filterProperty('checked', true).getEach('tag').toArray(),
        tagsList = typesList.concat(areasList) ;

    //first remove any exising tags
    $('#tags').tagit('removeAll') ;

    //add all items
    $.each(tagsList, function(index, tag){

      $('#tags').tagit('createTag', tag) ;

    }) ;

    return tagsList ;

  }.property('types.@each.checked', 'areas.@each.checked'),

  tagString: function(){
    return this.get('tags').join(', ') ;
  }.property('tags'),

  createLocation: function () {

    var location = new DataCollectionApp.Location(),
        locationDefaults = {
          tags: [],
          desc: 'No description given',
          lat: 0.1,
          lon: 0.1,
          email: '',
          phone: '',
          website: '',
          contact_info_is_authorized: 0,
          security_level: this.get('controllers.application.default_security_setting'), //only my group
          created_at: Math.round(+new Date() / 1000)
        },
        given = this ;

    //go through all defaults
    $.each(locationDefaults, function(key, value){
      location[key] = (given.get(key) !== undefined) ? given.get(key) : value ;
    }) ;

    //exception for select! 
    location.security_level = (this.get('security_level').get('level') !== undefined) ? this.get('security_level').get('level') : locationDefaults['security_level'];

    //save security level for next time
    this.set('controllers.application.default_security_setting', location.security_level) ;

    //check for current location.
    //needs replacement with phonegap api
    navigator.geolocation.getCurrentPosition(function(pos){
      location.lat = pos.coords.latitude ;
      location.lon = pos.coords.longitude ;

      location.created_at = Math.round(+new Date()/1000) ;

      //add to persistence object
      persistence.add(location) ;

      //save!
      persistence.transaction(function(tx) {
        persistence.flush(tx, function(){

          //redirect to correct location based on app offline mode
          given.transitionToRoute((given.get('controllers.application.offlineMode') == true) ? '/list' : '/settings/sync') ;

        }) ;
      }) ;

    }, function(){
      //needs actual things going on here.
      console.error('could not find location!') ;
    }) ;

  }

});
