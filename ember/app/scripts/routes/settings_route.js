DataCollectionApp.SettingsRoute = Ember.Route.extend({

  renderTemplate: function() {

    //TODO: Animation and stuff: http://jsfiddle.net/CALTm/11/

    this.render('settings', {
      into: 'application',
      outlet: 'modal',
      controller: 'settings'
    });

  },

  activate: function(){
    $('.main').addClass('showingSettings') ;
    $('.settingToggle').attr('href', '#/') ;
  },

  deactivate: function(){
    $('.main').removeClass('showingSettings') ;
    $('.settingToggle').attr('href', '#/settings') ;
  }

});