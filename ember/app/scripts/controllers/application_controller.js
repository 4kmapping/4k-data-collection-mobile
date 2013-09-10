DataCollectionApp.ApplicationController = Ember.Controller.extend({

  //TODO: move this into settings table
  default_security_setting: 2, //'only my group'

  offlineMode: false,

  //by default, hide them settings
  showingSettings: false,
  toggleSettings: function(){
    this.set('showingSettings', (this.showingSettings != true)) ;
  }

}) ;