var DataCollectionApp = window.DataCollectionApp = Ember.Application.create({
  LOG_TRANSITIONS: true,
  ready: function(){

    persistence.store.websql.config(persistence, '4kdatacollection', 'DB for the 4k datacollection app', 10 * 1024 * 1024);

    persistence.schemaSync(function(){

      //fetch 1 setting object
      DataCollectionApp.Setting.all().one(function(setting){

        //if no setting yet, create one with defaults
        if(setting == null){

          var setting = new DataCollectionApp.Setting() ;
          setting.appcode = '' ;
          persistence.add(setting) ;

          persistence.transaction(function(tx) {
            persistence.flush(tx, function(){          
              console.log('created setting instance') ;
            }) ;
          }) ;

        }
        else {
          console.log('found settings: ', setting) ;
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
