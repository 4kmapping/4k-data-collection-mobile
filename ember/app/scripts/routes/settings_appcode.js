DataCollectionApp.Appcode = Ember.Route.extend({

  model: function() {
    return DataCollectionApp.Location.find();
  },

  setupController: function(){
    console.log('asd;lk') ;
  },

  renderTemplate: function() {

    console.log('sup') ;

    this.render('settings_app_code');

  }

});