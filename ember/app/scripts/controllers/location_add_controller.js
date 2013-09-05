DataCollectionApp.LocationAddController = Ember.Controller.extend({

  needs: ['application'],

  types: ['Training', 'Mercy', 'Evangelism'].map(ArrayMapHelpers.stringToTagObject),
  areas: ['Youth/Children', 'Campus Ministry', 'Indigenous Ministry', 'Prison Ministry', 'Prostitutes Ministry', 'Orphanage', 'Women', 'Urban', 'Hospital', 'Media/Communications', 'Worship', 'Community Development', 'Bible Studies', 'Church Planting', 'Arts/Entertainment/Sports', 'Counseling', 'Healthcare', 'Maintenance/Construction'].map(ArrayMapHelpers.stringToTagObject),

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

    console.log(this.get('controllers.application.default_security_setting')) ;

    var location = {
      tags: [],
      desc: 'No description given',
      lat: 0.1,
      lon: 0.1,
      email: '',
      phone: '',
      website: '',
      security_level: this.get('controllers.application.default_security_setting'), //only my group
      created_at: Math.round(+new Date() / 1000)
    },
    given = this ;

    if(this.get('desc') !== undefined) location.desc = this.get('desc') ;
    if(this.get('tags') !== undefined) location.tags = this.get('tags') ;

    if(this.get('email') !== undefined) location.email = this.get('email') ;
    if(this.get('phone') !== undefined) location.phone = this.get('phone') ;
    if(this.get('website') !== undefined) location.website = this.get('website') ;
    if(this.get('security_level').get('level') !== undefined) location.security_level = this.get('security_level').get('level') ;

    this.set('controllers.application.default_security_setting', location.security_level) ;

    //check for current location.
    //needs replacement with phonegap api
    navigator.geolocation.getCurrentPosition(function(pos){
      location.lat = pos.coords.latitude ;
      location.lon = pos.coords.longitude ;

      location.created_at = Math.round(+new Date()/1000) ;

      DataCollectionApp.Location.createRecord(location).save();

      given.transitionToRoute('/') ;

    }, function(){
      //needs actual things going on here.
      console.error('could not find location!') ;
    }) ;

  }

});
