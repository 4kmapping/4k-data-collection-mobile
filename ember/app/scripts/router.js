DataCollectionApp.Router.map(function () {

  this.resource('locations', { path: '/' }, function(){
    this.resource('location.map', { path: '/' });
    this.resource('location.list', { path: '/list' });
  }) ;

  this.resource('location.add', { path: '/add' });  

  this.resource('settings.app_code', { path: '/settings/app_code' }) ;
  this.resource('settings.sync', { path: '/settings/sync' }) ;
  this.resource('settings.about', { path: '/settings/about' }) ;
  this.resource('settings.feedback', { path: '/settings/feedback' }) ;

});

Ember.Router.reopen({

  didTransition: function(views) {

    views[0].handler.controller.set('showingSettings', false) ;
    
    var className = views[views.length-1].name.replace('.', '-') ;

    $('body').attr('class', 'ember-application').addClass(className) ;

    this.super() ;

  }

});