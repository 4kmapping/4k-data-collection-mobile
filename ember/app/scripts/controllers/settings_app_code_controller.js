DataCollectionApp.SettingsAppCodeController = Ember.ObjectController.extend({

  appCode: 'somethign',

  saveAppCode: function(){

    console.log('saving app code!') ;
    console.log('model', this.model) ;

    $('form .success').fadeIn() ;

    $('form input').blur() ;

  }

});