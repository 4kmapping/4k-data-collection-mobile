DataCollectionApp.SettingsSyncRoute = Ember.Route.extend({

  //controller init callback
  setupController: function(controller) {
    setTimeout($.proxy(controller.startSyncing, controller), 1000) ;
  },

  renderTemplate: function() {

    //render the topbar (mainly title!)
    this.render('settings_sync_topbar', {
      into: 'application',
      outlet: 'topbar'
    });

    //render rest of the view
    this.render('settings_sync');

  }

});