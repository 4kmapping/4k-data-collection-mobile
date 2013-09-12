DataCollectionApp.SettingsAppCodeController = Ember.ObjectController.extend({

  isSaved: false,

  //start with default, real one gets loaded in setupController in router
  appCode: '',
  appUser: '',

  //action to save them appcodes!
  saveCredentials: function(){

    var given = this ;

    //get setting object
    //TODO: Eliminate this for performance sakes
    DataCollectionApp.Setting.all().one(function(setting){

      //set app code
      setting.appCode = given.appCode ;
      setting.appUser = given.appUser ;

      //save it to the settings instance
      persistence.transaction(function(tx) {
        persistence.flush(tx, function(){

          given.set('isSaved', true) ;

        }) ;
      }) ;

    }) ;

  }

});