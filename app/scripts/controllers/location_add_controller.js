DataCollectionApp.LocationAddController = Ember.Controller.extend({

  types: ['Training', 'Mercy', 'Evangelism'].map(ArrayMapHelpers.stringToTagObject),
  areas: ['Youth/Children', 'Campus Ministry', 'Indigenous Ministry', 'Prison Ministry', 'Prostitutes Ministry', 'Orphanage', 'Women', 'Urban', 'Hospital', 'Media/Communications', 'Worship', 'Community Development', 'Bible Studies', 'Church Planting', 'Arts/Entertainment/Sports', 'Counseling', 'Healthcare', 'Maintenance/Construction'].map(ArrayMapHelpers.stringToTagObject),

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

    var location = {
      tags: [],
      desc: 'No description given',
      lat: 0.1,
      lon: 0.1
    } ;

    if(this.get('desc') !== undefined) location.desc = this.get('desc') ;

    if(this.get('tags') !== undefined) location.tags = this.get('tags').split(', ') ;

    //check for current location.
    //needs replacement with phonegap api
    // navigator.geolocation.getCurrentPosition(function(pos){
    //   location.lat = pos.coords.latitude ;
    //   location.lon = pos.coords.longitude ;
    // }) ;

    DataCollectionApp.Location.createRecord(location).save();

    this.transitionToRoute('/') ;
  }

});
