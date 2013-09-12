var DataCollectionApp = window.DataCollectionApp = Ember.Application.create({

  LOG_TRANSITIONS: true,

  //when the app is ready
  ready: function(){

    //set up persistencejs db!
    //with 10mb of room! (should be enough?)
    persistence.store.websql.config(persistence, '4kdatacollection', 'DB for the 4k datacollection app', 10 * 1024 * 1024);

    //sync the db (check if js models are changed and update accordingly)
    persistence.schemaSync(function(){

      //fetch setting object
      DataCollectionApp.Setting.all().one(function(setting){

        //if no setting yet, create one with defaults
        if(setting == null){

          var setting = new DataCollectionApp.Setting() ;

          //no appcode in then beginning
          setting.appCode = '' ;
          setting.appUser = '' ;

          //add to persistence object
          persistence.add(setting) ;

          //save the setting object
          persistence.transaction(function(tx) {
            persistence.flush(tx, function(){          
              //hurray!
              console.log('created setting instance') ;
            }) ;
          }) ;

        }
        else {
          //found settings already
          console.log('launched with settings: ', setting) ;
        }

      });

    }) ;

  }
});

/* Order and include as you please. */
require('scripts/helpers/*');
require('scripts/controllers/*');

require('scripts/store');

require('scripts/models/*');
require('scripts/routes/*');

require('scripts/views/*');

require('scripts/router');
