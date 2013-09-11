DataCollectionApp.SettingsSyncRoute = Ember.Route.extend({

  //controller init callback
  setupController: function(controller) {
    controller.isSyncing = true ;
    controller.startSyncing() ;
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