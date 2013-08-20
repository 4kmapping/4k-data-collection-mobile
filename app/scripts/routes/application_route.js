DataCollectionApp.ApplicationRoute = Ember.Route.extend({

  showingSettings: false,
  
  events: {
    toggleSettings: function() {

      console.log('togglin') ;

      if(!this.showingSettings) {

        this.render('settings', {
          into: 'application',
          outlet: 'modal',
          controller: 'settings'
        });

        this.showingSettings = true ;

      }
      else {
        this.render('nothing', { into: 'application', outlet: 'modal' });
        this.showingSettings = false ; 
      }

    }
  }
});