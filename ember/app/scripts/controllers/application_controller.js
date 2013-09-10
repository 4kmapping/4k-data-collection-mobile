DataCollectionApp.ApplicationController = Ember.Controller.extend({
  default_security_setting: 2, //'only my group'

  //by default, hide them settings
  showingSettings: false,
  toggleSettings: function(){
    this.set('showingSettings', (this.showingSettings != true)) ;
  }

}) ;