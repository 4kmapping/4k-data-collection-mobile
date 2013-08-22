DataCollectionApp.LocationAddView = Ember.View.extend({

  templateName: 'location_add',

  didInsertElement: function(){

    //initialize tagging plugin!
    $('#tags').tagit({
      removeConfirmation: true
    }) ;

  }

});