DataCollectionApp.SettingsAppCodeRoute = Ember.Route.extend({

  setupController: function(controller) {

    DataCollectionApp.Setting.all().one(function(setting){

      console.log('loading appcode', setting.appcode)

      controller.set('appCode', setting.appcode) ;

    }) ;

  },

  renderTemplate: function() {

    this.render('settings_app_code_topbar', {
      into: 'application',
      outlet: 'topbar'
    });

    this.render('settings_app_code');

  }

});