DataCollectionApp.ApplicationController = Ember.Controller.extend({

  //TODO: move this into settings table
  default_security_setting: 2, //'only my group'

  //window offline/online bindings in app router
  offlineMode: !navigator.onLine,
  //used to switch things around
  processOfflineMode: function(){
    console.log('do stuff') ;
  }.observes('offlineMode'),

  //by default, hide them settings
  showingSettings: false,
  toggleSettings: function(){
    this.set('showingSettings', (this.showingSettings != true)) ;
  }

}) ;