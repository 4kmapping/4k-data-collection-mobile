DataCollectionApp.SettingsAppCodeController = Ember.ObjectController.extend({

  //start with default, real one gets loaded in setupController in router
  appCode: '',

  //action to save them appcodes!
  saveAppCode: function(){

    var given = this ;

    //get setting object
    //TODO: Eliminate this for performance sakes
    DataCollectionApp.Setting.all().one(function(setting){

      //set app code
      setting.appcode = given.appCode ;

      //save it to the settings instance
      persistence.transaction(function(tx) {
        persistence.flush(tx, function(){

          //update ui
          $('form .success').fadeIn() ;
          $('form input').blur() ;

        }) ;
      }) ;

    }) ;

  }

});