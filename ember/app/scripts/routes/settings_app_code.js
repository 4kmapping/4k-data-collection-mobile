DataCollectionApp.SettingsAppCodeRoute = Ember.Route.extend({

  model: function() {
    //TODO: needs correct model!
    return DataCollectionApp.Location.find();
  },

  renderTemplate: function() {

    this.render('settings_app_code_topbar', {
      into: 'application',
      outlet: 'topbar'
    });

    this.render('settings_app_code');

  }

});