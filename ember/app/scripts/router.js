DataCollectionApp.Router.map(function () {

  this.resource('locations', { path: '/' }, function(){
    this.resource('location.map', { path: '/' });
    this.resource('location.list', { path: '/list' });
  }) ;

  this.resource('location.add', { path: '/add' });  

  this.resource('settings', { path: '/settings' }) ;
  this.resource('settings.app_code', { path: '/settings/app_code' }) ;
  this.resource('settings.about', { path: '/settings/about' }) ;
  this.resource('settings.feedback', { path: '/settings/feedback' }) ;

});