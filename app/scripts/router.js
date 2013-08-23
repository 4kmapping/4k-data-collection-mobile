DataCollectionApp.Router.map(function () {

  this.resource('location.map', { path: '/' });
  this.resource('location.list', { path: '/list' });
  this.resource('location.add', { path: '/add' });  

  this.resource('settings', { path: '/settings' }) ;
  this.resource('settings.new_validation_code', { path: '/settings/new_validation_code' }) ;
  this.resource('settings.privacy', { path: '/settings/privacy' }) ;
  this.resource('settings.about', { path: '/settings/about' }) ;
  this.resource('settings.feedback', { path: '/settings/feedback' }) ;
  this.resource('settings.logout', { path: '/settings/logout' }) ;

});