DataCollectionApp.SettingsAppCodeRoute = Ember.Route.extend({

  //controller init callback
  setupController: function(controller) {

    //load setting instance!
    DataCollectionApp.Setting.all().one(function(setting){

      //set the properties on the controller
      controller.set('appCode', setting.appCode) ;
      controller.set('appUser', setting.appUser) ;

    }) ;

  },

  renderTemplate: function() {

    //render the topbar (mainly title!)
    this.render('settings_app_code_topbar', {
      into: 'application',
      outlet: 'topbar'
    });

    //render rest of the view
    this.render('settings_app_code');

  }

});