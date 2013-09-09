DataCollectionApp.SettingsAppCodeRoute = Ember.Route.extend({

  model: function() {
    var model = DataCollectionApp.Settings.find(0) ;
    console.log(model) ;
    return {} ;
  },

  renderTemplate: function() {

    this.render('settings_app_code_topbar', {
      into: 'application',
      outlet: 'topbar'
    });

    this.render('settings_app_code');

  }

});